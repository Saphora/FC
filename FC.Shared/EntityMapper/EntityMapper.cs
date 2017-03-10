using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Interfaces.Data;
using System.Data;
using System.Reflection;
using System.Xml;
using System.Xml.XPath;
using System.Collections;
using FC.Shared.Entities;
using System.Xml.Linq;

namespace FC.Shared.EntityMapper
{
    public class EntityMapper : IEntityMapper
    {
        //protected IDataProvider provider;
        protected IDataRecord _Record;
        protected IDataHelper _Helper;
        protected XDocument _LinqDoc;
        public int RecursionLvl = 0;
        private int _RecursionLvl;

        public IDataRecord Record { get { return _Record; } }
        public IDataHelper Helper { get { return _Helper; } }
        protected string CultureIsoName { get; set; }
        protected object T_Instance;
        public EntityMapper() { }
        public EntityMapper(IDataHelper helper)
        {
            _Helper = helper;
            _RecursionLvl = 0;
        }

        public T MapTo<T>(IDataRecord record) where T : IBaseModel
        {
            T_Instance = Activator.CreateInstance<T>();

            foreach (PropertyInfo info in T_Instance.GetType().GetProperties())
            {
                if (record[info.Name] != null)
                {
                    T_Instance.GetType().GetProperty(info.Name).SetValue(T_Instance, record[info.Name]);
                }
            }
            _Record = record;

            return (T)T_Instance;
        }

        public IEnumerable<T> MapToList<T>(IEnumerable<IDataRecord> record) where T : IBaseModel
        {
            throw new NotImplementedException();
        }

        public void SetXDoc(XDocument doc)
        {
            _LinqDoc = doc;
        }

        /// Fetch the navigation property from the umbraco XML.
        /// </summary>
        /// <param name="pinfo">The reflected property info type</param>
        /// <param name="node">XElement to fetch from, be aware that this is the root node if you want to enable recursion.</param>
        /// <param name="navProperty">The instantiated navigation property</param>
        /// <param name="navType">The navigation type (Internal / External). If external, recursion shall be applied to find the relation.</param>
        /// <returns></returns>
        private object _FetchNavigationProperty(PropertyInfo pinfo, XElement node, object navProperty, UmbracoNavigationProperty uNavProperty)
        {
            object returnResult = null;
            Type[] typeInterfaces = pinfo.PropertyType.GetInterfaces();
            if (_RecursionLvl <= 1)
            {
                if (typeInterfaces.Contains(typeof(IEnumerable)))
                {
                    returnResult = _FetchList(pinfo, node, navProperty, uNavProperty);
                }
                else if (typeInterfaces.Contains(typeof(IDictionary)))
                {
                    returnResult = _FetchDictionary(pinfo, node, navProperty, uNavProperty);
                }
                else
                {
                    returnResult = _FetchObject(pinfo, node, navProperty, uNavProperty);
                }
                _RecursionLvl++;
            }
            return returnResult;
        }

        /// <summary>
        /// Fetch a node into an object. (navigation properties)
        /// </summary>
        /// <returns></returns>
        private object _FetchObject(PropertyInfo pinfo, XElement node, object navProperty, UmbracoNavigationProperty uNavProperty)
        {
            if (pinfo.CanWrite)
            {
                Type declaringType = pinfo.PropertyType;
                PropertyInfo[] TypeProperties = declaringType.GetProperties();
                if (uNavProperty.Type == NavigationType.Internal || uNavProperty.Type == NavigationType.TryAutoDetect)
                {
                    //get navigation property type and properties.
                    if (TypeProperties != null && TypeProperties.Count() > 0 && pinfo.CanWrite)
                    {
                        //for every property in the declaringType
                        foreach (PropertyInfo ptypeInfo in TypeProperties)
                        {

                            object[] attribs = ptypeInfo.GetCustomAttributes(true);
                            Type propertyType = ptypeInfo.PropertyType;
                            //has umbracofield or navigation attribute?
                            if (attribs != null && attribs.Count() > 0)
                            {
                                //is field
                                if (attribs[0].GetType().FullName == typeof(UmbracoField).FullName)
                                {
                                    UmbracoField ufield = ptypeInfo.GetCustomAttributes(true)[0] as UmbracoField;
                                    string value = _Helper.FetchXElementValue<string>(node, ufield.Alias);
                                    navProperty = _Helper.SetSafeValue(ptypeInfo, value, navProperty);
                                }
                                //is navigation property
                                if (attribs[0] != null && attribs[0].GetType().FullName == typeof(UmbracoNavigationProperty).FullName)
                                {
                                    UmbracoNavigationProperty prop = ptypeInfo.GetCustomAttributes(true)[0] as UmbracoNavigationProperty;
                                    object childType = Activator.CreateInstance(declaringType);
                                    object val = _FetchNavigationProperty(ptypeInfo, node, childType, prop);
                                    navProperty = _Helper.SetSafeValue(ptypeInfo, val, navProperty);

                                }
                            }
                        }
                    }
                    return navProperty;
                }
                //external node relation like FestivalInfo -> Genres. 
                if (uNavProperty.Type == NavigationType.External)
                {
                    string[] IDS = { };
                    if (node.Element(uNavProperty.Key) != null)
                    {
                        IDS = node.Element(uNavProperty.Key).Value.Split(',');
                    }
                    //make it quicker... so that only mappable types are parsed.
                    foreach (string ID in IDS)
                    {
                        string query = string.Format("//{0}[@id={1}]", uNavProperty.DataType, ID);
                        XElement xElement = _LinqDoc.XPathSelectElement(query);
                        if (!String.IsNullOrEmpty(xElement.ToString()))
                        {
                            object obj = Activator.CreateInstance(pinfo.PropertyType);

                            foreach (PropertyInfo relInfo in obj.GetType().GetProperties())
                            {
                                //Has attributes (annotations).
                                if (relInfo.GetCustomAttributes(true).Count() > 0 && pinfo.CanWrite)
                                {
                                    //Check if attribute is umbraco field.
                                    if (relInfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoField).FullName)
                                    {
                                        UmbracoField ufield = relInfo.GetCustomAttributes(true)[0] as UmbracoField;
                                        Type propertyType = relInfo.GetType();
                                        try
                                        {
                                            string value = _Helper.FetchXElementValue<string>(xElement, ufield.Alias);
                                            if (!String.IsNullOrEmpty(value))
                                            {
                                                obj = _Helper.SetSafeValue(relInfo, value, obj);
                                            }
                                        }
                                        catch (Exception ex)
                                        {
                                            //handle this..
                                        }
                                    }
                                    //Check navigation property.
                                    if (relInfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoNavigationProperty).FullName)
                                    {
                                        UmbracoNavigationProperty prop = relInfo.GetCustomAttributes(true)[0] as UmbracoNavigationProperty;
                                        var nproperty = Activator.CreateInstance(relInfo.PropertyType);
                                        nproperty = _FetchNavigationProperty(relInfo, xElement, nproperty, prop);
                                        obj = Helper.SetSafeValue(relInfo, nproperty, obj);
                                    }
                                }
                            }
                            return obj;
                        }
                    }
                }
            }
            return null;
        }


        /// <summary>
        /// Fetch a dictionary
        /// </summary>
        /// <returns></returns>
        private object _FetchDictionary(PropertyInfo pinfo, XElement node, object navProperty, UmbracoNavigationProperty uNavProperty)
        {
            Dictionary<object, object> result = new Dictionary<object, object>();
            //fetch a dictionary from XML... which is a bit of a challenge i guess...
            //idea: use the nodeName as Key and innerText as value...or so...
            return null;
        }

        private object _FetchList(PropertyInfo pinfo, XElement node, object navProperty, UmbracoNavigationProperty uNavProperty, IEnumerable<XElement> children = null, List<object> argResult = null)
        {
            //check if it has an type parameter.
            List<object> result = new List<object>();
            if (pinfo.PropertyType.GenericTypeArguments.Count() > 0)
            {
                string[] IDS = { };
                if (node.Element(uNavProperty.Key) != null)
                {
                    IDS = node.Element(uNavProperty.Key).Value.Split(',');

                    //make it quicker... so that only mappable types are parsed.
                    foreach (string ID in IDS)
                    {
                        string query = string.Format("//{0}[@id={1}]", uNavProperty.DataType, ID);

                        XElement xElement = _LinqDoc.XPathSelectElement(query);
                        if (!String.IsNullOrEmpty(xElement.ToString()))
                        {

                            if (xElement.Elements().ToList().Count > 0 && xElement.Name != uNavProperty.DataType)
                            {
                                result = (List<object>)_FetchList(pinfo, node, navProperty, uNavProperty, xElement.Elements().ToList(), result);
                            }
                            else
                            {
                                Type listType = pinfo.PropertyType.GenericTypeArguments[0];
                                object obj = Activator.CreateInstance(listType);
                                foreach (PropertyInfo relInfo in obj.GetType().GetProperties())
                                {
                                    //Has attributes (annotations).
                                    if (relInfo.GetCustomAttributes(true).Count() > 0 && pinfo.CanWrite)
                                    {
                                        //Check if attribute is umbraco field.
                                        if (relInfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoField).FullName)
                                        {
                                            UmbracoField ufield = relInfo.GetCustomAttributes(true)[0] as UmbracoField;
                                            Type propertyType = relInfo.GetType();
                                            string value = Helper.FetchXElementValue<string>(xElement, ufield.Alias);
                                            obj = _Helper.SetSafeValue(relInfo, value, obj);
                                        }
                                        //Check navigation property.
                                        if (relInfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoNavigationProperty).FullName)
                                        {
                                            UmbracoNavigationProperty prop = relInfo.GetCustomAttributes(true)[0] as UmbracoNavigationProperty;
                                            var nproperty = Activator.CreateInstance(relInfo.PropertyType);
                                            nproperty = _FetchNavigationProperty(relInfo, xElement, nproperty, prop);
                                            obj = Helper.SetSafeValue(relInfo, nproperty, obj);
                                        }
                                    }
                                }
                                result.Add(obj);
                            }
                        }
                    }
                    return result;
                }
                else
                {
                    return null;
                }
            }
            else {
                return null;
            }
        }

        public void InjectCulture<T>(T to, string cultureIsoName) where T : IBaseModel
        {
            throw new Exception("InjectCulture is obsolete.");
        }
        public void InjectCulture(string cultureIsoName)
        {
            if (cultureIsoName == null)
            {
                throw new Exception("Injection error, culturisoname is null");
            }
            CultureIsoName = cultureIsoName;
        }

        public T MapTo<T>(XElement node) where T : IBaseModel
        {
            List<T> result = new List<T>();
            //foreach every entity in list
            //testcase check if the XMLNode is mappable to an local entity.

            //create instance of an model;
            T type = Activator.CreateInstance<T>();
            foreach (PropertyInfo pinfo in type.GetType().GetProperties())
            {
                if (pinfo.CanWrite)
                {
                    //Has attributes (annotations).
                    if (pinfo.GetCustomAttributes(true).Count() > 0)
                    {
                        //Check if attribute is umbraco field.
                        if (pinfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoField).FullName)
                        {
                            UmbracoField ufield = pinfo.GetCustomAttributes(true)[0] as UmbracoField;
                            Type propertyType = pinfo.GetType();
                            string value = _Helper.FetchXElementValue<string>(node, ufield.Alias);
                            type = (T)_Helper.SetSafeValue(pinfo, value, type);
                        }
                        //Check navigation property.
                        if (pinfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoNavigationProperty).FullName)
                        {
                            _RecursionLvl = 0;
                            UmbracoNavigationProperty prop = pinfo.GetCustomAttributes(true)[0] as UmbracoNavigationProperty;
                            var navProperty = Activator.CreateInstance(pinfo.PropertyType);
                            navProperty = _FetchNavigationProperty(pinfo, node, navProperty, prop);
                            type = (T)_Helper.SetSafeValue(pinfo, navProperty, type);
                        }
                    }

                    else
                    {
                        string value = _Helper.FetchXElementValue<string>(node, pinfo.Name);
                        type = (T)_Helper.SetSafeValue(pinfo, value, type);
                    }
                }
            }

            return type;
        }

        public IEnumerable<T> MapToList<T>(IEnumerable<XElement> elements) where T : IBaseModel
        {
            List<T> result = new List<T>();
            //foreach every entity in list
            //testcase check if the XMLNode is mappable to an local entity.
            foreach (XElement node in elements)
            {
                //create instance of an model;
                T type = Activator.CreateInstance<T>();
                foreach (PropertyInfo pinfo in type.GetType().GetProperties())
                {
                    if (pinfo.CanWrite)
                    {
                        //Has attributes (annotations).
                        if (pinfo.GetCustomAttributes(true).Count() > 0)
                        {
                            //Check if attribute is umbraco field.
                            if (pinfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoField).FullName)
                            {
                                UmbracoField ufield = pinfo.GetCustomAttributes(true)[0] as UmbracoField;
                                Type propertyType = pinfo.GetType();
                                string value = _Helper.FetchXElementValue<string>(node, ufield.Alias);
                                type = (T)_Helper.SetSafeValue(pinfo, value, type);
                            }
                            //Check navigation property.
                            if (pinfo.GetCustomAttributes(true)[0].GetType().FullName == typeof(UmbracoNavigationProperty).FullName)
                            {
                                _RecursionLvl = 0;
                                UmbracoNavigationProperty prop = pinfo.GetCustomAttributes(true)[0] as UmbracoNavigationProperty;
                                var navProperty = Activator.CreateInstance(pinfo.PropertyType);
                                navProperty = _FetchNavigationProperty(pinfo, node, navProperty, prop);
                                type = (T)_Helper.SetSafeValue(pinfo, navProperty, type);
                            }
                        }

                        else
                        {
                            string value = _Helper.FetchXElementValue<string>(node, pinfo.Name);
                            type = (T)_Helper.SetSafeValue(pinfo, value, type);
                        }
                    }
                }
                result.Add(type);
            }
            return result;
        }
    }

    //private object _FetchExternalList(PropertyInfo pinfo, XmlNode node, object navProperty, XmlDocument XDoc)
    //{
    //    XDoc.GetElementsByTagName()
    //}


}
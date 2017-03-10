using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace FC.Interfaces.Data
{
    public interface IEntityMapper
    {
        T MapTo<T>(IDataRecord record) where T : IBaseModel;
        IEnumerable<T> MapToList<T>(IEnumerable<IDataRecord> record) where T : IBaseModel;

        T MapTo<T>(XElement record) where T : IBaseModel;
        void SetXDoc(XDocument doc);
        IEnumerable<T> MapToList<T>(IEnumerable<XElement> record) where T : IBaseModel;

        IDataRecord Record
        {
            get;
        }
        IDataHelper Helper
        {
            get;
        }
        void InjectCulture<T>(T to, string cultureIsoName) where T : IBaseModel;
        void InjectCulture(string cultureIsoName);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using FC.Shared.Attribs;
using System.Text.RegularExpressions;
using FC.Interfaces.Data;

namespace FC.BL.Validation
{
    public class Validator
    {
        private List<IValidationError> Results { get; set; }

        public List<IValidationError> ValidateModel<T>(T model) {
            Results = new List<IValidationError>();

            foreach (PropertyInfo i in model.GetType().GetProperties())
            {
                FC.Shared.Attribs.Validation v = i.GetCustomAttribute<FC.Shared.Attribs.Validation>();
                bool isStr = true;
                string value = "";
                List<object> valueList = new List<object>();
                if (v != null)
                {
                    
                    if (i.GetValue(model) != null)
                    {
                        if (i.GetValue(model).GetType() == typeof(List<>))
                        {
                            isStr = false;
                            valueList = i.GetValue(model) as List<object>;
                        }
                        else
                        {
                            value = i.GetValue(model).ToString();
                        }
                    }
                    if (v.Required && value.Length == 0 && isStr)
                    {
                        Results.Add(new ValidationError { Fieldname = i.Name, Message = v.RequiredMsg.Replace("$FIELD_NAME$", i.Name) });
                    }
                    else if (v.Required && !isStr)
                    {
                        if (valueList.Count() == 0)
                        {
                            Results.Add(new ValidationError { Fieldname = i.Name, Message = v.RequiredMsg.Replace("$FIELD_NAME$", i.Name) });
                        }
                    }
                    else if (v.MaxLength != 0 && value.Length > v.MaxLength && isStr)
                    {
                        Results.Add(new ValidationError { Fieldname = i.Name, Message = $"The field {i.Name} exceeds the max. character limit of {v.MaxLength}." });
                    }
                    if (v.Rule != null && isStr && value.Length > 0)
                    {
                        Regex regEx = new Regex(v.Regex);
                        if (!regEx.Match(value).Success)
                        {
                            Results.Add(new ValidationError { Fieldname = i.Name, Message = v.InvalidMsg.Replace("$FIELD_NAME$", i.Name) });
                        }
                    }
                    
                }
            }
            return Results;
        }
    }
}

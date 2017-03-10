using FC.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Validation
{
    public class ValidationError : IValidationError
    {
        public string Fieldname { get; set; }
        public string Message { get; set; }
    }
}

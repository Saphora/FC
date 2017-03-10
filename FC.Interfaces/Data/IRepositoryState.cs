using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Data { 

    public interface IRepositoryState
    {
        object Data { get; set; }
        bool ERROR { get; set; }
        bool NOT_AUTHORIZED { get; set; }
        bool SUCCESS { get; set; }
        bool EXISTS { get; set; }
        bool INVALID { get; set; }
        bool DBERROR { get; set; }
        string MSG { get; set; }
        string StackTrace { get; set; }
        List<IValidationError> ValidationErrors { get; set; }
        Exception Exception { get; set; }
        DbEntityValidationException ValidationEx { get; set; }
        Guid? AffectedID { get; set; }
    }
}

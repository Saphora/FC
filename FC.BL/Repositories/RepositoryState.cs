using FC.BL.Validation;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Interfaces.Data;

namespace FC.BL.Repositories
{
    public class RepositoryState : IRepositoryState
    {
        public RepositoryState()
        {
            NOT_AUTHORIZED = false;
            SUCCESS = false;
            EXISTS = false;
            INVALID = false;
            ERROR = false;
            DBERROR = false;
            ValidationErrors = new List<IValidationError>();
        }
        public RepositoryState(bool success, string msg)
        {
            NOT_AUTHORIZED = false;
            SUCCESS = success;
            EXISTS = false;
            INVALID = false;
            ERROR = false;
            MSG = msg;
            DBERROR = false;
            ValidationErrors = new List<IValidationError>();
        }
        public RepositoryState(bool success, string msg, Guid? afid)
        {
            NOT_AUTHORIZED = false;
            SUCCESS = success;
            EXISTS = false;
            INVALID = false;
            ERROR = false;
            MSG = msg;
            DBERROR = false;
            AffectedID = afid;
            ValidationErrors = new List<IValidationError>();
        }


        public object Data { get; set; }
        public bool ERROR { get; set; }
        public bool NOT_AUTHORIZED { get; set; }
        public bool SUCCESS { get; set; }
        public bool EXISTS { get; set; }
        public bool INVALID { get; set; }
        public bool DBERROR { get; set; }
        public string MSG { get; set; }
        public List<IValidationError> ValidationErrors { get; set; }
        public Exception Exception { get; set; }
        public DbEntityValidationException ValidationEx { get; set; }
        public string StackTrace { get; set; }
        public Guid? AffectedID { get; set; }
    }

    [Obsolete("This is currently not correct implemented so do not use it yet.")]
    public class RepositoryState<T>
    {
        public RepositoryState()
        {
            NOT_AUTHORIZED = false;
            SUCCESS = false;
            EXISTS = false;
            INVALID = false;
            ERROR = false;
            DBERROR = false;
            ValidationErrors = new List<IValidationError>();
        }
        public T Data { get; set; }
        public bool ERROR { get; set; }
        public bool NOT_AUTHORIZED { get; set; }
        public bool SUCCESS { get; set; }
        public bool EXISTS { get; set; }
        public bool INVALID { get; set; }
        public bool DBERROR { get; set; }
        public string MSG { get; set; }
        public List<IValidationError> ValidationErrors { get; set; }
        public Exception Exception { get; set; }
        public DbEntityValidationException ValidationEx { get; set; }
        public string StackTrace { get; set; }
        public Guid? AffectedID { get; set; }
    }

}

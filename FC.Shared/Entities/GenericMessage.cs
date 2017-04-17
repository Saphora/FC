using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public enum GenericMessageStatus
    {
        DBError = 100,
        SystemError = 200,
        GenericError = 300,
        AuthorizationError = 400,
        HTTPError = 500,
        UIError = 600,
        InvalidTestResult = 700,
        SensitiveDataError = 800,
        SecurityBreach = 900,
        Warning = 1000,
        Info = 2000,
        Message = 3000
    }
    public class GenericMessage
    {
        [Key]
        public Guid MessageID { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime Created { get; set; }

        
        public string ExceptionType { get; set; }

        public string Exception { get; set; }

        public string StackTrace { get; set; }

        public string InnerException { get; set; }

        public string InnerStackTrace { get; set; }

        public string NotifyToEmail { get; set; }

        public string NotifyToPhone { get; set; }

        public int LineNR { get; set; }

        public GenericMessageStatus Status { get; set; }

        public bool IsNew { get; set; }
        public bool IsHandled { get; set; }
        public bool IsDeleted { get; set; }
        public bool NotifyByMail { get; set; }
        public bool IsPublic { get; set; }

        public bool IsUserMessage { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime ArchiveDate { get; set; }

        [Index]
        public Guid? SessionID { get; set; }

        [Index]
        public Guid? UserID { get; set; }

        public List<Guid> VisibleTo { get; set; }

        private Exception _prevExc;
        public Exception GetDeepestException(Exception ex)
        {
            if (ex.InnerException == null)
            {
                if(_prevExc == null)
                {
                    return ex;
                }
                return _prevExc;
            }
            else
            {
                while (ex.InnerException != null)
                {
                    _prevExc = ex;
                    ex = ex.InnerException;
                    return GetDeepestException(ex);
                }
                return ex;
            }

        }

        public GenericMessage() { }

        public GenericMessage(string title, string message, GenericMessageStatus status)
        {
            this.MessageID = Guid.NewGuid();
            this.ExceptionType = null;
            this.Message = message;
            this.Title = title;
            this.Status = status;
            this.SessionID = null;
            this.UserID = null;
            this.Created = DateTime.Now;
            this.ArchiveDate = DateTime.Now.AddDays(180);
            this.IsNew = true;
            this.IsDeleted = false;
            this.IsHandled = false;
        }

        public GenericMessage(string title, string message, GenericMessageStatus status, Guid? sessID = null, Guid? userID = null)
        {
            this.MessageID = Guid.NewGuid();
            this.ExceptionType = "Exception";
            this.Message = message;
            this.Title = title;
            this.Status = status;
            this.SessionID = sessID;
            this.UserID = userID;
            this.Created = DateTime.Now;
            this.ArchiveDate = DateTime.Now.AddDays(180);
            this.IsDeleted = false;
            this.IsNew = true;
            this.IsHandled = false;
            this.IsPublic = false;
        }

        public GenericMessage(Exception ex,  GenericMessageStatus status, string exceptionType = "Exception", Guid? sessID = null, Guid? userID = null)
        {
            ex = this.GetDeepestException(ex);
            this.MessageID = Guid.NewGuid();
            this.Exception = ex.Message;
            this.StackTrace = ex.StackTrace;
            this.SessionID = sessID;
            this.Status = status;
            this.UserID = userID;
            this.ArchiveDate = DateTime.Now.AddDays(180);
            this.IsHandled = false;
            this.IsNew = true;
            this.IsDeleted = false;
            this.IsPublic = false;
            this.IsUserMessage = false;
            this.Created = DateTime.Now;

            if (ex.InnerException != null)
            {
                this.InnerException = ex.InnerException.Message;
                this.InnerStackTrace = ex.InnerException.StackTrace;
            }
        }

        public GenericMessage(Exception ex, string title, GenericMessageStatus status, string exceptionType = "Exception", Guid? sessID = null, Guid? userID = null)
        {
            ex = this.GetDeepestException(ex);
            this.MessageID = Guid.NewGuid();
            this.Exception = ex.Message;
            this.Title = title;
            this.StackTrace = ex.StackTrace;
            this.SessionID = sessID;
            this.Status = status;
            this.UserID = userID;
            this.ArchiveDate = DateTime.Now.AddDays(180);
            this.IsHandled = false;
            this.IsNew = true;
            this.IsDeleted = false;
            this.IsPublic = false;
            this.IsUserMessage = false;
            this.Created = DateTime.Now;

            if (ex.InnerException != null)
            {
                DbEntityValidationException e = ex.InnerException as DbEntityValidationException;
                if (e != null)
                {
                    foreach (DbEntityValidationResult res in e.EntityValidationErrors)
                    {
                        foreach (DbValidationError err in res.ValidationErrors)
                        {
                            this.Message += $"PROP: {err.PropertyName}; MSG: {err.ErrorMessage} {Environment.NewLine}";
                        }
                    }
                }
                else
                {
                    this.InnerException = ex.InnerException.Message;
                    this.InnerStackTrace = ex.InnerException.StackTrace;
                }
            }

        }
        public GenericMessage(DbEntityValidationException ex, string title, GenericMessageStatus status, string exceptionType = "DbEntityValidationException", Guid? sessID = null, Guid? userID = null)
        {
            this.MessageID = Guid.NewGuid();
            this.Exception = ex.Message;
            this.Title = title;
            this.StackTrace = ex.StackTrace;
            this.SessionID = sessID;
            this.Status = status;
            this.UserID = userID;
            this.ArchiveDate = DateTime.Now.AddDays(180);
            this.IsHandled = false;
            this.IsNew = true;
            this.IsDeleted = false;
            this.IsPublic = false;
            this.IsUserMessage = false;
            this.Created = DateTime.Now;

            foreach(DbEntityValidationResult e in ex.EntityValidationErrors)
            {
                foreach(DbValidationError err in e.ValidationErrors)
                {
                    this.Message += $"PROP: {err.PropertyName}; MSG: {err.ErrorMessage} {Environment.NewLine}";
                }
            }
            if (ex.InnerException != null)
            {
                this.InnerException = ex.InnerException.Message;
                this.InnerStackTrace = ex.InnerException.StackTrace;
            }

        }
        public GenericMessage(string title, string message, Exception ex, GenericMessageStatus status, string exceptionType = "Exception",  Guid? sessID = null, Guid? userID = null)
        {
            this.MessageID = Guid.NewGuid();
            this.Message = message;
            this.Title = title;
            this.Exception = ex.Message;
            this.StackTrace = ex.StackTrace;
            this.SessionID = sessID;
            this.Status = status;
            this.UserID = userID;
            this.Created = DateTime.Now;
            this.ArchiveDate = DateTime.Now.AddDays(180);
            this.IsNew = true;
            this.IsPublic = true;
            this.IsDeleted = false;
            this.IsHandled = false;
            this.IsUserMessage = false;
            if (ex.InnerException != null)
            {
                this.InnerException = ex.InnerException.Message;
                this.InnerStackTrace = ex.InnerException.StackTrace;
            }
        }

        public string ToXMLString()
        {
            return    $"<genericmessage>" + Environment.NewLine
                    + $"<title>{this.Title}</title>"
                    + $"<message>{this.Message}</message>"
                    + $"<created>{this.Created.ToString()}</created>"
                    + $"<isnew>{this.IsNew}</isnew>"
                    + $"<ishandled>{this.IsHandled}</ishandled>"
                    + $"<isdeleted>{this.IsDeleted}</isdeleted>"
                    + $"<exception>"
                        + $"<type>{this.ExceptionType}</type>"
                        + $"<message>{this.Exception}</message>"
                        + $"<stacktrace>{this.StackTrace}</stacktrace>"
                        + $"<inner>"
                                + $"<message>{this.InnerException}</message>"
                                + $"<stacktrace>{this.InnerStackTrace}</stacktrace>"
                        + $"</inner>"
                    + $"</exception>"
                    +$"<sessionid>{this.SessionID}</sessionid>"
                    + $"<userid>{this.UserID}</userid>"
                    + $"<linenr>{this.LineNR}</userid>"
                    + $"<status>{this.Status}</status>"
                    + "</genericmessage>" +Environment.NewLine;
        }
    }
}

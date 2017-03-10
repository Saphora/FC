using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Data.Entity.Validation;

namespace FC.BL.Repositories
{
    public class GenericMessageRepository : BaseRepository
    {
        public GenericMessageRepository() : base()
        { }

        public void Create(GenericMessage msg)
        {
            msg.Created = DateTime.Now;
            msg.IsNew = true;
            msg.IsPublic = false;
            msg.IsHandled = false;
            msg.IsDeleted = false;
            msg.ArchiveDate = DateTime.Now.AddYears(1);
            msg.IsUserMessage = false;
            if (AuthorizationRepository.Current.CurrentUser != null)
            {
                if (AuthorizationRepository.Current.CurrentUser.UserID.HasValue)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
            }
            if (AuthorizationRepository.Current.Session != null)
            {
                if (AuthorizationRepository.Current.Session.SessionID.HasValue)
                {
                    msg.SessionID = AuthorizationRepository.Current.Session.SessionID;
                }
            }
            this.Db.GenericMessages.Add(msg);
            this.Db.SaveChanges();
        }

        public void Create(string title, string message, GenericMessageStatus status)
        {
            GenericMessage msg = new Shared.Entities.GenericMessage(title, message, status);
            if (AuthorizationRepository.Current.CurrentUser != null)
            {
                if (AuthorizationRepository.Current.CurrentUser.UserID.HasValue)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
            }
            msg.Created = DateTime.Now;
            msg.IsNew = true;
            msg.IsPublic = false;
            msg.IsHandled = false;
            msg.IsDeleted = false;
            msg.ArchiveDate = DateTime.Now.AddYears(1);
            msg.IsUserMessage = false;
            this.Db.GenericMessages.Add(msg);
            this.Db.SaveChanges();
        }

        public void Create(Exception ex, GenericMessageStatus status, string exceptionType = "Exception")
        {
            GenericMessage msg = new GenericMessage(ex, status, exceptionType);
            if (AuthorizationRepository.Current.CurrentUser != null)
            {
                if (AuthorizationRepository.Current.CurrentUser.UserID.HasValue)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
            }
            if (AuthorizationRepository.Current.Session != null)
            {
                if (AuthorizationRepository.Current.Session.SessionID.HasValue)
                {
                    msg.SessionID = AuthorizationRepository.Current.Session.SessionID;
                }
            }
            msg.Created = DateTime.Now;
            msg.IsNew = true;
            msg.IsPublic = false;
            msg.IsHandled = false;
            msg.IsDeleted = false;
            msg.ArchiveDate = DateTime.Now.AddYears(1);
            msg.IsUserMessage = false;
            this.Db.GenericMessages.Add(new GenericMessage(ex, status, exceptionType));
            this.Db.SaveChanges();
        }

        public void Create(string title, string message, Exception ex, GenericMessageStatus status, string exceptionType = "Exception")
        {
            GenericMessage msg = new GenericMessage(title, message, ex, status, exceptionType);
            if (AuthorizationRepository.Current.CurrentUser != null)
            {
                if (AuthorizationRepository.Current.CurrentUser.UserID.HasValue)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
            }
            if (AuthorizationRepository.Current.Session != null)
            {
                if (AuthorizationRepository.Current.Session.SessionID.HasValue)
                {
                    msg.SessionID = AuthorizationRepository.Current.Session.SessionID;
                }
            }
            msg.Created = DateTime.Now;
            msg.IsNew = true;
            msg.IsPublic = false;
            msg.IsHandled = false;
            msg.IsDeleted = false;
            msg.ArchiveDate = DateTime.Now.AddYears(1);
            msg.IsUserMessage = false;
            this.Db.GenericMessages.Add(new GenericMessage(title, message, ex, status, exceptionType));
            this.Db.SaveChanges();
        }

        public void Create(string title, string message, DbEntityValidationException ex, GenericMessageStatus status, string exceptionType = "DbEntityValidationException")
        {
            GenericMessage msg = new GenericMessage(title, message, ex, status, exceptionType);
            if (AuthorizationRepository.Current.CurrentUser != null)
            {
                if (AuthorizationRepository.Current.CurrentUser.UserID.HasValue)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
            }
            if(AuthorizationRepository.Current.Session != null)
            {
                if(AuthorizationRepository.Current.Session.SessionID.HasValue)
                {
                    msg.SessionID = AuthorizationRepository.Current.Session.SessionID;
                }
            }
            msg.Created = DateTime.Now;
            msg.IsNew = true;
            msg.IsPublic = false;
            msg.IsHandled = false;
            msg.IsDeleted = false;
            msg.ArchiveDate = DateTime.Now.AddYears(1);
            msg.IsUserMessage = false;
            this.Db.GenericMessages.Add(new GenericMessage(title, message, ex, status, exceptionType));
            this.Db.SaveChanges();
        }
    }
}

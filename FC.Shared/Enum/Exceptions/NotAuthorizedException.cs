using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Exceptions
{
    public class NotAuthorizedException : Exception
    {
        public string UserID { get; set; }
        public string SessionID { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public string Payload { get; set; }
        public string URI { get; set; }
        public string[] ActivePermissions { get; set; }
        public string[] RequiredPermissions { get; set; }
        public string[] Roles { get; set; }

        public NotAuthorizedException(AppUserSession sess, List<string> roles)
            : base($"You are not authorized to execute this operation.")
        {
            if (sess.UserID != null)
            {
                this.UserID = sess.UserID.Value.ToString();
            }
            if (sess.SessionID != null)
            {
                this.SessionID = sess.SessionID.Value.ToString();
            }
            this.Action = sess.Action;
            this.Controller = sess.Controller;
            this.URI = sess.URI;
            this.Roles = roles.ToArray();
        }
    }
}

using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class AppUserSession
    {
        public AppUserSession()
        {
            this.Token = Guid.NewGuid();
            this.Created = DateTime.Now;
            this.Expires = DateTime.Now.AddHours(2);
            this.Action = null;
            this.Controller = null;
        }

        /// <summary>
        /// Initialize a session with action/controller predefined.
        /// </summary>
        /// <param name="action">The controller action</param>
        /// <param name="controller">The WPF/Web controller </param>
        public AppUserSession(string action, string controller)
        {
            this.Token = Guid.NewGuid();
            this.Created = DateTime.Now;
            this.Expires = DateTime.Now.AddHours(2);
            this.Action = null;
            this.Controller = null;
        }

        /// <summary>
        /// Initialize a session with action/controller predefined binded to a certain user.
        /// </summary>
        /// <param name="action">The controller action</param>
        /// <param name="controller">The WPF/Web controller </param>
        public AppUserSession(string action, string controller, Guid? userID)
        {
            this.Token = Guid.NewGuid();
            this.Created = DateTime.Now;
            this.Expires = DateTime.Now.AddHours(2);
            this.Action = null;
            this.Controller = null;
            this.UserID = userID;
        }

        public void Refresh()
        {
            this.Token = Guid.NewGuid();
            this.Expires = DateTime.Now.AddHours(2);
        }

        [Key]
        public Guid? SessionID { get; set; }
        
        public Guid? UserID { get; set; }

        [Index]
        public Guid? Token { get; set; }

        public bool Active { get; set; }
        
        [ForeignKey("UserID")]
        public virtual ApplicationUser User { get; set; }

        public string IPAddress { get; set; }
        public string IPv6Address { get; set; }
        public string HostName { get; set; }
        public string HostAddress { get; set; }

        [Index]
        public DateTime Expires { get; set; }

        [Index]
        public DateTime Created { get; set; }

        [Index]
        public DateTime Modified { get; set; }

        public string Culture { get; set; }
        public string UserAgent { get; set; }
        public string ScreenWidth { get; set; }
        public string ScreenHeight { get; set; }

        /// <summary>
        /// A user is authorized when the user has te correct permissions for a certain action
        /// </summary>
        public bool Authorized { get; set; }

        /// <summary>
        /// A user is authenticated when he passes the username/password authentication.
        /// </summary>
        public bool Authenticated { get; set; }
        public bool IsMobileDevice { get; set; }
        public string BrowserName { get; set; }
        public string Platform { get; set; }
        public string MobileDeviceName { get; set; }
        public string MobileDeviceVersion { get; set; }
        public AuthMode Mode { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string URI { get; set; }
        public string Payload { get; set; }
    }
}

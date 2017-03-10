using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UVisibility
    {
        [Key]
        public Guid? VisibilityID { get; set; }

        public bool Desktop { get; set; }
        public bool SmDesktop { get; set; }
        public bool Mobile { get; set; }
        public bool SmMobile { get; set; }
        public string ColLGCls { get; set; }
        public string ColMDCls { get; set; }
        public string ColSMCls { get; set; }
        public string ColXSCls { get; set; }

        private void determineDesktop(string type, string cls)
        {
            switch (type.ToLower())
            {
                case "desktop_a":
                case "desktop_b":
                case "desktop_c":
                case "desktop_d":
                case "desktop_e":
                case "desktop_f":
                case "desktop_g":
                    this.Desktop = true;
                    this.Mobile = false;
                    this.SmMobile = false;
                    this.SmDesktop = false;
                    this.ColLGCls = cls;
                break;

            }
        }

        private void determineSmallDesktop(string type, string cls)
        {
            switch (type.ToLower())
            {
                case "sm_desktop_a":
                case "sm_desktop_b":
                case "sm_desktop_c":
                case "sm_desktop_d":
                case "sm_desktop_e":
                case "sm_desktop_f":
                case "sm_desktop_g":
                    this.Desktop = false;
                    this.Mobile = false;
                    this.SmMobile = false;
                    this.SmDesktop = true;
                    this.ColMDCls = cls;
                break;

            }
        }

        private void determineMobile(string type, string cls)
        {
            switch (type.ToLower())
            {
                case "mobile_a":
                case "mobile_b":
                case "mobile_c":
                case "mobile_d":
                case "mobile_e":
                case "mobile_f":
                case "mobile_g":
                    this.Desktop = false;
                    this.Mobile = false;
                    this.SmMobile = true;
                    this.SmDesktop = true;
                    this.ColSMCls = cls;
                break;
            }
        }

        private void determineSmallMobile(string type, string cls)
        {
            switch (type.ToLower())
            {
                case "sm_mobile_a":
                case "sm_mobile_b":
                case "sm_mobile_c":
                case "sm_mobile_d":
                case "sm_mobile_e":
                case "sm_mobile_f":
                case "sm_mobile_g":
                    this.Desktop = false;
                    this.Mobile = false;
                    this.SmMobile = true;
                    this.SmDesktop = true;
                    this.ColXSCls = cls;
                break;
            }
        }

        public void DetermineType(string type, string cls)
        {
            determineDesktop(type, cls);
            determineSmallDesktop(type, cls);
            determineMobile(type, cls);
            determineSmallMobile(type, cls);
        }

        public void Determine(string visibility)
        {
            string[] tmp = visibility.Split('|');
            string type = "";
            string cls = "";
            if (tmp[0] != null && tmp[1] != null)
            {
                type = tmp[0];
                cls = tmp[1];
                DetermineType(type, cls);
            }
            else
            {
                throw new Exception("Invalid visibility specifier: '" + visibility + "'");
            }
        }

        public UVisibility()
        {
        }

        public UVisibility(string visibility)
        {
            Determine(visibility);
        }
    }
}

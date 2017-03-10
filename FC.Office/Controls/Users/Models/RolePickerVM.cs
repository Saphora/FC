using FC.Office.Shared;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Users.Models
{
    public class RolePickerVM : VMBase
    {
        public RolePickerVM()
        {
            this.ActiveRoles = new List<Role>();
            this.SysRoles = new List<Role>();
        }

        private string _selectedCount { get; set; }
        public string SelectedCount
        {
            get
            {
                return _selectedCount;
            }
            set
            {
                if (value != _selectedCount)
                {
                    this._selectedCount = value;
                    this.NotifyPropertyChanged();
                }
            }
        }

        private List<Role> _sysRoles { get; set; }
        public List<Role> SysRoles
        {
            get
            {
                return _sysRoles;
            }
            set
            {
                if (value != _sysRoles)
                {
                    this._sysRoles = value;
                    this.NotifyPropertyChanged("SysRoles");
                }
            }
        }
        private List<Role> _activeRoles { get; set; }
        public List<Role> ActiveRoles
        {
            get
            {
                return _activeRoles;
            }
            set
            {
                if (value != _activeRoles)
                {
                    this._activeRoles = value;
                    this.NotifyPropertyChanged("ActiveRoles");
                }
            }
        }

        public Role Model { get; set; }

    }
}

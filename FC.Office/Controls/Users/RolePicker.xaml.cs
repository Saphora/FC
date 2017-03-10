using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using FC.Office.Properties;
using FC.Office.Controls.Users.Models;
using FC.Shared.Entities;
using FC.BL.Repositories;
using System.ComponentModel;
using FC.Office.Controls.Users.Models;

namespace FC.Office.Controls.Users
{
    /// <summary>
    /// Interaction logic for GenrePicker.xaml
    /// </summary>
    public partial class RolePicker : UserControl, INotifyPropertyChanged
    {
        public event EventHandler<List<Role>> SelectionChanged;
        public event PropertyChangedEventHandler PropertyChanged;
        public static List<Role> SysRoles { get; set; }
        public RolePickerVM vm { get; set; }
        public RolePickerModal Modal { get; set; }
        public AuthorizationRepository RoleRepo { get; set; }
        public bool IsOpen { get; set; }

        public static readonly DependencyProperty RolesProperty = DependencyProperty.Register("Roles", typeof(List<Role>), typeof(RolePicker));

        public List<Role> Roles
        {
            get { return (List<Role>)GetValue(RolesProperty); }
            set { SetValue(RolesProperty, value); this.PropertyChanged(this, new PropertyChangedEventArgs("Roles")); }
        }


        public RolePicker()
        {
            InitializeComponent();
            this.vm = new RolePickerVM();
            this.RoleRepo = AuthorizationRepository.Current;
            this.PropertyChanged += GenrePicker_PropertyChanged;
            vm.SysRoles = RoleRepo.GetRoleList().OrderBy(o => o.Name).ToList();
            if (this.Roles == null)
            {
                this.vm.SelectedCount = string.Format("{0} selected", 0);
            }
            else
            {
                this.vm.ActiveRoles = this.Roles;
                if (vm.ActiveRoles != null)
                {
                    foreach (Role g in vm.ActiveRoles)
                    {
                        vm.SysRoles.Remove(g);
                    }
                }
                this.vm.SelectedCount = string.Format("{0} selected", Roles.Count());
                this.DataContext = null;
                this.DataContext = vm;
            }
        }


        public void SetRoleData(List<Role> genres)
        {
            this.Roles = genres;
            vm.ActiveRoles = genres;
            foreach (Role g in genres)
            {
                vm.SysRoles.Remove(g);
            }
            this.DataContext = null;
            this.DataContext = vm;
        }

        private void GenrePicker_PropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if (this.Roles != null)
            {
                this.vm.ActiveRoles = this.Roles;
                if (vm.ActiveRoles != null)
                {
                    foreach (Role g in vm.ActiveRoles)
                    {
                        vm.SysRoles.Remove(g);
                    }
                }

                this.vm.SelectedCount = string.Format("{0} selected", Roles.Count());
            }
            else
            {
                this.vm.SelectedCount = string.Format("{0} selected", 0);
            }
        }

        private void Modal_SelectionChanged(object sender, List<Role> e)
        {
            if (e != null)
            {
                this.vm.SelectedCount = string.Format("{0} selected", e.Count);
                if (this.SelectionChanged != null)
                {
                    this.SelectionChanged(this, e);
                }
                this.DataContext = null;
                this.DataContext = this.vm;
            }
            else
            {
                this.vm.SelectedCount = string.Format("{0} selected", 0);
                this.DataContext = null;
                this.DataContext = this.vm;
            }
        }

        private void Modal_Closed(object sender, EventArgs e)
        {
            this.Modal = new RolePickerModal(vm);
            this.Modal.SelectionChanged += Modal_SelectionChanged;
            this.Modal.Closed += Modal_Closed;
            this.IsOpen = false;
        }

        private void SelectRolesBtn_Click(object sender, RoutedEventArgs e)
        {
            if (this.IsOpen == false)
            {
                vm.SysRoles = this.RoleRepo.GetRoleList().ToList();

                if (vm.ActiveRoles != null)
                {
                    foreach (Role g in vm.ActiveRoles)
                    {
                        vm.SysRoles.Remove(vm.SysRoles.Where(w => w.RoleID == g.RoleID).FirstOrDefault());
                    }
                }

                this.Modal = new RolePickerModal(vm);
                this.Modal.SelectionChanged += Modal_SelectionChanged;
                this.Modal.Closed += Modal_Closed;
                this.IsOpen = true;

                Modal.HorizontalAlignment = HorizontalAlignment.Center;
                Modal.VerticalAlignment = VerticalAlignment.Center;
                Modal.Show();
            }
        }
    }
}

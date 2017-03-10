using FC.BL.Repositories;
using FC.Office.Controls.Users.Models;
using FC.Shared.Entities;
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
using System.Windows.Shapes;

namespace FC.Office.Controls.Users
{
    /// <summary>
    /// Interaction logic for RolePickerModal.xaml
    /// </summary>
    public partial class RolePickerModal : Window
    {
        public event EventHandler<List<Role>> SelectionChanged;
        public RolePickerVM vm { get; set; }
        public AuthorizationRepository RoleRepo { get; set; }
        public RolePickerModal(RolePickerVM vm)
        {
            InitializeComponent();
            this.RoleRepo = AuthorizationRepository.Current;
            this.vm = vm;

            if (vm != null)
            {
                if (vm.ActiveRoles != null && vm.SysRoles != null)
                {
                    foreach (Role g in vm.ActiveRoles)
                    {
                        vm.SysRoles.Remove(g);
                    }
                }
            }
            this.vm.PropertyChanged += Vm_PropertyChanged;
            this.DataContext = vm;
        }

        private void Vm_PropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            this.DataContext = null;
            this.DataContext = vm;
        }

        public void SetRoleData(RolePickerVM vm)
        {
            this.DataContext = null;
            this.DataContext = vm;
        }


        public void activationHandler(List<Role> activated)
        {

        }

        public void DeactivationHandler(List<Role> deactivated)
        {

        }

        private void ActiveRolesList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            ListViewItem s = sender as ListViewItem;
            Role selected = s.DataContext as Role;
            vm.SysRoles.Add(selected);
            vm.ActiveRoles.Remove(selected);
            vm.ActiveRoles = vm.ActiveRoles.OrderBy(o => o.Name).ToList();
            vm.SysRoles = vm.SysRoles.OrderBy(o => o.Name).ToList();
            this.DataContext = null;
            this.DataContext = vm;
            //handle drop sysgenres
        }

        private void SysRolesList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            ListViewItem s = sender as ListViewItem;
            Role selected = s.DataContext as Role;
            vm.ActiveRoles.Add(selected);
            vm.SysRoles.Remove(selected);
            vm.ActiveRoles = vm.ActiveRoles.OrderBy(o => o.Name).ToList();
            vm.SysRoles = vm.SysRoles.OrderBy(o => o.Name).ToList();
            this.DataContext = null;
            this.DataContext = vm;
            //handle drop sysgenres
        }

        private void SaveSelected_Click(object sender, RoutedEventArgs e)
        {
            this.SelectionChanged(this, vm.ActiveRoles);
            this.Close();
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
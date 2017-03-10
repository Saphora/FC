using FC.BL.Repositories;
using FC.Office.Controls.Users.Models;
using FC.Shared.Entities;
using FC.Shared.Enum;
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

namespace FC.Office.Controls.Users
{
    /// <summary>
    /// Interaction logic for UserDataGrid.xaml
    /// </summary>
    public partial class UserDataGrid : UserControl
    {

        public event EventHandler<ApplicationUser> SelectedUserChanged;
        public event EventHandler<ApplicationUser> SaveSuccess;
        public event EventHandler<ApplicationUser> SaveFailure;
        private RepositoryContext repositories { get; set; }
        public UsersVM vm { get; set; }
        public UserDataGrid()
        {
            InitializeComponent();
            MainWindow.Refresh += MainWindow_Refresh;
            repositories = RepositoryContext.GetInstance();
            this.Refresh();
            //vm.Users = repositories.Auth
            this.UserGrid.SelectionChanged += UserGrid_SelectionChanged;
        }

        private void MainWindow_Refresh(object sender, MainWindow e)
        {
            this.Refresh();
        }

        public void Refresh()
        {
            this.vm = new UsersVM();
            vm.Users = this.repositories.Auth.GetAllUsers();
            this.UsersDataGrid.DataContext = null;
            this.UsersDataGrid.DataContext = vm;
            this.DataContext = null;
            this.DataContext = vm;
        }


        private void UserGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(e != null)
            {
                if(e.AddedItems != null)
                {
                    if(e.AddedItems.Count > 0)
                    {
                        ApplicationUser user = e.AddedItems[0] as ApplicationUser;
                        vm.Model = user;
                        this.DataContext = null;
                        this.DataContext = vm;
                        if (this.SelectedUserChanged != null)
                        {
                            this.SelectedUserChanged(this, user);
                        }
                    }
                }
            }
        }

        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            if(e != null)
            {
                if (repositories.Auth.ActionAuthorized(new string[] { Roles.Developer }))
                {
                    var s = this.repositories.Auth.ForceDelete(vm.Model);
                    if (s.SUCCESS)
                    {
                        if (this.SaveSuccess != null)
                        {
                            this.SaveSuccess(this, vm.Model);
                        }
                        this.Refresh();
                    }
                    MessageBox.Show(s.MSG);
                } else
                {
                    MessageBox.Show("You don't have the permission to delete users. Please contact sysadmin");
                }
            }
        }
    }
}

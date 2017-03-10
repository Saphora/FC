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
using FC.Shared.Entities;
using FC.Office.Controls.Users.Models;
using FC.BL.Repositories;

namespace FC.Office.Controls.Users
{
    /// <summary>
    /// Interaction logic for UserCRUD.xaml
    /// </summary>
    public partial class UserCRUD : UserControl
    {
        UsersVM vm { get; set; }
        RepositoryContext repositories { get; set; }
        public event EventHandler<ApplicationUser> SaveSuccess;
        public event EventHandler<ApplicationUser> SaveFailure;

        public UserCRUD()
        {
            InitializeComponent();
            vm = new UsersVM();
            repositories = RepositoryContext.GetInstance();
            this.CountryIDSelect.ItemsSource = vm.SysCountries;
            this.UsersForm.DataContext = null;
            this.UsersForm.DataContext = vm.Model;
        }

        public void Refresh()
        {
            vm = new UsersVM();
            this.UsersForm.DataContext = null;
            this.UsersForm.DataContext = vm.Model;
        }

        private void SaveBtn_Click(object sender, RoutedEventArgs e)
        {
            RepositoryState state;

            if (this.pssRepeat.Password == this.pss.Password)
            {
                if (vm.Model != null)
                {
                    if (vm.Model.Country != null)
                    {
                        vm.Model.CountryID = vm.Model.Country.CountryID;
                    }

                    vm.Model.UserPassword = this.pss.Password;
                    if (vm.Model.UserID == null)
                    {
                        state = repositories.Auth.Create(vm.Model);
                    }
                    else
                    {
                        state = repositories.Auth.Update(vm.Model);
                    }
                    MessageBox.Show(state.MSG);
                    if (state.SUCCESS == true)
                    {
                        this.Refresh();
                        if (this.SaveSuccess != null)
                        {
                            this.SaveSuccess(this, vm.Model);
                        }
                    }
                    else
                    {
                        if (this.SaveFailure != null)
                        {
                            this.SaveFailure(this, vm.Model);
                        }
                    }
                }
            }
            else
            {
                MessageBox.Show("The passwords you have entered doesn't match.");
            }
        }

        public void SetModel(ApplicationUser e)
        {
            if (e != null)
            {
                vm.Model = e;
                this.UsersForm.DataContext = null;
                this.UsersForm.DataContext = vm.Model;
                int index = 0;
                List<UCountry> countries = this.CountryIDSelect.ItemsSource as List<UCountry>;
                foreach (var c in countries)
                {
                    if (c.CountryID == e.CountryID)
                    {
                        this.CountryIDSelect.SelectedIndex = index;
                    }
                    index++;
                }
                index = 0;
                var roles = this.repositories.Auth.GetUserRoles(e.UserID);
                this.RolePicker.SetRoleData(roles);
            }
        }

        private void CreateNewBtn_Click(object sender, RoutedEventArgs e)
        {
            this.Refresh();
        }
    }
}

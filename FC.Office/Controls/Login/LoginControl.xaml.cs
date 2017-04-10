using FC.BL.Repositories;
using FC.Office.Controls.Festival.Models;
using FC.Office.Controls.Genres.Models;
using FC.Office.Controls.Login.Models;
using FC.Office.Shared;
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


namespace FC.Office.Controls.Login
{
    /// <summary>
    /// Interaction logic for LoginControl.xaml
    /// </summary>
    public partial class LoginControl : UserControl
    {
        public LoginModel vm { get; set; }
        public event EventHandler<bool> LoginSuccess;
        public event EventHandler<bool> LoginFailure;
        public RepositoryContext repositories = RepositoryContext.GetInstance();

        public LoginControl()
        {
            InitializeComponent();
            this.vm = new LoginModel();
            this.DataContext = vm;
        }

        private void LoginBtn_Click(object sender, RoutedEventArgs e)
        {
            this.vm = DataContext as LoginModel;
            var s = repositories.Auth.WPFLogin(this.uname.Text, this.pss.Password.ToString());
            if (s != null)
            {
                if (s.Authenticated && s.Authorized)
                {
                    if (repositories.Auth.IsOfficeUser(new string[] { Roles.Admin, Roles.Developer }))
                    {
                        if (this.LoginSuccess != null)
                        {
                            this.LoginSuccess(this, true);
                        }
                    }
                    else
                    {
                        MessageBox.Show("You are not allowed to access this backlog. Therefore we close this application now.");
                        MainWindow.Destroy();
                    }
                }
                else
                {
                    if (this.LoginFailure != null)
                    {
                        this.LoginFailure(this, false);
                    }
                    MessageBox.Show("Invalid username or password.");
                }
            }
            else
            {
                if (this.LoginFailure != null)
                {
                    this.LoginFailure(this, false);
                }
                MessageBox.Show("Invalid username or password.");
            }
            }

        private void pss_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                this.vm = DataContext as LoginModel;
                var s = repositories.Auth.WPFLogin(this.uname.Text, this.pss.Password.ToString());
                if (s != null)
                {
                    if (s.Authenticated && s.Authorized)
                    {
                        if (repositories.Auth.IsOfficeUser(new string[] { Roles.Admin, Roles.Developer }))
                        {
                            if (this.LoginSuccess != null)
                            {
                                this.LoginSuccess(this, true);
                            }
                        }
                        else
                        {
                            MessageBox.Show("You are not allowed to access the Festival Calendar backoffice. Therefore we close this application now.");
                            MainWindow.Destroy();
                        }
                    }
                    else
                    {
                        if (this.LoginFailure != null)
                        {
                            this.LoginFailure(this, false);
                        }
                        MessageBox.Show("Invalid username or password.");
                    }
                }
                else
                {

                    if (this.LoginFailure != null)
                    {
                        this.LoginFailure(this, false);
                    }
                    MessageBox.Show("Invalid username or password.");
                }
            }
        }
    }
}

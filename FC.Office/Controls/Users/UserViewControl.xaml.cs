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
    /// Interaction logic for UserViewControl.xaml
    /// </summary>
    public partial class UserViewControl : UserControl
    {
        public UserViewControl()
        {
            InitializeComponent();
            this.UsersGrid.SelectedUserChanged += UsersGrid_SelectedUserChanged;
            this.UserCRUD.SaveSuccess += UserCRUD_SaveSuccess;
        }
        
        private void UserCRUD_SaveSuccess(object sender, FC.Shared.Entities.ApplicationUser e)
        {
            this.UsersGrid.Refresh();
        }

        private void UsersGrid_SelectedUserChanged(object sender, FC.Shared.Entities.ApplicationUser e)
        {
            this.UserCRUD.SetModel(e);
        }
    }
}

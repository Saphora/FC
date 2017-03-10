using FC.Office.Controls.Media.Models;
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

namespace FC.Office.Controls.Media
{
    /// <summary>
    /// Interaction logic for MediaPickerFormControl.xaml
    /// </summary>
    /// 
    public partial class MediaPickerFormControl : UserControl
    {
        private MediaModal modal { get; set; }
        public MediaPickerControlContext vm { get; set; }
        public MediaPickerFormControl()
        {
            InitializeComponent();
            vm = new MediaPickerControlContext();
        }

        private void opener_Click(object sender, RoutedEventArgs e)
        {
            this.modal = new MediaModal();
            this.modal.Show();
        }
    }
}

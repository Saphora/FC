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

namespace FC.Office.Controls.Countries
{
    /// <summary>
    /// Interaction logic for CountryViewControl .xaml
    /// </summary>
    public partial class CountryViewControl : UserControl
    {
        public CountryViewControl ()
        {
            InitializeComponent();
            this.CountryGrid.SelectedCountryChanged += CountryGrid_SelectedCountryChanged;
            this.CountryCreateCtrl.CreatedOrModified += CountryCreateCtrl_CreatedOrModified;
            this.CountryCreateCtrl.CreatedOrModifiedFailure += CountryCreateCtrl_CreatedOrModifiedFailure;
        }

        private void CountryCreateCtrl_CreatedOrModifiedFailure(object sender, FC.Shared.Entities.UCountry e)
        {
        }

        private void CountryCreateCtrl_CreatedOrModified(object sender, FC.Shared.Entities.UCountry e)
        {
            this.CountryGrid.Refresh();
        }

        private void CountryGrid_SelectedCountryChanged(object sender, FC.Shared.Entities.UCountry e)
        {
            this.CountryCreateCtrl.SetSelected(e);
        }
    }
}

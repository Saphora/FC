using FC.BL.Repositories;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace FC.Office.Controls.Festival
{
    /// <summary>
    /// Interaction logic for FestivalViewControl.xaml
    /// </summary>
    public partial class FestivalViewControl : UserControl
    {
        private RepositoryContext repositories = new RepositoryContext();

        public FestivalViewControl()
        {
            InitializeComponent();
            this.FestivalsGrid.SelectedFestivalChanged += FestivalsGrid_SelectedFestivalChanged;
            this.FestivalEditCTRL.SaveSuccess += FestivalEditCTRL_SaveSuccess;
        }

        private void FestivalEditCTRL_SaveSuccess(object sender, BL.Repositories.RepositoryState e)
        {
            this.FestivalsGrid.Refresh();
        }

        private void FestivalsGrid_SelectedFestivalChanged(object sender, UFestival e)
        {
            this.FestivalEditCTRL.ActivateFestival(e);
        }

    }
}

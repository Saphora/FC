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

namespace FC.Office.Controls.Genres
{
    /// <summary>
    /// Interaction logic for GenreViewControl.xaml
    /// </summary>
    public partial class GenreViewControl : UserControl
    {
        public GenreViewControl()
        {
            InitializeComponent();
            this.GenreGrid.SelectedGenreChanged += GenreGrid_SelectedGenreChanged;
            this.GenreCreateCtrl.CreatedOrModified += GenreCreateCtrl_CreatedOrModified;
            this.GenreCreateCtrl.CreatedOrModifiedFailure += GenreCreateCtrl_CreatedOrModifiedFailure;
        }

        private void GenreCreateCtrl_CreatedOrModifiedFailure(object sender, FC.Shared.Entities.UGenre e)
        {
        }

        private void GenreCreateCtrl_CreatedOrModified(object sender, FC.Shared.Entities.UGenre e)
        {
            this.GenreGrid.Refresh();
        }

        private void GenreGrid_SelectedGenreChanged(object sender, FC.Shared.Entities.UGenre e)
        {
            this.GenreCreateCtrl.SetSelected(e);
        }
    }
}

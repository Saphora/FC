using FC.BL.Repositories;
using FC.Office.Controls.Festival.Models;
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
    /// Interaction logic for FestivalGrid.xaml
    /// </summary>
    public partial class FestivalGrid : UserControl
    {
        private FestivalRepository repo = new FestivalRepository();
        public FestivalGridContext ctx = new FestivalGridContext();
        public event EventHandler<FC.Shared.Entities.UFestival> SelectedFestivalChanged;

        public FestivalGrid()
        {
            InitializeComponent();
            MainWindow.Refresh += MainWindow_Refresh;
            this.festivalsGrid.IsReadOnly = true;
            this.festivalsGrid.AutoGenerateColumns = false;
            ctx.Festivals = this.repo.GetAll().OrderBy(o=>o.Name).ToList();
            this.DataContext = null;
            this.DataContext = ctx;
        }

        private void MainWindow_Refresh(object sender, MainWindow e)
        {
            this.Refresh();
        }

        public void Refresh()
        {
            ctx.Model = new UFestival();
            ctx.Festivals = this.repo.GetAll().OrderBy(o => o.Name).ToList();
            this.DataContext = null;
            this.DataContext = ctx;    
        }
       

        private void festivalsGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        UFestival f = e.AddedItems[0] as UFestival;
                        ctx.Model = f;
                        if (f != null)
                        {
                            if (this.SelectedFestivalChanged != null)
                            {
                                this.SelectedFestivalChanged(sender, f);
                            }
                        }
                    }
                }
            }
        }

        private void DeleteSelectedBtn_Click(object sender, RoutedEventArgs e)
        {
            var b = MessageBox.Show($"Are you sure that you want to delete festival {ctx.Model.Name}", "Delete festival", MessageBoxButton.YesNo);
            if (b == MessageBoxResult.Yes)
            {
                var state = repo.ForceDelete(ctx.Model);
                ctx.Model = new UFestival();
                ctx.Festivals = repo.GetAllWithGenres();
                this.DataContext = null;
                this.DataContext = ctx;
                MessageBox.Show(state.MSG);
            }
        }
    }
}

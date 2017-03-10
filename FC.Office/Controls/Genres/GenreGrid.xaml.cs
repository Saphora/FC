using FC.BL.Repositories;
using FC.Office.Controls.Genres.Models;
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

namespace FC.Office.Controls.Genres
{
    /// <summary>
    /// Interaction logic for GenreGrid.xaml
    /// </summary>
    public partial class GenreGrid : UserControl
    {
        public GenreContext vm { get; set; }
        public RepositoryContext repositories = RepositoryContext.GetInstance();
        public event EventHandler<UGenre> SelectedGenreChanged;

        public GenreGrid()
        {
            InitializeComponent();
            MainWindow.Refresh += MainWindow_Refresh;
            vm = new GenreContext();
            vm.Genres = repositories.Genres.GetAll();
            this.DataContext = vm;
            this.GenreDataGrid.SelectionChanged += GenreDataGrid_SelectionChanged;
        }

        private void MainWindow_Refresh(object sender, MainWindow e)
        {
            this.Refresh();
        }

        public void Refresh()
        {
            vm.Genres = repositories.Genres.GetAll();
            this.DataContext = null;
            this.DataContext = vm;
        }

        private void GenreDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        UGenre selectedGenre = e.AddedItems[0] as UGenre;
                        vm.Model = selectedGenre;
                        if (this.SelectedGenreChanged != null)
                        {
                            this.SelectedGenreChanged(this, selectedGenre);
                        }
                    }
                }
            }
        }

        private void DeleteSelected_Click(object sender, RoutedEventArgs e)
        {
            RepositoryState s = this.repositories.Genres.ForceDelete(vm.Model);
            vm.Model = new UGenre();
            vm.Genres = this.repositories.Genres.GetAll();
            this.DataContext = null;
            this.DataContext = vm;
            MessageBox.Show(s.MSG);
        }
    }
}

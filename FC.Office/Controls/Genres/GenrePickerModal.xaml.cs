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
using System.Windows.Shapes;

namespace FC.Office.Controls.Genres
{
    /// <summary>
    /// Interaction logic for GenrePickerModal.xaml
    /// </summary>
    public partial class GenrePickerModal : Window
    {
        public event EventHandler<List<UGenre>> SelectionChanged;
        public GenrePickerVM vm { get; set; }
        public GenreRepository GenreRepo { get; set; }
        public GenrePickerModal(GenrePickerVM vm)
        {
            InitializeComponent();
            this.GenreRepo = new GenreRepository();
            this.vm = vm;

            if (vm != null)
            {
                if (vm.ActiveGenres != null && vm.SysGenres != null)
                {
                    foreach(UGenre g in vm.ActiveGenres)
                    {
                        vm.SysGenres.Remove(g);
                    }
                }
            }
            this.vm.PropertyChanged += Vm_PropertyChanged;
            this.DataContext = vm;
        }

        private void Vm_PropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            this.DataContext = null;
            this.DataContext = vm;
        }

        public void SetGenreData(GenrePickerVM vm)
        {
            this.DataContext = null;
            this.DataContext = vm;
        }


        public void activationHandler(List<UGenre> activated)
        {

        }

        public void DeactivationHandler(List<UGenre> deactivated)
        {

        }

        private void ActiveGenresList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            ListViewItem s = sender as ListViewItem;
            UGenre selected = s.DataContext as UGenre;
            vm.SysGenres.Add(selected);
            vm.ActiveGenres.Remove(selected);
            vm.ActiveGenres = vm.ActiveGenres.OrderBy(o => o.Name).ToList();
            vm.SysGenres = vm.SysGenres.OrderBy(o => o.Name).ToList();
            this.DataContext = null;
            this.DataContext = vm;
            //handle drop sysgenres
        }

        private void SysGenresList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            ListViewItem s = sender as ListViewItem;
            UGenre selected = s.DataContext as UGenre;
            vm.ActiveGenres.Add(selected);
            vm.SysGenres.Remove(selected);
            vm.ActiveGenres = vm.ActiveGenres.OrderBy(o => o.Name).ToList();
            vm.SysGenres = vm.SysGenres.OrderBy(o => o.Name).ToList();
            this.DataContext = null;
            this.DataContext = vm;
            //handle drop sysgenres
        }

        private void SaveSelected_Click(object sender, RoutedEventArgs e)
        {
            this.SelectionChanged(this, vm.ActiveGenres);
            this.Close();
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}

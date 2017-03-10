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
using FC.Office.Properties;
using FC.Office.Controls.Genres.Models;
using FC.Shared.Entities;
using FC.BL.Repositories;
using System.ComponentModel;

namespace FC.Office.Controls.Genres
{
    /// <summary>
    /// Interaction logic for GenrePicker.xaml
    /// </summary>
    public partial class GenrePicker : UserControl, INotifyPropertyChanged
    {
        public event EventHandler<List<UGenre>> SelectionChanged;
        public event PropertyChangedEventHandler PropertyChanged;
        public static List<UGenre> SysGenres { get; set; }
        public GenrePickerVM vm { get; set; }
        public GenrePickerModal Modal { get; set; }
        public GenreRepository GenreRepo { get; set; }
        public bool IsOpen { get; set; }

        public static readonly DependencyProperty GenresProperty = DependencyProperty.Register("Genres", typeof(List<UGenre>), typeof(GenrePicker));
        
        public List<UGenre> Genres
        {
            get { return (List<UGenre>)GetValue(GenresProperty); }
            set { SetValue(GenresProperty, value); this.PropertyChanged(this, new PropertyChangedEventArgs("Genres")); }
        }


        public GenrePicker()
        {
            InitializeComponent();
            this.vm = new GenrePickerVM();
            this.GenreRepo = new GenreRepository();
            this.PropertyChanged += GenrePicker_PropertyChanged;
            vm.SysGenres = GenreRepo.GetAll().Where(w => w.IsDeleted == false).OrderBy(o => o.Name).ToList();
            if (this.Genres == null)
            {
                this.vm.SelectedCount = string.Format("{0} selected", 0);
            } else
            {
                this.vm.ActiveGenres = this.Genres;
                if (vm.ActiveGenres != null)
                {
                    foreach (UGenre g in vm.ActiveGenres)
                    {
                        vm.SysGenres.Remove(g);
                    }
                }
                this.vm.SelectedCount = string.Format("{0} selected", Genres.Count());
                this.GenrePickerCTRL.DataContext = null;
                this.GenrePickerCTRL.DataContext = vm;
            }
        }


        public void SetGenreData(List<UGenre> genres)
        {
            this.Genres = genres;
            vm.ActiveGenres = genres;
            foreach(UGenre g in genres)
            {
                vm.SysGenres.Remove(g);
            }
            this.DataContext = null;
            this.DataContext = vm;
        }

        private void GenrePicker_PropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if (this.Genres != null)
            {
                this.vm.ActiveGenres = this.Genres;
                if (vm.ActiveGenres != null)
                {
                    foreach (UGenre g in vm.ActiveGenres)
                    {
                        vm.SysGenres.Remove(g);
                    }
                }

                this.vm.SelectedCount = string.Format("{0} selected", Genres.Count());
            } else
            {
                this.vm.SelectedCount = string.Format("{0} selected", 0);
            }
        }

        private void Modal_SelectionChanged(object sender, List<UGenre> e)
        {
            if (e != null)
            {
                this.vm.SelectedCount = string.Format("{0} selected", e.Count);
                if (this.SelectionChanged != null)
                {
                    this.SelectionChanged(this, e);
                }
                this.GenrePickerCTRL.DataContext = null;
                this.GenrePickerCTRL.DataContext = this.vm;
            } else
            {
                this.vm.SelectedCount = string.Format("{0} selected", 0);
                this.GenrePickerCTRL.DataContext = null;
                this.GenrePickerCTRL.DataContext = this.vm;
            }
        }

        private void Modal_Closed(object sender, EventArgs e)
        {
            this.Modal = new GenrePickerModal(vm);
            this.Modal.SelectionChanged += Modal_SelectionChanged;
            this.Modal.Closed += Modal_Closed;
            this.IsOpen = false;
        }

        private void SelectGenresBtn_Click(object sender, RoutedEventArgs e)
        {
            if (this.IsOpen == false)
            {
                vm.SysGenres = this.GenreRepo.GetAll().Where(w=>w.IsDeleted==false).OrderBy(o=>o.Name).ToList();

                if(vm.ActiveGenres != null)
                {
                    foreach (UGenre g in vm.ActiveGenres)
                    {
                        vm.SysGenres.Remove(vm.SysGenres.Where(w => w.GenreID == g.GenreID).FirstOrDefault());
                    }
                }

                this.Modal = new GenrePickerModal(vm);
                this.Modal.SelectionChanged += Modal_SelectionChanged;
                this.Modal.Closed += Modal_Closed;
                this.IsOpen = true;

                Modal.HorizontalAlignment = HorizontalAlignment.Center;
                Modal.VerticalAlignment = VerticalAlignment.Center;
                Modal.Show();
            }
        }
    }
}

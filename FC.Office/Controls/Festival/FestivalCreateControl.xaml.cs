using FC.BL.Repositories;
using FC.Office.Controls.Festival.Models;
using FC.Office.Controls.Genres.Models;
using FC.Office.Shared;
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
    /// Interaction logic for FestivalCreateControl.xaml
    /// </summary>
    public partial class FestivalCreateControl : UserControl
    {
        public FestivalContext vm { get; set; }
        public event EventHandler<RepositoryState> SaveSuccess;
        public event EventHandler<RepositoryState> SaveFailure;
        public RepositoryContext repositories = RepositoryContext.GetInstance();
        public FestivalCreateControl()
        {
            InitializeComponent();
            vm = new FestivalContext();
            vm.Model = new UFestival();
            vm.Model.StartDate = DateTime.Now;
            vm.Model.EndDate = DateTime.Now.AddDays(1);
            this.MediaPickerCtrl.DirectoryViewEnabled(false);
            this.GenrePickerCtrl.SelectionChanged += GenrePickerCtrl_SelectionChanged;
            this.CountryIDSelect.ItemsSource = vm.SysCountries;
            this.MediaPickerCtrl.SelectedMediaItemChanged += MediaPickerCtrl_SelectedMediaItemChanged;
            this.DataContext = vm;
        }

        private void GenrePickerCtrl_SelectionChanged(object sender, List<UGenre> e)
        {
            if (e != null)
            {
                vm.Model.Genres = e;
                this.FormGrid.DataContext = null;
                this.FormGrid.DataContext = vm.Model;
            }
        }

        private void MediaPickerCtrl_SelectedMediaItemChanged(object sender, FC.Shared.Entities.Media e)
        {
            if (e != null)
            {
                vm.Model.LogoID = e.MediaID;
                this.FormGrid.DataContext = null;
                this.FormGrid.DataContext = vm.Model;
            }
        }

        public void ActivateFestival(UFestival f)
        {
            this.vm.Model = f;
            List<UGenre> festivalGenres = this.repositories.Genres.GetByFestivalID(f.FestivalID);
            this.GenrePickerCtrl.SetGenreData(festivalGenres);
            this.vm.SetSysLocations(f.CountryID);
            this.LocationIDSelect.ItemsSource = this.vm.SysLocations;
            List<Location> locations = this.LocationIDSelect.ItemsSource as List<Location>;
            if (f.MediaDirectoryID != null)
            {
                this.MediaPickerCtrl.SetDirectoryRoot(f.MediaDirectoryID);
            }
            else
            {
                this.MediaPickerCtrl.SetDirectoryRoot(Config.FestivalMediaDir);
            }

            this.setVisitorsSelect(f.Visitors);
            this.vm.Model = f;
            this.vm.ActiveCountry = f.Country;
            this.FormGrid.DataContext = null;
            this.FormGrid.DataContext = f;
            int index = 0;
            this.MediaPickerCtrl.DoSetMedia(f.MediaDirectoryID);
            List<UCountry> countries = this.CountryIDSelect.ItemsSource as List<UCountry>;
            foreach (var c in countries)
            {
                if (c.CountryID == f.CountryID)
                {
                    this.CountryIDSelect.SelectedIndex = index;
                }
                index++;
            }
            index = 0;
            foreach (var l in locations)
            {
                if (f.FestivalLocationID != null)
                {
                    if (l.LocationID == f.FestivalLocationID)
                    {
                        this.LocationIDSelect.SelectedIndex = index;
                    }
                }
                index++;
            }
        }

        private void DoSaveFestival(object sender, RoutedEventArgs e)
        {
            RepositoryState state = new RepositoryState();
            if(vm.Model == null)
            {
                vm.Model = new UFestival();
                vm.Model.FestivalID = null;
            }
            if (vm.Model != null) {
                
                if(vm.Model.Country != null)
                {
                    vm.Model.CountryID = vm.Model.Country.CountryID;
                }
                if(vm.Model.FestivalLocation != null)
                {
                    vm.Model.FestivalLocationID = vm.Model.FestivalLocation.LocationID;
                }
                if (vm.Model.FestivalID != null)
                { 
                    state = repositories.Festivals.Update(vm.Model);
                } else
                {
                    state = repositories.Festivals.Create(vm.Model);
                }
            }
            if(state.SUCCESS)
            {
                resetForm();
                if(this.SaveSuccess != null)
                {
                    this.SaveSuccess(this, state);
                }
            } else
            {
                if(this.SaveFailure != null)
                {
                    this.SaveFailure(this, state);
                }
            }
            MessageBox.Show(state.MSG);
        }

        private void resetForm()
        {
            vm.Model = new UFestival();
            this.VisitorsSelect.SelectedIndex = 0;
            vm.Model.StartDate = DateTime.Now;
            vm.Model.EndDate = DateTime.Now.AddDays(1);
            this.GenrePickerCtrl.SetGenreData(new List<UGenre>());
            this.FormGrid.DataContext = null;
            this.FormGrid.DataContext = vm.Model;
        }

        private void setVisitorsSelect(string selected)
        {
            int vc;
            if(int.TryParse(selected, out vc))
            {
                selected = "Select visitor range";
                vm.Model.Visitors = "Unknown";
            }
            if(selected == null)
            {
                selected = "Select visitor range";
                vm.Model.Visitors = "Unknown";
            }
            if(selected == "Select visitor range")
            {
                vm.Model.Visitors = "Unknown";
                this.VisitorsSelect.SelectedIndex = 0;
            } else
            {
                ItemCollection items = this.VisitorsSelect.Items;
                int index = 0;
                foreach(ComboBoxItem item in items) {
                    if (item != null)
                    {
                        if (item.Content != null)
                        {
                            if (item.Content.ToString().ToLower() == "Select visitor range")
                            {
                                vm.Model.Visitors = "Unknown";

                                this.FormGrid.DataContext = null;
                                this.FormGrid.DataContext = vm.Model;
                                this.VisitorsSelect.SelectedIndex = 0;
                            }
                            else if(item.Content.ToString() == selected) 
                            {
                                vm.Model.Visitors = item.Content.ToString();

                                this.FormGrid.DataContext = null;
                                this.FormGrid.DataContext = vm.Model;
                                this.VisitorsSelect.SelectedIndex = index;
                            } 
                        }
                    }
                    index++;
                }
            }

        }

        private void VisitorsSelect_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        ComboBoxItem item = e.AddedItems[0] as ComboBoxItem;
                        if (item != null)
                        {
                            if (item.Content != null)
                            {
                                if (item.Content.ToString().ToLower() == "Select visitor range")
                                {
                                    vm.Model.Visitors = "Unknown";

                                    this.FormGrid.DataContext = null;
                                    this.FormGrid.DataContext = vm.Model;
                                }
                                else
                                {
                                    vm.Model.Visitors = item.Content.ToString();

                                    this.FormGrid.DataContext = null;
                                    this.FormGrid.DataContext = vm.Model;
                                }
                            }
                        }
                    }
                }
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            resetForm();
            this.NameTxt.Focus();
        }
    }
}

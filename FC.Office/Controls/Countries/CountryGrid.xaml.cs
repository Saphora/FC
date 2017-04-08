using FC.BL.Repositories;
using FC.Office.Controls.Countries.Models;
using FC.Office.Controls.Countries.Models;
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

namespace FC.Office.Controls.Countries
{
    /// <summary>
    /// Interaction logic for CountryGrid.xaml
    /// </summary>
    public partial class CountryGrid : UserControl
    {
        public CountryContext vm { get; set; }
        public RepositoryContext repositories = RepositoryContext.GetInstance();
        public event EventHandler<UCountry> SelectedCountryChanged;

        public CountryGrid()
        {
            InitializeComponent();
            MainWindow.Refresh += MainWindow_Refresh;
            vm = new CountryContext();
            vm.Countries = repositories.Countries.GetAll();
            this.DataContext = vm;
            this.CountryDataGrid.SelectionChanged += CountryDataGrid_SelectionChanged;
        }

        private void MainWindow_Refresh(object sender, MainWindow e)
        {
            this.Refresh();
        }

        public void Refresh()
        {
            vm.Countries = repositories.Countries.GetAll();
            this.DataContext = null;
            this.DataContext = vm;
        }

        private void CountryDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        UCountry selectedCountry = e.AddedItems[0] as UCountry;
                        vm.Model = selectedCountry;
                        if (this.SelectedCountryChanged != null)
                        {
                            this.SelectedCountryChanged(this, selectedCountry);
                        }
                    }
                }
            }
        }

        private void DeleteSelected_Click(object sender, RoutedEventArgs e)
        {
            RepositoryState s = this.repositories.Countries.ForceDelete(vm.Model);
            vm.Model = new UCountry();
            vm.Countries = this.repositories.Countries.GetAll();
            this.DataContext = null;
            this.DataContext = vm;
            MessageBox.Show(s.MSG);
        }
    }
}

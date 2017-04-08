using FC.BL.Repositories;
using FC.Office.Controls.Countries.Models;
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

namespace FC.Office.Controls.Countries
{
    /// <summary>
    /// Interaction logic for CountryCreate.xaml
    /// </summary>
    public partial class CountryCreate : UserControl
    {
        public CountryContext vm { get; set; }
        public RepositoryContext repositories { get; set; }
        public event EventHandler<UCountry> CreatedOrModified;
        public event EventHandler<UCountry> CreatedOrModifiedFailure;
        public CountryCreate()
        {
            InitializeComponent();
            vm = new CountryContext();
            this.DataContext = vm;
            this.repositories = RepositoryContext.GetInstance();
        }

        //private void Vm_PropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        //{
        //    this.DataContext = null;
        //    this.DataContext = vm;
        //}

        public void SetSelected(UCountry selected)
        {
            if(selected != null)
            {
                vm.Model = selected;
                this.DataContext = null;
                this.DataContext = vm;
            }
        }

        private void SaveBtn_Click(object sender, RoutedEventArgs e)
        {
            RepositoryState state = new RepositoryState();
            vm.Model.AuthorID = Config.AuthorID;
            if (vm.Model.CountryID == null)
            {
                //create
                state = this.repositories.Countries.Create(vm.Model);
            } else
            {
                state = this.repositories.Countries.Update(vm.Model);
            }
            
            MessageBox.Show(state.MSG);
            if (state.SUCCESS)
            {
                vm.Model = new UCountry();
                vm.Countries = this.repositories.Countries.GetAll();

                this.DataContext = null;
                this.DataContext = vm;
                if (this.CreatedOrModified != null)
                {
                    this.CreatedOrModified(this, vm.Model);
                }
            } else
            {
                if (this.CreatedOrModifiedFailure != null)
                {
                    this.CreatedOrModifiedFailure(this, vm.Model);
                }

            }
            
        }

        private void CreateBtn_Click(object sender, RoutedEventArgs e)
        {
            vm.Model = new UCountry();
            vm.Countries = this.repositories.Countries.GetAll();
            this.DataContext = null;
            this.DataContext = vm;
        }
    }
}

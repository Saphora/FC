using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Countries.Models
{
    public class CountryContext : INotifyPropertyChanged
    {
        public CountryContext()
        {
            Countries = new List<UCountry>();
            Model = new UCountry();
        }

        private UCountry _model { get; set; }

        public UCountry Model {
            get {
                return this._model;
            }
            set
            {
                if(value != this._model)
                {
                    this._model = value;
                    if(this.PropertyChanged != null)
                    {
                        this.PropertyChanged(this, new PropertyChangedEventArgs("Model"));
                    }
                }
            }
        }

        public List<UCountry> Countries { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}

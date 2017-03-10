using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Genres.Models
{
    public class GenreContext : INotifyPropertyChanged
    {
        public GenreContext()
        {
            Genres = new List<UGenre>();
            Model = new UGenre();
        }

        private UGenre _model { get; set; }

        public UGenre Model {
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

        public List<UGenre> Genres { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}

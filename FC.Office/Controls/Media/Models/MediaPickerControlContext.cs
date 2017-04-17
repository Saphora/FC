using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Media.Models
{
    public class MediaPickerControlContext : INotifyPropertyChanged
    {
        public string Text { get; set; }

        private Guid? _source
        {
            get;set;
        }

        public Guid? Source {
            get
            {
                return _source;
            }
            set
            {
                this._source = value;
                if(this.PropertyChanged != null)
                {
                    this.PropertyChanged(this, new PropertyChangedEventArgs("Source"));
                }
            }

        }



        public event PropertyChangedEventHandler PropertyChanged;
    }
}

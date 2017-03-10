using FC.Office.Shared;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Genres.Models
{
    public class GenrePickerVM : VMBase
    {

        private string _selectedCount { get; set; }
        public string SelectedCount
        {
            get
            {
                return _selectedCount;
            }
            set
            {
                if(value != _selectedCount)
                {
                    this._selectedCount = value;
                    this.NotifyPropertyChanged();
                }
            }
        }

        private List<UGenre> _sysGenres { get; set; }
        public List<UGenre> SysGenres
        {
            get
            {
                return _sysGenres;
            }
            set
            {
                if(value != _sysGenres)
                {
                    this._sysGenres = value;
                    this.NotifyPropertyChanged("SysGenres");
                }
            }
        }
        private List<UGenre> _activeGenres { get; set; }
        public List<UGenre> ActiveGenres
        {
            get
            {
                return _activeGenres;
            }
            set
            {
                if (value != _activeGenres)
                {
                    this._activeGenres = value;
                    this.NotifyPropertyChanged("ActiveGenres");
                }
            }
        }

        public UGenre Model { get; set; }

        public GenrePickerVM()
        {
            this.ActiveGenres = new List<UGenre>();
            this.SysGenres = new List<UGenre>();
        }
        
        // This method is called by the Set accessor of each property.
        // The CallerMemberName attribute that is applied to the optional propertyName
        // parameter causes the property name of the caller to be substituted as an argument.

    }
}

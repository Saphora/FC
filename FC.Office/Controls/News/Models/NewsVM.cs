using FC.Office.Shared;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.News.Models
{
    public class NewsVM : VMBase
    {
        private List<UNews> _newsData { get; set; }
        public List<UNews> NewsData
        {
            get
            {
                return _newsData;
            }
            set
            {
                if(value != _newsData)
                {
                    this._newsData = value;
                    this.NotifyPropertyChanged();
                }
            }
        }
        private UNews _newsCrud { get; set; }
        public UNews NewsCRUD
        {
            get
            {
                return _newsCrud;
            }
            set
            {
                if(value != this._newsCrud)
                {

                    this._newsCrud = value;
                    this.NotifyPropertyChanged();
                }
            }
        }
    }
}

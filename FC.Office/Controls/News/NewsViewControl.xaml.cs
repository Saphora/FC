using FC.BL.Repositories;
using FC.Office.Controls.News.Models;
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

namespace FC.Office.Controls.News
{
    /// <summary>
    /// Interaction logic for NewsViewControl.xaml
    /// </summary>
    public partial class NewsViewControl : UserControl
    {
        public NewsVM context { get; set; }
        public NewsRepository repo { get; set; }
        public NewsViewControl()
        {
            InitializeComponent();
            this.NewsGridCTRL.NewsDataGrid.SelectionChanged += NewsDataGrid_SelectionChanged;
            this.NewsCreateCtrl.OnCreated += Refresh;
            this.NewsCreateCtrl.OnModified += Refresh;
            this.NewsCreateCtrl.OnFailure += Refresh;
            this.NewsCreateCtrl.FullscreenControlEnabled += NewsCreateCtrl_FullscreenControlEnabled;
            this.FullScreen.Save += FullScreen_Save;
            this.FullScreen.Cancel += FullScreen_Cancel;
            this.repo = new NewsRepository();
        }

        private void FullScreen_Save(object sender, string e)
        {
            if (this.NewsCreateCtrl.DataContext != null)
            {
                context = this.NewsCreateCtrl.DataContext as NewsVM;
                context.NewsCRUD.Text = e;
                this.NewsCreateCtrl.DataContext = null;
                this.NewsCreateCtrl.DataContext = context;
            } else
            {
                context.NewsCRUD.Text = e;
                this.NewsCreateCtrl.DataContext = context;
            }
            this.NewsCreateCtrl.DataContext = null;
            this.NewsCreateCtrl.DataContext = context;
            this.NewsGridCTRL.Visibility = Visibility.Visible;
            this.NewsCreateCtrl.Visibility = Visibility.Visible;
            this.FullScreen.Visibility = Visibility.Hidden;
        }

        private void FullScreen_Cancel(object sender, string e)
        {
            this.NewsCreateCtrl.DataContext = null;
            this.NewsCreateCtrl.DataContext = context;
            this.NewsGridCTRL.Visibility = Visibility.Visible;
            this.NewsCreateCtrl.Visibility = Visibility.Visible;
            this.FullScreen.Visibility = Visibility.Hidden;
        }

        private void NewsCreateCtrl_FullscreenControlEnabled(object sender, string txt)
        {
            this.NewsGridCTRL.Visibility = Visibility.Hidden;
            this.NewsCreateCtrl.Visibility = Visibility.Hidden;
            this.FullScreen.Visibility = Visibility.Visible;
            this.FullScreen.SetText(txt);
        }

        public void Refresh(object sender, UNews e)
        {
            if(context == null)
            {
                context = new NewsVM();
            }
            context.NewsData = repo.GetAll();

            this.NewsGridCTRL.DataContext = null;
            this.NewsGridCTRL.DataContext = context;
        }

        private void NewsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        UNews n = e.AddedItems[0] as UNews;
                        n = repo.GetByID(n.NewsID);
                        this.NewsCreateCtrl.SetNews(n);
                    }
                }
            }
        }
    }
}

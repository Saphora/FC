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
    /// Interaction logic for NewsGrid.xaml
    /// </summary>
    public partial class NewsGrid : UserControl
    {
        NewsRepository repo = new NewsRepository();
        NewsVM context = new NewsVM();
        public NewsGrid()
        {
            InitializeComponent();

            context.NewsData = repo.GetAll();
            this.DataContext = context;
            MainWindow.Refresh += MainWindow_Refresh;
            this.NewsDataGrid.SelectionChanged += NewsDataGrid_SelectionChanged;
        }

        private void MainWindow_Refresh(object sender, MainWindow e)
        {
            this.Refresh();
        }

        private void NewsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        context.NewsCRUD = e.AddedItems[0] as UNews;
                        this.DataContext = null;
                        this.DataContext = context;
                    }
                }
            }
        }

        private void Refresh()
        {
            context = new NewsVM();
            context.NewsData = repo.GetAll();
            this.DataContext = null;
            this.DataContext = context;
        }

        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            var state = this.repo.ForceDelete(context.NewsCRUD);
            if (state.SUCCESS)
            {
                this.Refresh();
            }
            MessageBox.Show(state.MSG);
        }
    }
}

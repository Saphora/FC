using FC.BL.Repositories;
using FC.Office.Controls.News.Models;
using FC.Office.Shared;
using FC.Shared.Config;
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
    /// Interaction logic for NewsCreate.xaml
    /// </summary>
    public partial class NewsCreate : UserControl
    {
        NewsRepository repo = new NewsRepository();
        NewsVM vm = new NewsVM();
        public bool EditMode = true;

        public event EventHandler<UNews> OnCreated;
        public event EventHandler<UNews> OnFailure;
        public event EventHandler<UNews> OnModified;
        public event EventHandler<string> FullscreenControlEnabled;
        public NewsCreate()
        {
            InitializeComponent();
            vm.NewsCRUD = new UNews();
            vm.NewsCRUD.SourceName = "Festival Calendar";
            vm.NewsCRUD.SourceURL = "https://www.festival-calendar.nl";
            this.MediaPickerCTRL.SetBaseRoot(FCConfig.NewsDirectoryID);
            this.MediaPickerCTRL.SetDirectoryRoot(FCConfig.NewsDirectoryID);
            this.MediaPickerCTRL.DoSetMedia(FCConfig.NewsDirectoryID);
            this.MediaPickerCTRL.DirectoryViewEnabled(false);
            this.MediaPickerCTRL.SelectedMediaItemChanged += MediaPickerCTRL_SelectedMediaItemChanged;
            //this.MediaPickerCTRL.SetTreeData();
            vm.PropertyChanged += Vm_PropertyChanged;
            this.NewsText.OpenerClick += NewsText_OpenerClick;
            this.NewsCreateCTRL.DataContext = vm;
        }

        private void NewsText_OpenerClick(object sender, string e)
        {
            if(this.FullscreenControlEnabled != null)
            {
                this.FullscreenControlEnabled(this, e);
            }
        }

        private void Vm_PropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            this.Form.DataContext = vm.NewsCRUD;
        }

        private void MediaPickerCTRL_SelectedMediaItemChanged(object sender, FC.Shared.Entities.Media e)
        {
            vm.NewsCRUD.ThumbnailID = e.MediaID;
            this.Form.DataContext = vm.NewsCRUD;
            this.ImageIDTxt.Text = e.MediaID.Value.ToString();
        }

        public void SetNews(UNews news)
        {
            vm.NewsCRUD = news;
            if (news != null)
            {
                if (news.Text != null)
                {
                    this.Form.DataContext = vm.NewsCRUD;
                    this.NewsText.SetText(news.Text);
                }
                else
                {
                    this.Form.DataContext = vm.NewsCRUD;
                    this.NewsText.SetText("");
                }
                //if (news.ShortText != null)
                //{
                //    this.Form.DataContext = vm.NewsCRUD;
                //    this.ShortText.SetText(news.ShortText);
                //}
                //else
                //{
                //    this.Form.DataContext = vm.NewsCRUD;
                //    this.ShortText.SetText("");

                //}
            }
        }

        private void SaveCreateNews_Click(object sender, RoutedEventArgs e)
        {
            var v = vm.NewsCRUD;
            RepositoryState state = new RepositoryState();
            state.SUCCESS = false;

            if(v == null)
            {
                v = new UNews();
                v.NewsID = null;
            }

            if (v.NewsID == null)
            {
                state = repo.Create(vm.NewsCRUD);
                if (state.SUCCESS)
                {
                    if (this.OnCreated != null)
                    {
                        this.OnCreated(sender, vm.NewsCRUD);
                    }
                    vm.NewsCRUD = new UNews();
                    vm.NewsCRUD.SourceName = "Festival Calendar";
                    vm.NewsCRUD.SourceURL = "https://www.festival-calendar.nl";
                }
                else
                {
                    if (this.OnFailure != null)
                    {
                        this.OnFailure(sender, vm.NewsCRUD);
                    }
                }
            }
            else
            {
                state = repo.Update(vm.NewsCRUD);
                if (state.SUCCESS)
                {
                    if (this.OnModified != null)
                    {
                        this.OnModified(sender, vm.NewsCRUD);
                    }
                    vm.NewsCRUD = new UNews();
                    vm.NewsCRUD.SourceName = "Festival Calendar";
                    vm.NewsCRUD.SourceURL = "https://www.festival-calendar.nl";
                }
                else
                {
                    if (this.OnFailure != null)
                    {
                        this.OnFailure(sender, vm.NewsCRUD);
                    }
                }
            }
            MessageBox.Show(state.MSG);

        }

        private void CreateNew_Click(object sender, RoutedEventArgs e)
        {
            vm = new NewsVM();
            vm.NewsCRUD = new UNews();
            this.Form.DataContext = null;
            this.Form.DataContext = vm.NewsCRUD;
            this.SourceNameTxt.Text = "Festival Calendar";
            this.SourceTxt.Text = "https://www.festival-calendar.nl"; 
        }
    }
}

using FC.BL.Repositories;
using FC.Office.Controls.Media.Models;
using FC.Shared.Config;
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
using System.Windows.Shapes;

namespace FC.Office.Controls.Media
{
    /// <summary>
    /// Interaction logic for MediaModal.xaml
    /// </summary>
    public partial class MediaModal : Window
    {
        public MediaModalContext vm;
        private RepositoryContext repositories { get; set; }

        public MediaModal()
        {
            InitializeComponent();
            vm = new MediaModalContext();
            repositories = RepositoryContext.GetInstance();

            this.recurse(Guid.Parse(FCConfig.MEDIA_ROOT_ID));
            this.MediaTree.SelectedItemChanged += MediaTree_SelectedItemChanged;
            this.MediaTree.MouseDoubleClick += MediaTree_MouseDoubleClick;
        }

        private void MediaTree_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var s = this.selected;
            if (s != null)
            {
                if (s.ID == null)
                {
                    s.ID = Guid.Parse(FCConfig.MEDIA_ROOT_ID);
                }
                if(s.ParentID == null)
                {
                    s.ParentID = Guid.Parse(FCConfig.MEDIA_ROOT_ID);
                }
                var f = new List<MediaTreeNode>();
                vm.MediaData = new MediaTreeList();

                vm.MediaData.Add(new MediaTreeNode { Name = "..", ID = s.ParentID, Type="dir" });


                foreach (var file in repositories.Media.GetMediaByDirectoryID(s.ID))
                {
                    vm.MediaData.Add(new MediaTreeNode { ID = file.MediaID, ImageSource = file.FileName, Name = file.Name, Type = "file" });
                }

                this.recurse(s.ID.Value);
            }
        }
        MediaTreeNode selected;
        private void MediaTree_SelectedItemChanged(object sender, RoutedPropertyChangedEventArgs<object> e)
        {
            selected = e.NewValue as MediaTreeNode;
            if (selected != null)
            {
                if (selected.Type == "file")
                {
                    vm.MediaModel = repositories.Media.GetByID(selected.ID);
                    this.grid1.DataContext = null;
                    this.grid1.DataContext = vm.MediaModel;
                }
                if (selected.Type == "dir")
                {
                    vm.DirModel = repositories.Media.GetDirectoryByID(selected.ID);
                }
            }
        }

        public void recurse(Guid rootID)
        {
            var dirs = new List<MediaTreeNode>();
            foreach (var d in repositories.Media.GetDirectories(rootID))
            {
                vm.MediaData.Add(new MediaTreeNode { ID = d.DirectoryID, ParentID=d.ParentID, Name = d.Name, Directories = dirs, Type="dir" });
            }
            this.DataContext = null;
            this.DataContext = vm;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {

            System.Windows.Data.CollectionViewSource mediaViewSource = ((System.Windows.Data.CollectionViewSource)(this.FindResource("mediaViewSource")));
            // Load data by setting the CollectionViewSource.Source property:
            // mediaViewSource.Source = [generic data source]
        }
    }
}

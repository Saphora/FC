using FC.BL.Repositories;
using FC.Office.Controls.Media.Models;
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
using FC.Shared.Entities;
using System.IO;
using mshtml;
using System.Text.RegularExpressions;
using System.Net;
using FC.Shared.Config;
using System.Net.Http;

namespace FC.Office.Controls.Media
{

    /// <summary>
    /// Interaction logic for MediaPicker.xaml
    /// </summary>
    public partial class MediaPicker : UserControl
    {
        public event EventHandler<FC.Shared.Entities.Media> SelectedMediaItemChanged;
        public event EventHandler<FC.Shared.Entities.MediaDirectory> SelectedDirectoryChanged;
        public FTPTLSClient client { get; set; }
        MediaRepository repo = new MediaRepository();
        List<TreeViewItem> source = new List<TreeViewItem>();
        public MediaContext ctx;
        public MediaDirectory CurrentDir { get; set; }
        public TextBox log = new TextBox();
        public Guid? DirectoryRoot { get; set; }
        public Guid? ParentID { get; set; }
        private Guid? _initdr { get; set; }
        public int lvl = 0;
        public RepositoryContext repositories { get; set; }
        public FC.Shared.Entities.Media SelectedMediaItem { get; set; }
        public FC.Shared.Entities.MediaDirectory SelectedDirectoryItem { get; set; }
        public MediaPicker()
        {
            InitializeComponent();
            ctx = new MediaContext();
            //this.SetTreeData();
            this.repositories = RepositoryContext.GetInstance();
            DataContext = ctx;
            MainWindow.Refresh += MainWindow_Refresh;
            client = new FTPTLSClient();
            client.setRemoteHost("festival-calendar.nl");
            client.setRemotePort(21);
            client.setRemotePath(".");
            client.setRemoteUser("mediauser");
            client.setRemotePass("welkom123");
            client.login();
            log.Text += "Connected to ftp://festival-calendar.nl" + Environment.NewLine;
           
        }

        private void MainWindow_Refresh(object sender, MainWindow e)
        {
            this.RefreshGrid();
        }

        private void RefreshGrid()
        {
            if (this.DirectoryRoot != null && this._initdr != null)
            {
                this.SetBaseRoot(this._initdr);
                this.SetDirectoryRoot(this.DirectoryRoot);
                this.DoSetMedia();
                this.SetTreeData();
            }
            this.MediaPickerCTRL.DataContext = null;
            this.MediaPickerCTRL.DataContext = ctx;
        }

        public void SetBaseRoot(Guid? root)
        {
            this._initdr = root;
        }

        public void SetDirectoryRoot(Guid? parentID)
        {
            this.DirectoryRoot = parentID;
            this.CurrentDir = repo.GetDirectoryByID(parentID);
            this.SetTreeData();
        }
        
        public void DirectoryViewEnabled(bool enabled)
        {
            if (enabled == false)
            {
                this.treeView.Visibility = Visibility.Hidden;
                this.treeView1.SetValue(Grid.ColumnProperty, 0);
            } else
            {
                this.treeView.Visibility = Visibility.Visible;
                this.treeView1.SetValue(Grid.ColumnProperty, 1);
            }
        }
        

        public void SetTreeData()
        {
            var result = repo.GetDirectories(this.DirectoryRoot);
            List<TreeNode> nodes = new List<TreeNode>();
            nodes.AddRange((from r in result select new TreeNode(r.Name, TreeNodeType.Dir) { DirID=r.DirectoryID, Files = (from m in r.Media select new TreeNode(m.Name, TreeNodeType.File) { MediaID=m.MediaID, DirID=m.DirectoryID} ).ToList()}));

            ctx.Directories = nodes;

            this.MediaPickerCTRL.DataContext = ctx;
        }

        private void remove(Guid mediaID, TreeNode dir)
        {
            FC.Shared.Entities.Media m = this.repositories.Media.GetByID(mediaID);
            try
            {
                client.deleteRemoteFile(m.DirectoryID +"/"+ m.Name);
                this.repositories.Media.DeleteMedia(mediaID);
            } catch(IOException ex)
            {
                MessageBox.Show(ex.Message);
            }
            MessageBox.Show($"File {m.Name} successfully removed.");
            this.RefreshGrid();
        }

        private void upload(string fname, TreeNode dir)
        {

            FileInfo info = new FileInfo(fname);
            if (client.getFileList(".").Contains("./" + dir.DirID.Value.ToString() + "\r") || client.getFileList(".").Contains("" + dir.DirID.Value.ToString() + "\r") || client.getFileList(".").Contains("./" + dir.DirID.Value.ToString() + "\r\n"))
            {
                client.chdir(dir.DirID.Value.ToString());
            }
            else
            {
                client.mkdir(dir.DirID.Value.ToString());
                client.chdir(dir.DirID.Value.ToString());
            }
            client.upload(fname);
            client.chdir("..");

            string ext = fname.Split('.').Last();
            string mime = "";
            switch (ext.ToLower())
            {
                case "jpg":
                case "jpeg":
                    mime = "image/jpeg";
                    break;
                case "png":
                    mime = "image/png";
                    break;
                case "gif":
                    mime = "image/gif";
                    break;
                case "bmp":
                    mime = "image/bitmap";
                    break;
                case "doc":
                case "docx":
                    mime = "application/msword";
                    break;
                case "pdf":
                    mime = "application/pdf";
                    break;
                case "dll":
                    mime = "application/octet-stream";
                    break;
                case "js":
                    mime = "text/javascript";
                    break;
                case "avi":
                    mime = "video/avi";
                    break;
                case "css":
                    mime = "text/css";
                    break;
            }
            string name = fname.Split('\\').Last();
            FC.Shared.Entities.Media media = new FC.Shared.Entities.Media
            {
                MediaID = Guid.NewGuid(),
                DirectoryID = dir.DirID,
                FileName = "/Media/" + dir.DirID.Value.ToString() + '/' + name,
                Name = name,
                Size = info.Length,
                FileMimeType = mime,
                MediaTypeID = repo.GetMediaTypeIDByMime(mime).Value,
                MD5Checksum = repo.GetMd5Hash(File.ReadAllBytes(fname)),
                Created = DateTime.Now,
                Modified = DateTime.Now,
                AuthorID = Guid.Parse("bd808f49-dee0-4ec4-9024-dec2a716948a"),
                IsDeleted = false,
                IsPublished = true
            };
            repo.CreateMedia(media);
            log.Text += "FILE: " + fname + " uploaded." + Environment.NewLine;
        }

        private void treeView_Drop(object sender, DragEventArgs e)
        {
            TreeNode dir = (TreeNode)treeView.SelectedItem;

            if (dir == null)
            {

                dir = new TreeNode(this.CurrentDir.Name, TreeNodeType.Dir) { DirID = this.CurrentDir.DirectoryID };
            }

            List<string> ServerFiles = new List<string>();

            if (e.Data.GetDataPresent("FileName"))
            {
                string[] fnames = (string[])e.Data.GetData("FileName");

                List<string> files = new List<string>(fnames);
                client.setBinaryMode(true);
                log.Text += "Binary mode enabled";
                foreach (string fname in files)
                {
                    this.upload(fname, dir);
                }
                client.setBinaryMode(false);
                log.Text += "Binary mode disabled";
                this.SetTreeData();
                this.DoSetMedia();
                MessageBox.Show("File(s) created successfully");
                this.RefreshGrid();
            }
            else if ((string)e.Data.GetData(DataFormats.Html) != "")
            {
                string html = e.Data.GetData(DataFormats.Html).ToString();

                string imgSrc = "";
                Regex regex = new Regex("src=\"(.*)\"");
                MatchCollection mc = regex.Matches(html);
                byte[] bytes;
                if (mc != null)
                {
                    if (mc.Count > 0)
                    {
                        int i = 0;
                        while (i < mc.Count)
                        {
                            try
                            {
                                if (!String.IsNullOrEmpty(mc[i].Value))
                                {
                                    imgSrc = mc[i].Value.Replace("src=", "");
                                    imgSrc = imgSrc.Replace("\"", "");
                                    WebClient c = new WebClient();
                                    bytes = c.DownloadData(imgSrc);

                                    if (!Directory.Exists(FCConfig.LOCAL_TMP_DATA_DIR))
                                    {
                                        Directory.CreateDirectory(FCConfig.LOCAL_TMP_DATA_DIR);
                                    }
                                    string tmpName = FCConfig.LOCAL_TMP_DATA_DIR + Guid.NewGuid().ToString();
                                    File.Create(tmpName);
                                    this.upload(tmpName, dir);

                                }
                                i++;
                            } catch(Exception ex)
                            {
                                i++;
                                MessageBox.Show("File drop action blocked by supplier. Please save it to local folder and drag it into this.");
                            }
                        }
                    }
                }


            }


        }

        private void DoSetMedia(object sender, RoutedPropertyChangedEventArgs<object> e)
        {
            TreeNode value = e.NewValue as TreeNode;
            if(value == null)
            {
                value = e.OldValue as TreeNode;
            }
            ctx.Files = new List<TreeNode>();
            ctx.Files.AddRange((from f in repo.GetMediaByDirectoryID(value.DirID) select new TreeNode(f.Name, TreeNodeType.File) { DirID = value.DirID, MediaID = f.MediaID }));
            ctx.Files.Add(new TreeNode("Upload file", TreeNodeType.File) { MediaID = null });
            treeView1.ItemsSource = ctx.Files;
            this.DataContext = ctx;
            if (this.SelectedDirectoryChanged != null)
            {
                this.SelectedDirectoryChanged(sender, repo.GetDirectoryByID(value.DirID));
            }
        }

        private void DoSetMedia()
        {
            TreeNode value = this.treeView.SelectedItem as TreeNode;
            if(value == null)
            {
                value = new Models.TreeNode(this.CurrentDir.Name, TreeNodeType.Dir) { DirID = this.CurrentDir.DirectoryID };
            }

            this.SetTreeData();
            ctx.Files = (from f in repo.GetMediaByDirectoryID(value.DirID) select new TreeNode(f.Name, TreeNodeType.File) { DirID = value.DirID, MediaID = f.MediaID }).ToList();
            ctx.Files.Add(new TreeNode("Upload file", TreeNodeType.File) { MediaID = null });
            this.DataContext = ctx;
            treeView1.ItemsSource = ctx.Files;
        }

        public void DoSetMedia(Guid? dirID)
        {
            ///TreeNode value = this.treeView.SelectedItem as TreeNode;
            ///
            var dir = repo.GetDirectoryByID(dirID);
            if (dir != null)
            {
                var src = new List<TreeNode>();
                src.Add(new TreeNode(dir.Name, TreeNodeType.Dir) { DirID = dir.DirectoryID });
                treeView.ItemsSource = src;

                //this.SetTreeData();
                ctx.Files = (from f in repo.GetMediaByDirectoryID(dirID) select new TreeNode(f.Name, TreeNodeType.File) { DirID = dirID, MediaID = f.MediaID }).ToList();
                ctx.Files.Add(new TreeNode("Upload file", TreeNodeType.File) { MediaID = null });
                this.DataContext = ctx;
                treeView1.ItemsSource = ctx.Files;
            }
        }

        private void DoSelectFile(object sender, RoutedPropertyChangedEventArgs<object> e)
        {
            if (e != null)
            {
                if (e.NewValue != null)
                {
                    TreeNode t = e.NewValue as TreeNode;
                    if (t.MediaID != null)
                    {
                        var media = repo.GetByID(t.MediaID);
                        this.SelectedMediaItemChanged(sender, media);
                        ctx.SelectedImageSource = $"https://festival-calendar.nl:8888/{media.MediaID}.img?&thumb=true";
                        this.DataContext = null;
                        this.DataContext = ctx;
                    }
                }
            }
        }

        private void treeView1_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e != null)
            {
                if (e.AddedItems != null)
                {
                    if (e.AddedItems.Count > 0)
                    {
                        
                        TreeNode n = e.AddedItems[0] as TreeNode;
                        if (n != null)
                        {
                            if (n.MediaID != null)
                            {
                                var media = repo.GetByID(n.MediaID);
                                this.SelectedMediaItemChanged(sender, media);
                                ctx.SelectedImageSource = $"https://festival-calendar.nl:8888/{media.MediaID}.img?&thumb=true";
                                this.DataContext = null;
                                this.DataContext = ctx;
                            }
                        }
                        
                    }
                }
            }
        }



        private void Refresh_Click(object sender, RoutedEventArgs e)
        {
            client.login();
            this.DoSetMedia();
            this.SetTreeData();
            MessageBox.Show("Connected!");
        }

        private void DeleteSelectedFile_Click(object sender, RoutedEventArgs e)
        {
            TreeNode node = this.treeView1.SelectedItem as TreeNode;
            if(node != null)
            {
                if (node.MediaID != null)
                {
                    this.remove(node.MediaID.Value, node);
                }
            }
        }
    }
}

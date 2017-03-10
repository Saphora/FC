using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
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
using System.Net;
using System.Net.Sockets;

namespace FC.Office.Controls.Files
{
    /// <summary>
    /// Interaction logic for FileUploadControl.xaml
    /// </summary>
    public partial class FileUploadControl : UserControl
    {
        public FTPTLSClient client { get; set; }

        public FileUploadControl()
        {

            InitializeComponent();
            this.DropPane.AllowDrop = true;
            this.DropPane.Drop += DropPane_Drop;
            client = new FTPTLSClient();
            client.setRemoteHost("festival-calendar.nl");
            client.setRemotePort(21);
            client.setRemotePath(".");
            client.setRemoteUser("mediauser");
            client.setRemotePass("welkom123");
            client.login();
            this.SetFileList();
            log.Text += "Connected to ftp://festival-calendar.nl" + Environment.NewLine;
        }

        private void SetFileList()
        {
            log.Text += "Set file list" + Environment.NewLine;
            string[] lst = client.getFileList(".");
            log.Text += "Set file list" + Environment.NewLine;

            this.treeView.Items.Clear();
            foreach(string n in lst)
            {
                this.treeView.Items.Add(new TreeViewItem { Header =n });
            }
        }

        private void DropPane_Drop(object sender, DragEventArgs e)
        {
            List<string> ServerFiles = new List<string>();
            if(e.Data.GetDataPresent("FileName"))
            {
                string[]fnames = (string[])e.Data.GetData("FileName");

                List<string> files = new List<string>(fnames);
                client.setBinaryMode(true);
                log.Text += "Binary mode enabled";
                foreach (string fname in files)
                {
                    client.upload(fname);
                    log.Text += "FILE: " + fname + " uploaded."+Environment.NewLine;
                }
                client.setBinaryMode(false);
                log.Text += "Binary mode disabled";
                this.SetFileList();
            }
        }
        
    }
}

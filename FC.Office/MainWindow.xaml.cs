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
using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Office.ViewModels;
using System.Data.Entity;
using FC.MSDAL;
using Microsoft.Win32;
using System.IO;
using FC.Office.Shared;
using System.Globalization;

namespace FC.Office
{

    public enum Sections
    {
        Festivals,
        Artists,
        News,
        Locations,
        Advertisement
    }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public List<FestivalListView> Festivals { get; set; }
        public string ActiveSection { get; set; }
        public static event EventHandler<MainWindow> Refresh;
        private static MainWindow instance { get; set; }
        private RepositoryContext repositories { get; set; }
        public MainWindow()
        {
            //this.ExtractMedia();
            MainWindow.instance = this;
            CultureInfo.DefaultThreadCurrentCulture = CultureInfo.CreateSpecificCulture("en-US");
            CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.CreateSpecificCulture("en-US");
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<ContentModel, Configuration>());
            InitializeComponent();
            Database.SetInitializer<ContentModel>(null);
            this.LoginCtrl.LoginSuccess += LoginCtrl_LoginSuccess;
            this.LoginCtrl.LoginFailure += LoginCtrl_LoginFailure;
            this.AppGrid.Visibility = Visibility.Hidden;
            this.LoginCtrl.Visibility = Visibility.Visible;
            this.Closed += MainWindow_Closed;
            this.repositories = RepositoryContext.GetInstance();

        }

        private void MainWindow_Closed(object sender, EventArgs e)
        {
            if (this.repositories.Auth.Session != null)
            {
                if (this.repositories.Auth.Session.SessionID != null)
                {
                    this.repositories.Auth.Logout(this.repositories.Auth.Session.SessionID);
                }
            }
        }

        private void LoginCtrl_LoginFailure(object sender, bool e)
        {
            this.AppGrid.Visibility = Visibility.Hidden;
            this.LoginCtrl.Visibility = Visibility.Visible;
        }

        public static void Destroy()
        {
            instance.Close();
        }

        private void LoginCtrl_LoginSuccess(object sender, bool e)
        {
            this.AppGrid.Visibility = Visibility.Visible;
            this.LoginCtrl.Visibility = Visibility.Hidden;
        }

        public void DoImport()
        {
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.FileOk += Dialog_FileOk;
            //dialog.Filter = "csv";
            dialog.ShowDialog();
        }
        private string formatDate(DateTime dt)
        {
            return $"{dt.Year}-{dt.Month}-{dt.Day} {dt.Hour}:{dt.Minute}";
        }
        private void Dialog_FileOk(object sender, System.ComponentModel.CancelEventArgs e)
        {
            FestivalRepository repo = new FestivalRepository();
            OpenFileDialog s = sender as OpenFileDialog;
            string[] Text = File.ReadAllLines(s.FileName);
            int length = Text.Length - 1;
            bool[] successes = new bool[] { };
            string sql = "BEGIN TRANSACTION"+Environment.NewLine;
            for(int i = 0; i <= Text.Length; i++)
            {

                if (i > 0) 
                {
                    if (i - 1 != 0)
                    {
                        if (Text[i - 1] != null)
                        {
                            string line = Text[i - 1];
                            string[] lineData = line.Split(',');
                            Guid ID = Guid.Parse(lineData[0].Replace("\"", ""));
                            string Name = lineData[1].Replace("\"", "");
                            DateTime start = DateTime.Parse(lineData[2].Replace("\"", ""));
                            DateTime end = DateTime.Parse(lineData[3].Replace("\"", ""));
                            UFestival f = new UFestival
                            {
                                FestivalID = ID,
                                Name = Name,
                                StartDate = start,
                                EndDate = end,
                                AuthorID = Config.AuthorID
                            };
                            sql+= $"UPDATE dbo.\"UFestivals\" SET \"StartDate\" = '{formatDate(start)}', \"EndDate\" = '{formatDate(end)}' WHERE \"FestivalID\" = '{ID}';"+Environment.NewLine;
                        }
                    }
                }
            }
            sql += "COMMIT TRANSACTION" + Environment.NewLine;
            File.WriteAllText("D:/update20170217.sql", sql);
            MessageBox.Show("IMPORT SUCCEEDED");
        }


        private void ActivateSection(object sender, RoutedEventArgs e)
        {
            Button s = sender as Button;
            if (s.Content.ToString().ToLower() == "festivals")
            {
                this.FestivalViewControl.Visibility = Visibility.Visible;
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Hidden;
            }
            if (s.Content.ToString().ToLower() == "locations")
            {
                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Hidden;

            }
            if (s.Content.ToString().ToLower() == "artists")
            {
                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Hidden;

            }
            if (s.Content.ToString().ToLower() == "genres")
            {
                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Visible;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Hidden;
            }
            if (s.Content.ToString().ToLower() == "advertisement")
            {

                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Hidden;
            }
            if (s.Content.ToString().ToLower() == "news")
            {
                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.NewsViewControl.Visibility = Visibility.Visible;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Hidden;
            }
            if (s.Content.ToString().ToLower() == "users")
            {
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Visible;
                this.CountryViewControl.Visibility = Visibility.Hidden;
            }
            if (s.Content.ToString().ToLower() == "countries")
            {
                this.NewsViewControl.Visibility = Visibility.Hidden;
                this.FestivalViewControl.Visibility = Visibility.Hidden;
                this.GenreViewControl.Visibility = Visibility.Hidden;
                this.UsersViewControl.Visibility = Visibility.Hidden;
                this.CountryViewControl.Visibility = Visibility.Visible;
            }
            //client.SendData(new List<string>());
        }

        private void BtnImport_Click(object sender, RoutedEventArgs e)
        {
            this.DoImport();
        }

        private void BtnRefresh_Click(object sender, RoutedEventArgs e)
        {
            if (MainWindow.Refresh != null)
            {
                MainWindow.Refresh(this, this);
            }
        }

        private void BtnLogout_Click(object sender, RoutedEventArgs e)
        {
            //well this seems a bit dumb in wpf context....
            this.repositories.Auth.Logout(this.repositories.Auth.Session.SessionID);
            this.AppGrid.Visibility = Visibility.Hidden;
            this.LoginCtrl.Visibility = Visibility.Visible;
        }

        //private void ExtractMedia(string root="", string parent="")
        //{
        //    if (String.IsNullOrEmpty(root)) {
        //        root = "D:/Media/";
        //    }
        //    string target = "D:/Extracted/";
        //    List<string> dirs = Directory.EnumerateDirectories(root).ToList();
        //    List<string> files = Directory.EnumerateFiles(root).ToList();
        //    if (files.Count() == 0)
        //    {
        //        foreach (string d in dirs)
        //        {
        //            this.ExtractMedia(d);
        //        }
        //    } else
        //    {
        //        foreach(string f in files)
        //        {
        //            var i = new FileInfo(f);
        //            if(File.Exists(target+i.Name))
        //            {
        //                string ext = i.Name.Split('.').Last();
        //                string n = i.Name.Replace(ext, "") + Guid.NewGuid().ToString() + ext;
        //                File.Copy(f, target + i.Name, true);
        //            } else
        //            {
        //                File.Copy(f, target + i.Name, true);
        //            }
        //        }
        //    }
        //}
    }
}

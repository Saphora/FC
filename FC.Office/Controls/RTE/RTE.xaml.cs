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
using System.Web;
using System.Web.UI.HtmlControls;
using System.Threading;
using System.ComponentModel;

namespace FC.Office.Controls.RTE
{
    /// <summary>
    /// Interaction logic for RTE.xaml
    /// </summary>
    public partial class RTE : UserControl
    {
        //public string Text { get; set; }

        // public DependencyProperty Text { get; set; }
        public event EventHandler<string> TextChange;
        public event EventHandler<string> OpenerClick;
        BackgroundWorker worker = new BackgroundWorker();
        public RTE()
        {
            InitializeComponent();
            //this.RTEFrame.Navigate("https://festival-calendar.nl:8080/CKEditor/editor.html");
            //this.RTEFrame.KeyUp += RTEFrame_KeyUp;
            //this.RTEFrame.LoadCompleted += RTEFrame_LoadCompleted;
            
            //this.RTEFrame.Visibility = Visibility.Hidden;
            //this.loader.Visibility = Visibility.Visible;
            //this.loader.Value = 20;
            //this.loader.SetValue(ProgressBar.MinimumProperty, 0.0);
            //this.loader.SetValue(ProgressBar.MaximumProperty, 100.0);

        }

        public void SetText(string txt)
        {
            this.Text = txt;
            //this.setHtml(this.Text);
        }

        //private void RTEFrame_LoadCompleted(object sender, NavigationEventArgs e)
        //{
        //    this.loader.Value = 100;
        //    Thread.Sleep(500);
        //    this.loader.Visibility = Visibility.Hidden;
        //    this.RTEFrame.Visibility = Visibility.Visible;
        //    this.setHtml(this.Text);
        //}

        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(RTE));

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        //private void setHtml(string html = "")
        //{
        //    mshtml.IHTMLDocument2 htmlDoc = this.RTEFrame.Document as mshtml.IHTMLDocument2;
        //    if (htmlDoc.readyState == "complete")
        //    {

        //        //mshtml.IHTMLElement editor = htmlDoc.all.item("editor1");
        //        //HtmlString str = new HtmlString(html);
        //        //string htmlStr = str.ToHtmlString();
        //        //editor.innerHTML = htmlStr;
        //        //editor.innerHTML = Guid.NewGuid().ToString();
        //        if (html != null)
        //        {
        //            this.RTEFrame.InvokeScript("setData", html);
        //        }

        //    }
        //    else
        //    {
        //        int trials = 0;
        //        while (htmlDoc.readyState == "loading")
        //        {
        //            htmlDoc = this.RTEFrame.Document as mshtml.IHTMLDocument2;
        //            if (htmlDoc.readyState == "complete")
        //            {
        //                mshtml.HTMLIFrame editor = htmlDoc.all.item("editor1");
        //                editor.innerHTML = html;
        //                break;
        //            }
        //            else
        //            {
        //                if (trials < 10)
        //                {
        //                    Thread.Sleep(1000);
        //                    trials++;
        //                }
        //                else
        //                {
        //                    break;
        //                }

        //            }
        //        }
        //    }

        //}

        //private void RTEFrame_KeyUp(object sender, KeyEventArgs e)
        //{
        //    mshtml.IHTMLDocument2 htmlDoc = this.RTEFrame.Document as mshtml.IHTMLDocument2;
        //    // do something like find button and click
        //    this.Text = htmlDoc.all.item("editor1").Value;
        //    if (this.TextChange != null)
        //    {
        //        this.TextChange(sender, this.Text);
        //    }
        //}


        //private void RTEFrame_Loaded(object sender, RoutedEventArgs e)
        //{
        //    this.loader.Value = 80.0;
        //}

        private void Opener_Click(object sender, RoutedEventArgs e)
        {
            if(this.OpenerClick != null)
            {
                this.OpenerClick(this, this.Text);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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

namespace FC.Office.Controls.RTE
{
    /// <summary>
    /// Interaction logic for FullScreenRTE.xaml
    /// </summary>
    public partial class FullScreenRTE : UserControl
    {
        public event EventHandler<string> TextChange;
        public event EventHandler<string> Save;
        public event EventHandler<string> Cancel;
        public FullScreenRTE()
        {
            InitializeComponent();
            this.RTEFrame.Navigate("https://festival-calendar.nl:8080/CKEditor/editor.html");
            this.RTEFrame.KeyUp += RTEFrame_KeyUp;
            this.RTEFrame.LoadCompleted += RTEFrame_LoadCompleted;
            this.RTEFrame.Visibility = Visibility.Hidden;
        }

        public void SetText(string txt)
        {
            this.Text = txt;
            this.setHtml(this.Text);
        }

        private void RTEFrame_LoadCompleted(object sender, NavigationEventArgs e)
        {
            this.RTEFrame.Visibility = Visibility.Visible;
            this.setHtml(this.Text);
        }

        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(FullScreenRTE));

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        private void setHtml(string html = "")
        {
            mshtml.IHTMLDocument2 htmlDoc = this.RTEFrame.Document as mshtml.IHTMLDocument2;
            if (htmlDoc.readyState == "complete")
            {

                //mshtml.IHTMLElement editor = htmlDoc.all.item("editor1");
                //HtmlString str = new HtmlString(html);
                //string htmlStr = str.ToHtmlString();
                //editor.innerHTML = htmlStr;
                //editor.innerHTML = Guid.NewGuid().ToString();
                if (html != null)
                {
                    this.RTEFrame.InvokeScript("setData", html);
                }

            }
            else
            {
                int trials = 0;
                while (htmlDoc.readyState == "loading")
                {
                    htmlDoc = this.RTEFrame.Document as mshtml.IHTMLDocument2;
                    if (htmlDoc.readyState == "complete")
                    {
                        mshtml.HTMLIFrame editor = htmlDoc.all.item("editor1");
                        editor.innerHTML = html;
                        break;
                    }
                    else
                    {
                        if (trials < 10)
                        {
                            Thread.Sleep(1000);
                            trials++;
                        }
                        else
                        {
                            break;
                        }

                    }
                }
            }

        }

        private void RTEFrame_KeyUp(object sender, KeyEventArgs e)
        {
            mshtml.IHTMLDocument2 htmlDoc = this.RTEFrame.Document as mshtml.IHTMLDocument2;
            // do something like find button and click
            this.Text = htmlDoc.all.item("editor1").Value;
            if (this.TextChange != null)
            {
                this.TextChange(sender, this.Text);
            }
        }

        private void SaveFullScreen_Click(object sender, RoutedEventArgs e)
        {
            if(this.Save != null)
            {
                if(this.Text == null)
                {
                    this.Text = "";
                }
                this.Save(this, this.Text);
            }
        }

        private void CancelFullScreen_Click(object sender, RoutedEventArgs e)
        {
            if (this.Cancel != null)
            {
                if (this.Text == null)
                {
                    this.Text = "";
                }
                this.Cancel(this, this.Text);
            }
        }
    }
}

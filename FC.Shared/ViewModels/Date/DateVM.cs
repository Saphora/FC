using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Date
{
    public class DateVM
    {
        const int SECOND = 1;
        const int MINUTE = 60 * SECOND;
        const int HOUR = 60 * MINUTE;
        const int DAY = 24 * HOUR;
        const int MONTH = 30 * DAY;

        public string Y1 { get; set; }
        public string Y2 { get; set; }
        public string Y3 { get; set; }
        public string Y4 { get; set; }
        public string Month { get; set; }
        public string Day { get; set; }
        public string Hour { get; set; }
        public string Minute { get; set; }
        public string AgoString { get; set; }
        public string Year { get; set; }

        public string GetAgoString(DateTime t)
        {
            var ts = new TimeSpan(DateTime.UtcNow.Ticks - t.Ticks);
            double delta = Math.Abs(ts.TotalSeconds);

            if (delta < 1 * MINUTE)
                return ts.Seconds == 1 ? "one second ago." : ts.Seconds + " seconds ago.";

            if (delta < 2 * MINUTE)
                return "a minute ago.";

            if (delta < 45 * MINUTE)
                return ts.Minutes + " minutes ago.";

            if (delta < 90 * MINUTE)
                return "an hour ago.";

            if (delta < 24 * HOUR)
                return ts.Hours + " hours ago.";

            if (delta < 48 * HOUR)
                return "yesterday.";

            if (delta < 30 * DAY)
                return ts.Days + " days ago.";

            if (delta < 12 * MONTH)
            {
                int months = Convert.ToInt32(Math.Floor((double)ts.Days / 30));
                return months <= 1 ? "one month ago" : months + " months ago";
            }
            else
            {
                int years = Convert.ToInt32(Math.Floor((double)ts.Days / 365));
                return years <= 1 ? "one year ago" : years + " years ago";
            }

        }

        public DateVM() { }

        public DateVM(DateTime t)
        {
            this.AgoString = this.GetAgoString(t);
            this.Day = t.ToString("dd", CultureInfo.InvariantCulture);
            this.Y1 = t.Year.ToString().ToArray()[0].ToString();
            this.Y2 = t.Year.ToString().ToArray()[1].ToString();
            this.Y3 = t.Year.ToString().ToArray()[2].ToString();
            this.Y4 = t.Year.ToString().ToArray()[3].ToString();
            this.Year = t.Year.ToString();
            int hour = int.Parse(t.ToString("HH", CultureInfo.InvariantCulture)) + 1;
            this.Hour = hour.ToString();
            this.Minute = t.ToString("mm", CultureInfo.InvariantCulture);
            switch (t.Month)
            {
                case 1:
                    this.Month = "JAN";
                    break;
                case 2:
                    this.Month = "FEB";
                    break;
                case 3:
                    this.Month = "MAR";
                    break;
                case 4:
                    this.Month = "APR";
                    break;
                case 5:
                    this.Month = "MAY";
                    break;
                case 6:
                    this.Month = "JUN";
                    break;
                case 7:
                    this.Month = "JUL";
                    break;
                case 8:
                    this.Month = "AUG";
                    break;
                case 9:
                    this.Month = "SEP";
                    break;
                case 10:
                    this.Month = "OCT";
                    break;
                case 11:
                    this.Month = "NOV";
                    break;
                case 12:
                    this.Month = "DEC";
                    break;
            }
        }
    }
}

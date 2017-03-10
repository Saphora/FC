using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Calendar
{
    public class Calendar
    {
        public Dictionary<int, string> Months { get; set; }
        public Dictionary<int, int> Days { get; set; }
        public int Year { get; set; }
        public Calendar(int year)
        {
            Months = new Dictionary<int, string>();
            int i = 1;
            while (i <= 12)
            {
                Months.Add(i, new DateTime(year, i, 1).ToString("MMMM", CultureInfo.CurrentCulture));
                int d = 1;
                Days = new Dictionary<int, int>();
                while (d <= DateTime.DaysInMonth(year, i))
                {
                    Days.Add(d, i);
                    d++;
                }
                i++;
            }
            this.Year = year;

        }
    }
}

using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Helpers
{
    public class CalendarHelper
    {
        public int CurrentWeekNum { get; set; }
        public int FirstWeekNum { get; set; }
        public int LastWeekNum { get; set; }

        public List<DateTime> LastWeek { get; set; }
        public List<DateTime> FirstWeek { get; set; }

        public List<DateTime> MonthDays { get; set; }

        private System.Globalization.Calendar CurrentCalendar;
        private CultureInfo UserCulture;

        public Dictionary<string, List<SimpleDateTime>> Weeks = new Dictionary<string, List<SimpleDateTime>>();

        public List<SimpleDateTime> GetWeekByWeekNum(string dateTime, int weekNum, System.Globalization.Calendar cal, CultureInfo culture)
        {
            if (Weeks.ContainsKey(weekNum.ToString()))
            {
                return Weeks[weekNum.ToString()];
            }
            else
            {
                Weeks = GetWeeks(dateTime, cal, culture);
                return Weeks[weekNum.ToString()];
            }
        }

        public Dictionary<string, List<SimpleDateTime>> GetWeeks(string dateTime, System.Globalization.Calendar cal, CultureInfo culture)
        {
            CurrentCalendar = cal;
            UserCulture = culture;
            DateTime safeDate = DateTime.Parse(dateTime);
            Dictionary<string, List<SimpleDateTime>> result = new Dictionary<string, List<SimpleDateTime>>();
            FirstWeekNum = CurrentCalendar.GetWeekOfYear(new DateTime(safeDate.Year, 1, 1), UserCulture.DateTimeFormat.CalendarWeekRule, UserCulture.DateTimeFormat.FirstDayOfWeek);
            CurrentWeekNum = CurrentCalendar.GetWeekOfYear(new DateTime(safeDate.Year, 1, 1), UserCulture.DateTimeFormat.CalendarWeekRule, UserCulture.DateTimeFormat.FirstDayOfWeek);
            LastWeekNum = CurrentCalendar.GetWeekOfYear(new DateTime(safeDate.Year, 12, 31), UserCulture.DateTimeFormat.CalendarWeekRule, UserCulture.DateTimeFormat.FirstDayOfWeek);

            int activeYear = safeDate.Year;
            int currentWeek = 0;
            int currentMonth = 0;
            List<DateTime> weekDays = new List<DateTime>();
            for (int month = 1; month <= 12; month++)
            {
                DateTime activeMonth = new DateTime(activeYear, month, 1, CurrentCalendar);
                int lastDayNum = activeMonth.AddMonths(1).AddDays(-1).Day;
                SimpleDateTime activeDay;
                int weekOfDay = 0;
                for (int day = 1; day <= lastDayNum; day++)
                {
                    activeDay = new SimpleDateTime(UserCulture.Name, new DateTime(activeYear, month, day, CurrentCalendar).ToString());
                    weekOfDay = CurrentCalendar.GetWeekOfYear(activeDay.BaseDate, UserCulture.DateTimeFormat.CalendarWeekRule, UserCulture.DateTimeFormat.FirstDayOfWeek);
                    if (result.Count() == 0 || !result.ContainsKey(weekOfDay.ToString()))
                    {
                        result.Add(weekOfDay.ToString(), new List<SimpleDateTime>());
                        result[weekOfDay.ToString()].Add(activeDay);
                    }
                    else
                    {
                        result[weekOfDay.ToString()].Add(activeDay);
                    }
                    currentWeek = weekOfDay;
                }
                currentMonth = month;
            }
            return result;
        }
    }
}

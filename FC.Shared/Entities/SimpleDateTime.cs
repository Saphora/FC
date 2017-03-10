using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class SimpleDateTime
    {
        private CultureInfo Culture;
        public string CultureName { get; set; }
        public DateTime BaseDate { get; set; }
        public int DayNum { get; }
        public string DayName { get; }
        public int MonthNum { get;  }
        public string MonthName { get; }
        public int Year { get; }
        public long Ticks { get;  }
        public string TimeStr { get; }
        public string DateStr { get; }
        public int Hour { get; }
        public int Minute { get; }
        public int Second { get; }
        public string ServerMessage { get; }

        public SimpleDateTime(object sdt)
        {
            SimpleDateTime s = (SimpleDateTime)sdt;
            this.BaseDate = s.BaseDate;
            this.Year = s.Year;
            this.DayNum = s.DayNum;
            this.DayName = s.DayName;
            this.MonthNum = s.MonthNum;
            this.MonthName = s.MonthName;
            this.DateStr = s.DateStr;
            Ticks = s.Ticks;
            this.TimeStr = s.TimeStr;
            Hour = s.Hour;
            this.Minute = s.Minute;
            this.Second = s.Second;
            this.CultureName = s.CultureName;

        }

        public SimpleDateTime(string culture, string dateTime)
        {
            CultureName = culture;
            try {
                Culture = CultureInfo.CreateSpecificCulture(culture);
            } catch
            {
                Culture = CultureInfo.CurrentCulture;
                this.ServerMessage = "CULTURE_ERROR";
            }
            DateTime parsedDate;
            if (DateTime.TryParse(dateTime, out parsedDate))
            {
                BaseDate = parsedDate;
                this.ServerMessage = "OK";
            } else
            {
                BaseDate = DateTime.Now;
                this.ServerMessage = "TIMEZONE_ERROR";
            }
            this.Year = BaseDate.Year;
            this.DayNum = BaseDate.Day;
            this.DayName = BaseDate.ToString("dddd", Culture);
            this.MonthNum = BaseDate.Month;
            this.MonthName = BaseDate.ToString("MMMM", Culture);
            this.DateStr = BaseDate.Date.ToString(Culture);
            this.Ticks = BaseDate.Ticks;
            this.TimeStr = string.Format("{0}:{1}", this.Hour, this.Minute);
            this.Hour = BaseDate.Hour;
            this.Minute = BaseDate.Minute;
            this.Second = BaseDate.Second;
        }
        public SimpleDateTime(string culture, DateTime dateTime)
        {
            CultureName = culture;
            try
            {
                Culture = CultureInfo.CreateSpecificCulture(culture);
            }
            catch
            {
                Culture = CultureInfo.CurrentCulture;
                this.ServerMessage = "CULTURE_ERROR";
            }
            BaseDate = dateTime;
            this.Year = BaseDate.Year;
            this.DayNum = BaseDate.Day;
            this.DayName = BaseDate.ToString("dddd", Culture);
            this.MonthNum = BaseDate.Month;
            this.MonthName = BaseDate.ToString("dddd", Culture);
            this.DateStr = BaseDate.Date.ToString(Culture);
            this.Ticks = BaseDate.Ticks;
            this.TimeStr = string.Format("{0}:{1}", this.Hour, this.Minute);
            this.Hour = BaseDate.Hour;
            this.Minute = BaseDate.Minute;
            this.Second = BaseDate.Second;
            this.ServerMessage = "OK";
        }
        public SimpleDateTime(CultureInfo culture, string dateTime)
        {
            
            Culture = culture;
           
            DateTime parsedDate;
            if (DateTime.TryParse(dateTime, out parsedDate))
            {
                BaseDate = parsedDate;
                this.ServerMessage = "OK";
            }
            else
            {
                BaseDate = DateTime.Now;
                this.ServerMessage = "TIMEZONE_ERROR";
            }
            this.Year = BaseDate.Year;
            this.DayNum = BaseDate.Day;
            this.DayName = BaseDate.ToString("dddd", Culture);
            this.MonthNum = BaseDate.Month;
            this.MonthName = BaseDate.ToString("MMMM", Culture);
            this.DateStr = BaseDate.Date.ToString(Culture);
            this.Ticks = BaseDate.Ticks;
            this.TimeStr = string.Format("{0}:{1}", this.Hour, this.Minute);
            this.Hour = BaseDate.Hour;
            this.Minute = BaseDate.Minute;
            this.Second = BaseDate.Second;
        }
        public SimpleDateTime(CultureInfo culture, DateTime dateTime)
        {
            Culture = culture;
            BaseDate = dateTime;
            this.Year = BaseDate.Year;
            this.DayNum = BaseDate.Day;
            this.DayName = BaseDate.ToString("dddd", Culture);
            this.MonthNum = BaseDate.Month;
            this.MonthName = BaseDate.ToString("dddd", Culture);
            this.DateStr = BaseDate.Date.ToString(Culture);
            this.Ticks = BaseDate.Ticks;
            this.TimeStr = string.Format("{0}:{1}", this.Hour, this.Minute);
            this.Hour = BaseDate.Hour;
            this.Minute = BaseDate.Minute;
            this.Second = BaseDate.Second;
            this.ServerMessage = "OK";
        }
        public SimpleDateTime(DateTime dateTime)
        {

            Culture = CultureInfo.CurrentCulture;
            BaseDate = dateTime;
            this.Year = BaseDate.Year;
            this.DayNum = BaseDate.Day;
            this.DayName = BaseDate.ToString("dddd", Culture);
            this.MonthNum = BaseDate.Month;
            this.MonthName = BaseDate.ToString("dddd", Culture);
            this.DateStr = BaseDate.Date.ToString(Culture);
            this.Ticks = BaseDate.Ticks;
            this.TimeStr = string.Format("{0}:{1}", this.Hour, this.Minute);
            this.Hour = BaseDate.Hour;
            this.Minute = BaseDate.Minute;
            this.Second = BaseDate.Second;
            this.ServerMessage = "OK";
        }
        public SimpleDateTime()
        {
            CultureName = CultureInfo.CurrentCulture.Name;
            BaseDate = DateTime.Now;
            this.Year = BaseDate.Year;
            this.DayNum = BaseDate.Day;
            this.DayName = BaseDate.ToString("dddd", Culture);
            this.MonthNum = BaseDate.Month;
            this.MonthName = BaseDate.ToString("dddd", Culture);
            this.DateStr = BaseDate.Date.ToString(Culture);
            this.Ticks = BaseDate.Ticks;
            this.TimeStr = string.Format("{0}:{1}", this.Hour, this.Minute);
            this.Hour = BaseDate.Hour;
            this.Minute = BaseDate.Minute;
            this.Second = BaseDate.Second;
            this.ServerMessage = "TIMEZONE_CULTURE_MISSING";
        }
    }
}

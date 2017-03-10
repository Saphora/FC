var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var SimpleDateTime = (function () {
                function SimpleDateTime(s) {
                    this.CultureName = s.CultureName;
                    this.BaseDate = s.BaseDate;
                    this.Year = s.Year;
                    this.DayNum = s.DayNum;
                    this.DayName = s.DayName;
                    this.MonthNum = s.MonthNum;
                    this.MonthName = s.MonthName;
                    this.DateStr = s.DateStr;
                    this.Ticks = s.Ticks;
                    this.TimeStr = s.TimeStr;
                    this.Hour = s.Hour;
                    this.Minute = s.Minute;
                    this.Second = s.Second;
                }
                return SimpleDateTime;
            }());
            Models.SimpleDateTime = SimpleDateTime;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));

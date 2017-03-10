module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class SimpleDateTime implements INT.ISimpleDateTime {
        constructor(s: INT.ISimpleDateTime) {
            this.CultureName = s.CultureName;
            this.BaseDate = s.BaseDate;
            this.Year = s.Year;
            this.DayNum = s.DayNum;
            this.DayName = s.DayName;
            this.MonthNum = s.MonthNum;
            this.MonthName = s.MonthName;
            this.DateStr = s.DateStr
            this.Ticks = s.Ticks;
            this.TimeStr = s.TimeStr
            this.Hour = s.Hour;
            this.Minute = s.Minute;
            this.Second = s.Second;
        }
        CultureName: string;
        BaseDate: Date;
        DayNum: Number;
        DayName: string;
        MonthNum: Number;
        MonthName: string;
        Year: Number;
        Ticks: Number;
        TimeStr: string;
        DateStr: string;
        Hour: Number;
        Minute: Number;
        Second: Number;
        ServerMessage: string;
    }
}
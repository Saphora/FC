declare module FC.Shared.Interfaces {
    interface ISimpleDateTime {
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

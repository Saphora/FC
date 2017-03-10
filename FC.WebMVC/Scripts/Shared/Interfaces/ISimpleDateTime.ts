module FC.Shared.Interfaces {
    export interface ISimpleDateTime {
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
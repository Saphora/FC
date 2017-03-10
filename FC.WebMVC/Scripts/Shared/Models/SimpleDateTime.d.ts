declare module FC.Shared.Models {
    class SimpleDateTime implements FC.Shared.Interfaces.ISimpleDateTime {
        constructor(s: FC.Shared.Interfaces.ISimpleDateTime);
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

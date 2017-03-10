module FC.Shared.Interfaces {
    export interface ICalendar {
        Months: FC.Core.CoreModel.Dictionary<number, string>;
        Days: FC.Core.CoreModel.Dictionary<number, number>;
        Year: number;
    }
}
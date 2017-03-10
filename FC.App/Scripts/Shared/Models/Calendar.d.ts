declare module FC.Shared.Models {
    class Calendar implements FC.Shared.Interfaces.ICalendar {
        Month: Number;
        Year: Number;
        Festivals: Array<UFestival>;
    }
}

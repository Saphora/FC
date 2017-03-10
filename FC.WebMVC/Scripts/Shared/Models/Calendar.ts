module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class Calendar implements INT.ICalendar {
        public Months: FC.Core.CoreModel.Dictionary<number, string>;
        public Days: FC.Core.CoreModel.Dictionary<number, number>;
        public Year: number;
    }
}
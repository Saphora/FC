module FC.Shared.ServiceMessages {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class FestivalFilter implements INT.IFestivalFilter {
        public GenreIDs: Array<string>;
        public CountryIDs: Array<string>;
        public FestivalID: string;
        public MonthNum: number;   
        public YearNum: number; 
    }
}
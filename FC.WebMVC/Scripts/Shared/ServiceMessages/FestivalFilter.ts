module FC.Shared.ServiceMessages {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class FestivalFilter implements INT.IFestivalFilter {

        public constructor(genres: FC.Shared.Models.Favorite[] = null,
            artists: FC.Shared.Models.Favorite[] = null,
            locations: FC.Shared.Models.Favorite[] = null,
            countries: FC.Shared.Models.Favorite[] = null) {
            this.GenreIDs = new Array<string>();
            this.ArtistIDs = new Array<string>();
            this.LocationIDs = new Array<string>();
            this.FestivalIDs = new Array<string>();
            this.CountryIDs = new Array<string>();
            var vm = this;
            if (genres) {
                genres.forEach(function (v, k) {
                    vm.GenreIDs.push(v.ContentID);
                });
            }
            if (artists) {
                artists.forEach(function (v, k) {
                    vm.ArtistIDs.push(v.ContentID);
                });
            }
            if (locations) {
                locations.forEach(function (v, k) {
                    vm.LocationIDs.push(v.ContentID);
                });
            }
            if (countries) {
                countries.forEach(function (v, k) {
                    vm.CountryIDs.push(v.ContentID);
                });
            }
        }

        public GenreIDs: Array<string>;
        public CountryIDs: Array<string>;
        public LocationIDs: Array<string>;
        public ArtistIDs: Array<string>;
        public FestivalIDs: Array<string>;
        public FestivalID: string;
        public MonthNum: number;   
        public YearNum: number; 
    }
}
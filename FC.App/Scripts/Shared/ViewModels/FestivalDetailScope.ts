import Model = FC.Shared.Models;
module FC.Shared.ViewModels {
    export class FestivalDetailScope {
        public FestivalDetails: Model.UFestival; 
        public Artists: Array<Model.UArtist>; 
        public Genres: Array<Model.UGenre>; 
        public News:  Array<Model.UNews>;
    }
}
module FC.Shared.Models {
    export class FestivalListItem {
        public FestivalID:string;
        public FestivalName:string;
        public LocationName:string;
        public LocationID :string;
        public LogoID :string;
        public StartDate:string;
        public EndDate:string;
        public AuthorID :string;
        public AuthorName :string;
        public Visitors:string;
        public City:string;
        public CountryName:string;
        public CountryID :string;
        public FestivalGenreNames:string;
        public FestivalGenreIDs:string;
        public GenreIDs: Array<string>;
        public GenreNames: Array<string>;
        public Start_Y1:string;
        public Start_Y2:string;
        public Start_Y3:string;
        public Start_Y4:string;
        public Start_M:string;
        public Start_Day:string;
        public End_Y1:string;
        public End_Y2:string;
        public End_Y3:string;
        public End_Y4:string;
        public End_M:string;
        public End_Day:string;
        public DayCount:string;
    }
}        

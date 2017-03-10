module FC.Modules.Festival.Models {
    export class FestivalListVM {
        public GenreNames: string;
        public ZIPCode: string; 
        public FestivalName       :  string ; 
        public CountryName        :  string ; 
        public City               :  string ; 
        public IsPublished: boolean;        ;
        public  StartDate         :  Date   ;
        public  EndDate           :  Date   ;
        public  ProfileImageID    :  string ;
        public  LogoID            :  string ; 
        public FestivalID         :  string ;  
        public StartDateExplosion: FC.Shared.ViewModels.DateVM;
        public EndDateExplosion: FC.Shared.ViewModels.DateVM;
    }
}
module FC.Shared.Models {
    export class Stage {
        public StageID:string;
        public Name:string;
        public FestivalID:string;
        public Created:string;
        public Modified:string;
        public Deleted:boolean;
        public IsPublished:boolean;
        public AuthorID: string;
        public LineUp: List<LineupItem>;
    }
}
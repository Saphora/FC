module FC.Shared.Models {
    export class LineupItem {
        public LineupItemID :string;
        public StageID :string;
        public ArtistID :string;
        public Artist :UArtist;
        public StartDate :Date;
        public EndDate :Date;
        public StartDateKey :number;
        public EndDateKey: number;
        public StartDateExplosion: FC.Shared.ViewModels.DateVM;
        public EndDateExplosion: FC.Shared.ViewModels.DateVM;
    }
}
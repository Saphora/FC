module FC.Shared.Models {
    export class Location  {
        public LocationID: string;
        public Address: string;
        public ZIPCode: string;
        public City: string;
        public CountryID: string;
        public Country: UCountry;
        public LocationName: string;
        public Website: string; 
        public Email: string;
        public Phone: string;
        public Social: Array<SocialProfile>;
        public MapsURL: string;
        public ProfileHeaderImageID: string;
        public ProfileHeaderImage: Media;
        public ThumbnailID: string;
        public Thumbnail: Media;
        public MediaDirectoryID: string;
        public Album: MediaDirectory;
        public ProfileImageID: string;
        public ProfileImage: Media;
        public Created: Date;
        public Modified: Date;
        public ArchiveDate: Date;
        public Deleted: boolean;
        public AuthorID: string;
        public Latitude: number;
        public Longitude: number;
    }
}


-- THIS SHOULD NEVER BE USED. THIS IS A WORKAROUND, SYNC THE HISTORY WITH THE CURRENT MIGRATION SCRIPT. 
--INSERT INTO dbo."__MigrationHistory" ("MigrationId", "ContextKey", "Model", "ProductVersion")
--SELECT "MigrationId", "ContextKey", "Model", "ProductVersion"
--	FROM dblink('dbname=fc_initial','SELECT "MigrationId", "ContextKey", "Model", "ProductVersion" FROM dbo."__MigrationHistory"') as mig (
--	 "MigrationId" varchar(255), "ContextKey" varchar(255) ,  "Model" bytea,  "ProductVersion" varchar(255)
--);

INSERT INTO dbo."UGenre2UArtist" ("G2AID", "GenreID", "ArtistID")
SELECT "G2AID", "GenreID", "ArtistID"
	FROM dblink('dbname=FCV2','SELECT "G2AID", "GenreID", "ArtistID"
	FROM dbo."UGenre2UArtist"') as g2a (
        "G2AID" UUID, "GenreID" UUID, "ArtistID" UUID
);

INSERT INTO dbo."UGenre2UArtist" ("G2AID", "GenreID", "ArtistID")
SELECT "G2AID", "GenreID", "ArtistID"
	FROM dblink('dbname=FCV2','SELECT "G2AID", "GenreID", "ArtistID"
	FROM dbo."UGenre2UArtist"') as g2a (
        "G2AID" UUID, "GenreID" UUID, "ArtistID" UUID
    );

INSERT INTO dbo."UGenre2UFestival" ("G2FID", "GenreID", "FestivalID")
SELECT "G2FID", "GenreID", "FestivalID"
	FROM dblink('dbname=FCV2','SELECT "G2FID", "GenreID", "FestivalID"
	FROM dbo."UGenre2UFestival"') as g2f (
        "G2FID" UUID, "GenreID" UUID, "FestivalID" UUID
    );



INSERT INTO dbo."UGenres" ("GenreID", "ParentID", "VisibleOnHome", "Name", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "UmbracoID", "UGenre_GenreID", "UArtist_ArtistID", "UFestival_FestivalID", "UAnnouncement_AnnouncementID", "UNews_NewsID", "IsPublished", "ModifiedDate",  "ArchiveDate", "AuthorID", "IsPopular", "Advertisement_AdvertisementID", "AlbumID", "ThumbnailID")
SELECT "GenreID", "ParentID", "VisibleOnHome", "Name", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "UmbracoID", "UGenre_GenreID", "UArtist_ArtistID", "UFestival_FestivalID", "UAnnouncement_AnnouncementID", "UNews_NewsID", "IsPublished", "ModifiedDate",  "ArchiveDate", "AuthorID", "IsPopular", "Advertisement_AdvertisementID", "AlbumID", "ThumbnailID"
	FROM dblink('dbname=FCV2', 'SELECT "GenreID", "ParentID", "VisibleOnHome", "Name", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "UmbracoID", "UGenre_GenreID", "UArtist_ArtistID", "UFestival_FestivalID", "UAnnouncement_AnnouncementID", "UNews_NewsID", "IsPublished", "ModifiedDate",  "ArchiveDate", "AuthorID", "IsPopular", "Advertisement_AdvertisementID", "AlbumID", "ThumbnailID"
	FROM dbo."UGenres"') as genres (
        "GenreID" UUID,
        "ParentID" UUID,
        "VisibleOnHome" integer, 
        "Name" varchar(100), 
        "SortOrder" bigint, 
        "URL" varchar(255), 
        "URLName" varchar(255), 
        "UpdateDate" timestamp, 
        "CreateDate" timestamp, 
        "WriterName" varchar(100), 
        "CreatorName" varchar(100), 
        "UmbracoID" int, 
        "UGenre_GenreID" UUID, 
        "UArtist_ArtistID" UUID, 
        "UFestival_FestivalID" UUID, 
        "UAnnouncement_AnnouncementID" UUID, 
        "UNews_NewsID" UUID, 
        "IsPublished" boolean, 
        "ModifiedDate" timestamp, 

        "ArchiveDate" timestamp, 
        "AuthorID" UUID, 
        "IsPopular" boolean, 
        "Advertisement_AdvertisementID" UUID, 
        "AlbumID" UUID, 
        "ThumbnailID" UUID
        );

INSERT INTO dbo."UArtists" ("ArtistID", "IsPopular", "CountryID", "MediaDirectoryID", "Name", "Description", "Website", "ThumbnailID", "ProfileImageID", "LogoID", "FacebookURL", "InstagramURL", "SoundcloudURL", "TwitterURL", "SpotifyURL", "MyspaceURL", "YoutubeURL", "DeezerURL",  "ArchiveDate", "MetaKeys", "MetaDescription", "OrderDate", "ShortText", "DetailText", "Link", "Rating", "RatingScore", "ModifiedDate", "IsPublished", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "AuthorID", "UmbracoID", "UFestival_FestivalID")
SELECT "ArtistID", "IsPopular", "CountryID", "MediaDirectoryID", "Name", "Description", "Website", "ThumbnailID", "ProfileImageID", "LogoID", "FacebookURL", "InstagramURL", "SoundcloudURL", "TwitterURL", "SpotifyURL", "MyspaceURL", "YoutubeURL", "DeezerURL",  "ArchiveDate", "MetaKeys", "MetaDescription", "OrderDate", "ShortText", "DetailText", "Link", "Rating", "RatingScore", "ModifiedDate", "IsPublished", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "AuthorID", "UmbracoID", "UFestival_FestivalID"
	FROM dblink('dbname=FCV2', 'SELECT "ArtistID", "IsPopular", "CountryID", "MediaDirectoryID", "Name", "Description", "Website", "ThumbnailID", "ProfileImageID", "LogoID", "FacebookURL", "InstagramURL", "SoundcloudURL", "TwitterURL", "SpotifyURL", "MyspaceURL", "YoutubeURL", "DeezerURL",  "ArchiveDate", "MetaKeys", "MetaDescription", "OrderDate", "ShortText", "DetailText", "Link", "Rating", "RatingScore", "ModifiedDate", "IsPublished", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "AuthorID", "UmbracoID", "UFestival_FestivalID"
	FROM dbo."UArtists"') AS artists (
		"ArtistID" UUID, 
        "IsPopular" boolean, 
        "CountryID" UUID,
        "MediaDirectoryID" UUID, 
        "Name" varchar(100), 
        "Description" varchar(10000), 
        "Website" varchar(500), 
        "ThumbnailID" UUID, 
        "ProfileImageID" UUID, 
        "LogoID" UUID, 
        "FacebookURL" varchar(200), 
        "InstagramURL" varchar(200), 
        "SoundcloudURL" varchar(200), 
        "TwitterURL" varchar(200), 
        "SpotifyURL" varchar(200), 
        "MyspaceURL" varchar(200), 
        "YoutubeURL" varchar(200), 
        "DeezerURL" varchar(200), 

        "ArchiveDate" timestamp, 
        "MetaKeys" varchar(255), 
        "MetaDescription"  varchar(1000), 
        "OrderDate" bigint, 
        "ShortText" varchar(1000), 
        "DetailText" varchar(1000), 
        "Link" varchar(100), 
        "Rating" varchar(100), 
        "RatingScore" int, 
        "ModifiedDate" timestamp, 
        "IsPublished" boolean, 
        "SortOrder" bigint, 
        "URL" varchar(500), 
        "URLName" varchar(500), 
        "UpdateDate" timestamp, 
        "CreateDate" timestamp, 
        "WriterName" varchar(100), 
        "CreatorName" varchar(100), 
        "AuthorID" UUID, 
        "UmbracoID" int, 
        "UFestival_FestivalID" UUID
	
    );


INSERT INTO dbo."UCountries" ("CountryID", "IsPopular", "Name", "CultureIsoName", "LanguageName", "Currency", "ArchiveDate",  "ModifiedDate", "IsPublished", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "AuthorID", "UmbracoID")
	SELECT "CountryID", "IsPopular", "Name", "CultureIsoName", "LanguageName", "Currency", "ArchiveDate",  "ModifiedDate", "IsPublished", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "AuthorID", "UmbracoID"
	FROM dblink('dbname=FCV2', 'SELECT "CountryID", "IsPopular", "Name", "CultureIsoName", "LanguageName", "Currency", "ArchiveDate",  "ModifiedDate", "IsPublished", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "AuthorID", "UmbracoID"
	FROM dbo."UCountries"') as countries (
        "CountryID" UUID, "IsPopular" boolean, "Name" varchar(100), "CultureIsoName" varchar(100), "LanguageName" varchar(100), "Currency" varchar(100),
        "ArchiveDate" timestamp, "Deleted" boolean, "ModifiedDate" timestamp, "IsPublished" boolean, "SortOrder" bigint, "URL" varchar(100), 
        "URLName" varchar(100), "UpdateDate" timestamp, "CreateDate" timestamp, "WriterName" varchar(100), "CreatorName" varchar(100), "AuthorID" UUID, "UmbracoID" int
    );


INSERT INTO dbo."MediaDirectories" ("DirectoryID", "ParentID", "Name", "Created", "Modified", "AuthorID",  "ArchiveDate")
	SELECT "DirectoryID", "ParentID", "Name", "Created", "Modified", "AuthorID",  "ArchiveDate"
    FROM dblink('dbname=FCV2', 'SELECT "DirectoryID", "ParentID", "Name", "Created", "Modified", "AuthorID",  "ArchiveDate"
	FROM dbo."MediaDirectories"') as directories (
    	"DirectoryID" UUID, "ParentID" UUID, "Name" varchar(100), "Created" timestamp, "Modified" timestamp, "AuthorID" UUID, "Deleted" boolean, "ArchiveDate" timestamp
    );

	
INSERT INTO dbo."UFestivals" ("FestivalID", "CountryID", "IsSoldOut", "Name", "IndoorOutdoor", "City", "Visitors", "StartDate", "EndDate", "CampingAvailable", "Description", "Address", "ZIPCode", "Website", "Stages", "FacebookURL", "TwitterURL", "YoutubeURL", "FlickrURL", "InstagramURL", "SpotifyURL", "DeezerURL", "AftermovieYoutubeURL", "MetaDescription", "Rating", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "UmbracoID", "IsPublished", "ModifiedDate", "ArchiveDate", "TopFestival",  "SoundCloudURL", "MetaKeys", "Title", "OrderDate", "ShortText", "AuthorID", "IsPopular", "FestivalLocationID", "MediaDirectoryID", "ProfileImageID", "LogoID")
	SELECT "FestivalID", "CountryID", "IsSoldOut", "Name", "IndoorOutdoor", "City", "Visitors", "StartDate", "EndDate", "CampingAvailable", "Description", "Address", "ZIPCode", "Website", "Stages", "FacebookURL", "TwitterURL", "YoutubeURL", "FlickrURL", "InstagramURL", "SpotifyURL", "DeezerURL", "AftermovieYoutubeURL", "MetaDescription", "Rating", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "UmbracoID", "IsPublished", "ModifiedDate", "ArchiveDate", "TopFestival",  "SoundCloudURL", "MetaKeys", "Title", "OrderDate", "ShortText", "AuthorID", "IsPopular", "FestivalLocationID", "MediaDirectoryID", "ProfileImageID", "LogoID"
    FROM dblink('dbname=FCV2', 'SELECT "FestivalID", "CountryID", "IsSoldOut", "Name", "IndoorOutdoor", "City", "Visitors", "StartDate", "EndDate", "CampingAvailable", "Description", "Address", "ZIPCode", "Website", "Stages", "FacebookURL", "TwitterURL", "YoutubeURL", "FlickrURL", "InstagramURL", "SpotifyURL", "DeezerURL", "AftermovieYoutubeURL", "MetaDescription", "Rating", "SortOrder", "URL", "URLName", "UpdateDate", "CreateDate", "WriterName", "CreatorName", "UmbracoID", "IsPublished", "ModifiedDate", "ArchiveDate", "TopFestival",  "SoundCloudURL", "MetaKeys", "Title", "OrderDate", "ShortText", "AuthorID", "IsPopular", "FestivalLocationID", "MediaDirectoryID", "ProfileImageID", "LogoID"
	FROM dev_festival_calendar.dbo."UFestivals"') AS festivals(
        "FestivalID" UUID, 
        "CountryID" UUID, 
        "IsSoldOut" int,
        "Name" varchar(255), 
        "IndoorOutdoor" varchar(50),
        "City" varchar(50), 
        "Visitors" varchar(50), 
        "StartDate" timestamp, 
        "EndDate" timestamp, 
        "CampingAvailable" varchar(10), 
        "Description" varchar(255), 
        "Address" varchar(100), 
        "ZIPCode" varchar(100), 
        "Website" varchar(100), 
        "Stages" int, 
        "FacebookURL" varchar(100), 
        "TwitterURL" varchar(100), 
        "YoutubeURL" varchar(100), 
        "FlickrURL" varchar(100), 
        "InstagramURL" varchar(100), 
        "SpotifyURL" varchar(100), 
        "DeezerURL" varchar(100), 
        "AftermovieYoutubeURL" varchar(100), 
        "MetaDescription" varchar(100), 
        "Rating" varchar(100), 
        "SortOrder" integer, 
        "URL" varchar(100), 
        "URLName" varchar(100), 
        "UpdateDate" timestamp, 
        "CreateDate" timestamp, 
        "WriterName" varchar(100), 
        "CreatorName" varchar(100), 
        "UmbracoID" int, 
        "IsPublished" boolean, 
        "ModifiedDate" timestamp, 
        "ArchiveDate" timestamp, 
        "TopFestival" boolean, 

        "SoundCloudURL" varchar(100), 
        "MetaKeys" varchar(100), 
        "Title" varchar(100), 
        "OrderDate" bigint, 
        "ShortText" varchar(100), 
        "AuthorID" UUID, 
        "IsPopular" boolean, 
        "FestivalLocationID" UUID, 
        "MediaDirectoryID" UUID, 
        "ProfileImageID" UUID, 
        "LogoID" UUID
    );




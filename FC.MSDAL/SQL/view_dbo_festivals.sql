CREATE VIEW dbo.FestivalListItems AS

SELECT 
	fests.FestivalID as FestivalID,
	fests.[Name] as FestivalName,
	CONCAT(author.[UserFirstname]+' ', author.[UserLastname]+' ', author.UserMiddlename) as AuthorName,
	loc.LocationName as LocationName,
	loc.LocationID as LocationID,
	[LogoID] as LogoID,
	[StartDate] as StartDate,
	[EndDate] as EndDate,
	fests.[AuthorID] as AuthorID,
	[Visitors] as Visitors,
	fests.[City] as City,
	ctries.[Name] as "CountryName",
	fests.[CountryID] as "CountryID",
	(SELECT LOWER(g.Name)+',' AS "data()"  
	   FROM	dbo.UGenre2UFestival as g2f 
       INNER JOIN dbo.UGenres as g on g.GenreID = g2f.GenreID
	   WHERE g2f.FestivalID = fests.FestivalID
      FOR XML PATH (''))    AS "FestivalGenreNames",
	(SELECT LOWER(g.GenreID) AS "data()"  
	   FROM	dbo.UGenre2UFestival as g2f 
       INNER JOIN dbo.UGenres as g on g.GenreID = g2f.GenreID
	   WHERE g2f.FestivalID = fests.FestivalID
      FOR XML PATH (''))    AS "FestivalGenreIDs",
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.StartDate)),1,1) as Start_Y1,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.StartDate)),2,1) as Start_Y2,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.StartDate)),3,1) as Start_Y3,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.StartDate)),4,1) as Start_Y4,
	SUBSTRING(DATENAME(month, fests.StartDate),1,3) AS Start_M,
	CASE WHEN DATEPART(DD, fests.StartDate) < 10
	THEN
		CONCAT('0', CONVERT(VARCHAR(2), DATEPART(DD, fests.StartDate)))
	ELSE
		CONVERT(VARCHAR(2), DATEPART(DD, fests.StartDate))
	END as Start_Day,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.EndDate)),1,1) as End_Y1,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.EndDate)),2,1) as End_Y2,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.EndDate)),3,1) as End_Y3,
	SUBSTRING(CONVERT(VARCHAR(4), DATEPART(yy, fests.EndDate)),4,1) as End_Y4,
	SUBSTRING(DATENAME(month, fests.StartDate),1,3) AS End_M,
	CASE WHEN DATEPART(DD, fests.StartDate) < 10
	THEN
		CONCAT('0', CONVERT(VARCHAR(2), DATEPART(DD, fests.StartDate)))
	ELSE
		CONVERT(VARCHAR(2), DATEPART(DD, fests.StartDate))
	END as End_Day,
	CASE WHEN DATEDIFF(DAY, fests.StartDate, fests.EndDate) = 0 THEN '1 Day'
	WHEN DATEDIFF(DAY, fests.StartDate, fests.EndDate) = 1 THEN '1 Day'
	ELSE
		convert(varchar(10), DATEDIFF(DAY, fests.StartDate, fests.EndDate)) + ' Days'
	END as DayCount
FROM
	dbo.UFestivals as fests
INNER JOIN
	dbo.ApplicationUsers as author on author.UserID = fests.AuthorID
INNER JOIN
	dbo.UCountries as ctries on fests.CountryID = ctries.CountryID
LEFT JOIN
	dbo.Locations as loc on fests.FestivalLocationID = loc.LocationID
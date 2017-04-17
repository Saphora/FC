using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.MSDAL;
using FC.Shared.Config;
using FC.Shared.Entities;
using FC.Shared.ServerMessages;
using FC.Shared.ViewModels.Date;
using FC.Shared.ViewModels.Festival;
using FC.Shared.ViewModels.Rating;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class FestivalRepository : BaseRepository
    {
        StageRepository stageRepo = new StageRepository();
        LineupRepository lineupRepo = new LineupRepository();
        MediaRepository MediaRepo = new MediaRepository();

        public List<UFestival> GetAll()
        {
            List<UFestival> festivals;

            using (Db = new FC.MSDAL.ContentModel())
            {
                festivals = Db.Festivals.OrderBy(o => o.Name).ToList();
            }

            return festivals;
        }

        public List<UFestival> GetByUser(Guid? author)
        {
            List<UFestival> result = new List<UFestival>();
            using (Db = new FC.MSDAL.ContentModel())
            {
                result = Db.Festivals.Where(w => w.AuthorID == author.Value).OrderBy(o => o.Name).ToList();
            }
            return result;
        }

        public IQueryable<UFestival> ToQueryable()
        {
            Db = new FC.MSDAL.ContentModel();
            return Db.Festivals.AsQueryable<UFestival>();
        }

        public List<UFestival> GetAllWithGenres()
        {
            List<UFestival> festivals;

            using (Db = new FC.MSDAL.ContentModel())
            {
                festivals = Db.Festivals.OrderBy(o => o.StartDate).Take(1000).ToList();
                foreach (UFestival f in festivals)
                {
                    f.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
                }
            }

            return festivals;
        }

        public List<UFestival> GetList(int month = 0, int year = 0, string genres = "")
        {
            List<Guid> gids = new List<Guid>();
            List<UFestival> result = new List<UFestival>();
            using (Db = new FC.MSDAL.ContentModel())
            {
                if (month == 0)
                {
                    month = DateTime.Now.Month;
                }
                if (year == 0)
                {
                    year = DateTime.Now.Year;
                }
                if (genres != "")
                {
                    gids.AddRange((from g in genres.Split(',') select Guid.Parse(g)));
                }

                if (gids.Count == 0)
                {
                    result = Db.Festivals.Where(w => w.StartDate.Month == month && w.StartDate.Year == year).OrderBy(o => o.StartDate).ToList();
                }
                else
                {
                    result = Db.G2F.Where(w => gids.Contains(w.GenreID.Value) && w.Festival.StartDate.Month == month && w.Festival.StartDate.Year == year).Select(s => s.Festival).OrderBy(o => o.StartDate).ToList();
                }
                foreach (var f in result)
                {
                    if (f.Country == null)
                    {
                        f.Country = Db.Countries.Find(f.CountryID);
                    }
                }
            }

            var festivals = result.OrderBy(o => o.StartDate).ToList();
            using (Db = new FC.MSDAL.ContentModel())
            {
                foreach (UFestival f in festivals)
                {
                    f.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
                }
            }
            return festivals;
        }

        public UFestival GetByID(Guid? id)
        {
            UFestival f;
            using (Db = new FC.MSDAL.ContentModel())
            {
                f = Db.Festivals.Find(id);

                if (f != null)
                {
                    if (f.StartDate != null && f.StartDate != DateTime.MinValue && f.EndDate != null && f.EndDate != DateTime.MinValue)
                    {
                        f.StartDateExplosion = new DateVM(f.StartDate);
                        f.EndDateExplosion = new DateVM(f.EndDate);
                    }
                    IQueryable<UGenre> tmpGenres = Db.G2F.Where(w => w.FestivalID == id).Select(s => s.Genre);
                    if (tmpGenres.Any())
                    {
                        f.Genres = tmpGenres.OrderBy(o => o.Name).Take(10).ToList();
                    }
                    if (f.FestivalLocationID != null)
                    {
                        f.FestivalLocation = Db.Locations.Find(f.FestivalLocationID);
                    }
                    if (f.MediaDirectoryID != null)
                    {
                        f.Album = MediaRepo.GetDirectoryByID(f.MediaDirectoryID);
                    }
                    if (f.SocialProfiles == null)
                    {
                        f.SocialProfiles = new List<SocialProfile>();
                    }
                    if (f.StageList == null)
                    {
                        f.StageList = stageRepo.GetAll(f.FestivalID);
                    }
                    f.SocialProfiles = Db.SocialProfiles.Where(w => w.GenericID == id).OrderBy(o => o.ProfileType.Name).ToList();
                }
            }
            return f;
        }

        private List<UFestival> mergeResult(List<UFestival> result, List<UFestival> query)
        {
            foreach (UFestival f in query)
            {
                if (!result.Select(s => s.FestivalID).Contains(f.FestivalID))
                {
                    result.Add(f);
                }
            }
            return result;
        }

        public List<FestivalListItem> GetFilteredFestival(FC.Shared.ServerMessages.FestivalFilter filter)
        {
            List<FestivalListItem> tmpResult = new List<FestivalListItem>();
            List<FestivalListItem> result = new List<FestivalListItem>();
            bool noFilter = true;
            if (filter.YearNum == -1)
            {
                filter.YearNum = DateTime.Now.Year;
            }

            if (filter.MonthNum == -1)
            {
                filter.MonthNum = DateTime.Now.Month;
            }

            using (var db = new ContentModel())
            {
                tmpResult = db.ViewFestivals.Where(w => w.StartDate.Year == filter.YearNum && w.StartDate.Month == filter.MonthNum).ToList();
            }

            if (filter.GenreIDs != null)
            {
                if (filter.GenreIDs.Count > 0)
                {
                    noFilter = false;
                    foreach (Guid genreID in filter.GenreIDs)
                    {
                        string gid = genreID.ToString();
                        result.AddRange(tmpResult.Where(w => w.FestivalGenreIDs.IndexOf(gid) > 0));
                    }
                }
            }
            
            if (filter.LocationIDs != null)
            {
                if (filter.LocationIDs.Count > 0)
                {
                    noFilter = false;
                    result.AddRange(tmpResult.Where(w => filter.LocationIDs.Contains(w.LocationID)));
                }
            }
            if(filter.CountryIDs != null)
            {
                if (filter.CountryIDs.Count > 0)
                {
                    noFilter = false;
                    result.AddRange(tmpResult.Where(w => filter.CountryIDs.Contains(w.CountryID)));
                }
            }
            if(result.Count == 0 && noFilter)
            {
                result = tmpResult;
            }
            result = result
                        .OrderBy(o => o.Start_Day)
                        .Skip(filter.CurrentLength)
                        .Take(filter.PageLength).ToList();
            return result;
            //List<UFestival> result = new List<UFestival>();
            //List<UFestival> tmpList = new List<UFestival>();
            //List<FestivalVM> vmResult = new List<FestivalVM>();
            //if(filter.GenreIDs == null)
            //{
            //    filter.GenreIDs = new List<Guid?>();
            //}
            //if(filter.CountryIDs == null)
            //{
            //    filter.GenreIDs = new List<Guid?>();
            //}
            //if(filter.ArtistIDs == null)
            //{
            //    filter.ArtistIDs = new List<Guid?>();
            //}
            //if(filter.LocationIDs == null)
            //{
            //    filter.LocationIDs = new List<Guid?>();
            //}


            //if(filter.CountryIDs.Count == 0)
            //{
            //    using (var db = new ContentModel())
            //    {
            //        filter.CountryIDs = db.Countries.Select(s => s.CountryID).ToList();
            //    }
            //}
            //if(filter.GenreIDs.Count == 0)
            //{
            //    using (var db = new ContentModel())
            //    {
            //        filter.GenreIDs = db.Genres.Select(s => s.GenreID).ToList();
            //    }
            //}

            //bool none = true;
            //if (filter.GenreIDs != null)
            //{
            //    if (filter.GenreIDs.Count > 0)
            //    {
            //        none = false;
            //        using (var db = new FC.MSDAL.ContentModel())
            //        {
            //            List<UFestival> g2f = db.G2F.Where(w => filter.GenreIDs.Contains(w.GenreID)).Select(s => s.Festival).Distinct().ToList();
            //            tmpList = this.mergeResult(tmpList, g2f);
            //        }
            //    }
            //}
            //if (filter.LocationIDs != null)
            //{
            //    if (filter.LocationIDs.Count > 0)
            //    {
            //        none = false;
            //        using (var db = new FC.MSDAL.ContentModel())
            //        {
            //            List<UFestival> fl = db.Festivals.Where(w => filter.LocationIDs.Contains(w.FestivalLocationID)).Distinct().ToList();
            //            tmpList = this.mergeResult(tmpList, fl);
            //        }

            //    }
            //}
            //if (filter.ArtistIDs != null)
            //{
            //    if (filter.ArtistIDs.Count > 0)
            //    {
            //        none = false;

            //        using (var db = new FC.MSDAL.ContentModel())
            //        {
            //            List<UFestival> a2f = db.A2F.Where(w => filter.ArtistIDs.Contains(w.ArtistID)).Select(s => s.Festival).Distinct().ToList();
            //            tmpList = this.mergeResult(tmpList, a2f);
            //        }
            //    }
            //}
            //if (filter.CountryIDs != null)
            //{
            //    if (filter.CountryIDs.Count > 0)
            //    {
            //        none = false;
            //        List<UFestival> c2f;

            //        if (tmpList.Count == 0)
            //        {
            //            using (var db = new FC.MSDAL.ContentModel())
            //            {
            //                c2f = db.Festivals.Where(w => filter.CountryIDs.Contains(w.CountryID)).Distinct().ToList();
            //                tmpList = this.mergeResult(tmpList, c2f);
            //            }
            //        }
            //        else
            //        {
            //            tmpList = tmpList.Where(w => filter.CountryIDs.Contains(w.CountryID)).Distinct().ToList();
            //        }
            //    }
            //}

            //if (none)
            //{
            //    using (var db = new FC.MSDAL.ContentModel())
            //    {
            //        tmpList = db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum).ToList();
            //    }
            //}

            //if (filter.MonthNum >= 1 && filter.MonthNum <= 12)
            //{
            //    tmpList = tmpList.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum).Take(50).ToList();
            //}
            //else
            //{
            //    tmpList = tmpList.Where(w => w.StartDate >= DateTime.Now && w.StartDate <= DateTime.Now.AddDays(30)).Take(50).ToList();
            //}
            //vmResult = new List<FestivalVM>();

            ////List<UGenre2UFestival> genres = RepositoryContext.GetInstance().Genres.GetAllFestivalGenres();
            //List<UCountry> countries = RepositoryContext.GetInstance().Countries.GetAll();
            //foreach (UFestival f in tmpList)
            //{
            //    if (f.IsPublished)
            //    {
            //        f.Country = countries.Where(w => w.CountryID == f.CountryID).FirstOrDefault();
            //        //f.Genres = genres.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
            //        FestivalVM vm = new FestivalVM(f);
            //        vmResult.Add(vm);
            //    }
            //}

            //var res = vmResult
            //            .OrderBy(o => o.StartDateExplosion.Day)
            //            .ThenBy(o => o.StartDateExplosion.MonthNum)
            //            .ThenBy(o => o.StartDateExplosion.Y4)
            //            .Skip(filter.CurrentLength)
            //            .Take(filter.PageLength).ToList();
            //return res;
        }

        public List<FestivalListItem> GetUpcoming(FC.Shared.ServerMessages.FestivalFilter filter)
        {
            return this.GetFilteredFestival(filter).Take(5).ToList();
        }

        public List<FestivalListItem> Search(string keyword)
        {
            keyword = keyword.ToLower();
            List<FestivalListItem> result = new List<FestivalListItem>();
            using (var db = new FC.MSDAL.ContentModel())
            {
                result = db.ViewFestivals.Where(w => w.FestivalGenreNames.Contains(keyword)
                                        || w.City.Contains(keyword)
                                        || w.CountryName.Contains(keyword)
                                        || w.FestivalName.Contains(keyword)).ToList();
            }
            return result.OrderBy(o => o.StartDate).ToList();
        }


        public RepositoryState Create(UFestival fest)
        {
            try
            {
                using (Db = new FC.MSDAL.ContentModel())
                {
                    fest.FestivalID = Guid.NewGuid();
                    if (fest.Tickets != null)
                    {
                        if (fest.Tickets.Count > 0)
                        {
                            foreach (Ticket t in fest.Tickets)
                            {
                                Db.T2F.Add(new Ticket2Festival() { FestivalID = fest.FestivalID, TicketID = t.TicketID, T2FID = Guid.NewGuid() });
                            }
                        }

                    }
                    if (fest.SocialProfiles != null)
                    {
                        if (fest.SocialProfiles.Count > 0)
                        {
                            foreach (SocialProfile t in fest.SocialProfiles)
                            {
                                t.GenericID = fest.FestivalID;
                                t.ContentType = Shared.Enum.SocialMediaBindableType.Festival;
                                Db.SocialProfiles.Add(t);
                            }
                        }
                    }

                    if (fest.Genres != null)
                    {
                        if (fest.Genres.Count > 0)
                        {
                            List<UGenre2UFestival> g2f = (from g in fest.Genres select new UGenre2UFestival { G2FID = Guid.NewGuid(), FestivalID = fest.FestivalID, GenreID = g.GenreID }).ToList();
                            Db.G2F.AddRange(g2f);
                        }
                    }
                    fest.IsPublished = false;
                    fest.Created = DateTime.Now;
                    if (fest.AuthorID == null)
                    {
                        fest.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    }
                    fest.URL = string.Format("/Festival/{0}", fest.Name);
                    List<IValidationError> errors = this.Validate<UFestival>(fest);
                    if (fest.EndDate == DateTime.MinValue)
                    {
                        errors.Add(new ValidationError { Fieldname = "EndDate", Message = "The field End date is required but empty." });
                    }
                    if (fest.StartDate == DateTime.MinValue)
                    {
                        errors.Add(new ValidationError { Fieldname = "StartDate", Message = "The field Start date is required but empty." });
                    }
                    if (fest.EndDate < fest.StartDate)
                    {
                        errors.Add(new ValidationError { Fieldname = "EndDate", Message = "The field End date is before start date." });
                    }
                    if (errors.Count() == 0)
                    {
                        fest.Country = null;
                        fest.FestivalLocation = null;
                        fest.Genres = null;
                        fest.Tickets = null;
                        fest.SocialProfiles = null;
                        MediaDirectory album = new MediaDirectory { Created = DateTime.Now, AuthorID = fest.AuthorID, DirectoryID = Guid.NewGuid(), Name = fest.Name, ParentID = Guid.Parse("1c9f99e9-1ff2-4eef-9f94-25b400340fba") };
                        Db.MediaDirectories.Add(album);
                        if (!System.IO.Directory.Exists(FCConfig.MEDIA_ROOT + album.DirectoryID.Value.ToString()))
                        {
                            System.IO.Directory.CreateDirectory(FCConfig.MEDIA_ROOT + album.DirectoryID.Value.ToString());
                        }
                        fest.MediaDirectoryID = album.DirectoryID;
                        Db.Festivals.Add(fest);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = fest.FestivalID, SUCCESS = true, MSG = $"Festival {fest.Name} successfully created." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState ToggleGenre(Guid? festivalID, Guid? genreID)
        {
            try
            {
                List<UGenre> festGenres = new List<UGenre>();
                using (Db = new FC.MSDAL.ContentModel())
                {
                    if (Db.G2F.Where(w => w.GenreID == genreID && w.FestivalID == festivalID).Any())
                    {
                        Db.G2F.Remove(Db.G2F.Where(w => w.GenreID == genreID && w.FestivalID == festivalID).FirstOrDefault());
                    }
                    else
                    {
                        Db.G2F.Add(new UGenre2UFestival { G2FID = Guid.NewGuid(), FestivalID = festivalID, GenreID = genreID });
                    }
                    Db.SaveChanges();
                    festGenres = Db.G2F.Where(w => w.FestivalID == festivalID).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
                }
                return new RepositoryState { AffectedID = festivalID, SUCCESS = true, MSG = $"OK", Data = festGenres };
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState Update(UFestival fest)
        {
            try
            {
                using (Db = new FC.MSDAL.ContentModel())
                {
                    UFestival f = Db.Festivals.Find(fest.FestivalID);
                    if (fest.AuthorID == null)
                    {
                        f.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    }
                    else
                    {
                        f.AuthorID = fest.AuthorID;
                    }
                    if (fest.City != null)
                    {
                        f.City = fest.City;
                    }
                    if (fest.CountryID != null)
                    {
                        f.CountryID = fest.CountryID;
                    }
                    if (fest.ZIPCode != null)
                    {
                        f.ZIPCode = fest.ZIPCode;
                    }
                    f.IsDeleted = false;
                    if (fest.Description != null)
                    {
                        f.Description = fest.Description;
                    }
                    if (fest.EndDate != null && fest.EndDate.Year > 2000)
                    {
                        f.EndDate = fest.EndDate;
                    }
                    if (fest.IndoorOutdoor != null)
                    {
                        f.IndoorOutdoor = fest.IndoorOutdoor;
                    }
                    f.IsPublished = fest.IsPublished;
                    if (fest.IsSoldOut != null)
                    {
                        f.IsSoldOut = fest.IsSoldOut;
                    }
                    if (fest.LogoID != null)
                    {
                        f.LogoID = fest.LogoID;
                    }
                    if (fest.MetaDescription != null)
                    {
                        f.MetaDescription = fest.MetaDescription;
                    }
                    if (fest.MetaKeys != null)
                    {
                        f.MetaKeys = fest.MetaKeys;
                    }

                    f.ModifiedDate = DateTime.Now;
                    if (fest.Name != null)
                    {
                        f.Name = fest.Name;
                    }
                    if (fest.StartDate != null && fest.StartDate.Year > 2000)
                    {
                        f.StartDate = fest.StartDate;
                        f.OrderDate = fest.StartDate.Ticks;
                    }
                    if (fest.FestivalLocationID != null)
                    {
                        f.FestivalLocationID = fest.FestivalLocationID;
                    }
                    if (fest.ProfileImageID != null)
                    {
                        f.ProfileImageID = fest.ProfileImageID;
                    }
                    if (fest.Name != null)
                    {
                        f.URL = string.Format("/Festival/{0}", fest.Name);
                        f.Title = fest.Name;
                    }
                    if (fest.Visitors != null)
                    {
                        f.Visitors = fest.Visitors;
                    }
                    if (fest.Tickets != null)
                    {
                        if (fest.Tickets.Count > 0)
                        {
                            Db.T2F.RemoveRange(Db.T2F.Where(w => w.FestivalID == fest.FestivalID));
                            foreach (Ticket t in fest.Tickets)
                            {
                                Db.T2F.Add(new Ticket2Festival() { T2FID = Guid.NewGuid(), FestivalID = fest.FestivalID, TicketID = t.TicketID });
                            }
                        }
                    }
                    if (fest.SocialProfiles != null)
                    {
                        if (fest.SocialProfiles.Count > 0)
                        {
                            Db.SocialProfiles.RemoveRange(Db.SocialProfiles.Where(w => w.GenericID == fest.FestivalID));
                            foreach (SocialProfile p in fest.SocialProfiles)
                            {
                                p.SocialProfileID = Guid.NewGuid();
                                p.GenericID = fest.FestivalID;
                                p.ContentType = Shared.Enum.SocialMediaBindableType.Festival;
                                p.ProfileTypeID = p.ProfileType.SocialProfileTypeID;
                                p.ProfileType = null;
                                Db.SocialProfiles.Add(p);
                            }
                        }
                    }

                    if (fest.Genres != null)
                    {
                        if (fest.Genres.Count > 0)
                        {
                            Db.G2F.RemoveRange(Db.G2F.Where(w => w.FestivalID == fest.FestivalID));
                            List<UGenre2UFestival> g2f = (from g in fest.Genres select new UGenre2UFestival { G2FID = Guid.NewGuid(), FestivalID = fest.FestivalID, GenreID = g.GenreID }).ToList();
                            Db.G2F.AddRange(g2f);
                        }
                    }
                    List<IValidationError> errors = this.Validate<UFestival>(f);

                    if (fest.EndDate < fest.StartDate)
                    {
                        errors.Add(new ValidationError { Fieldname = "EndDate", Message = "End date is before start date" });
                    }
                    if (fest.EndDate == DateTime.MinValue)
                    {
                        errors.Add(new ValidationError { Fieldname = "EndDate", Message = "The field End date is required but empty." });
                    }
                    if (fest.StartDate == DateTime.MinValue)
                    {
                        errors.Add(new ValidationError { Fieldname = "StartDate", Message = "The field Start date is required but empty." });
                    }
                    if (errors.Count() == 0)
                    {
                        f.Album = null;
                        f.Genres = null;
                        f.Country = null;
                        f.FestivalLocation = null;
                        if (f.MediaDirectoryID == null)
                        {
                            MediaDirectory md = new MediaDirectory { AuthorID = fest.AuthorID, DirectoryID = Guid.NewGuid(), Name = fest.Name, Created = DateTime.Now, ParentID = FCConfig.FestivalMediaDir };
                            f.MediaDirectoryID = md.DirectoryID;
                            Db.MediaDirectories.Add(md);
                        }
                        else if (Db.MediaDirectories.Find(f.MediaDirectoryID) == null)
                        {
                            MediaDirectory md = new MediaDirectory { AuthorID = fest.AuthorID, DirectoryID = Guid.NewGuid(), Name = fest.Name, Created = DateTime.Now, ParentID = FCConfig.FestivalMediaDir };
                            f.MediaDirectoryID = md.DirectoryID;
                            Db.MediaDirectories.Add(md);
                        }
                        else
                        {
                            MediaDirectory md = Db.MediaDirectories.Find(f.MediaDirectoryID);
                            md.Name = f.Name;
                            Db.Entry<MediaDirectory>(md).State = System.Data.Entity.EntityState.Modified;
                        }
                        Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Modified;
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = fest.FestivalID, SUCCESS = true, MSG = $"Festival {fest.Name} successfully modified." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState Delete(UFestival fest)
        {
            try
            {
                using (Db = new FC.MSDAL.ContentModel())
                {
                    UFestival f = Db.Festivals.Find(fest.FestivalID);
                    f.IsDeleted = true;
                    f.IsPublished = false;
                    f.ModifiedDate = DateTime.Now;
                    f.ArchiveDate = DateTime.Now.AddDays(180);
                    f.Album = null;
                    f.Genres = null;
                    f.Country = null;
                    f.StageList = null;

                    f.FestivalLocation = null;
                    Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                }
                return new RepositoryState { AffectedID = fest.FestivalID, SUCCESS = true, MSG = $"Festival {fest.Name} successfully deleted." };
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState ForceDelete(UFestival fest)
        {
            try
            {
                using (Db = new FC.MSDAL.ContentModel())
                {
                    Db.T2F.RemoveRange(Db.T2F.Where(w => w.FestivalID == fest.FestivalID));
                    Db.A2F.RemoveRange(Db.A2F.Where(w => w.FestivalID == fest.FestivalID));
                    Db.G2F.RemoveRange(Db.G2F.Where(w => w.FestivalID == fest.FestivalID));
                    UFestival f = Db.Festivals.Find(fest.FestivalID);
                    f.CountryID = null;
                    Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Deleted;
                    Db.SaveChanges();
                }
                return new RepositoryState { AffectedID = fest.FestivalID, SUCCESS = true, MSG = $"Festival {fest.Name} successfully deleted with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }
    }
}


//if (filter.GenreIDs.Count() > 0 && filter.CountryIDs.Count() == 0)
//{
//    result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum).ToList();
//    foreach (UFestival f in result)
//    {
//        UFestival tmp = f;
//        tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
//        if (tmp.Genres.Select(s => s).Where(w => filter.GenreIDs.Contains(w.GenreID)).Any())
//        {
//            tmpList.Add(tmp);
//        }
//    }
//}
//else if (filter.GenreIDs.Count() > 0 && filter.CountryIDs.Count() > 0)
//{
//    result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum && filter.CountryIDs.Contains(w.CountryID)).ToList();
//    foreach (UFestival f in result)
//    {
//        UFestival tmp = f;
//        tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
//        if (tmp.Genres.Select(s => s).Where(w => filter.GenreIDs.Contains(w.GenreID)).Any())
//        {
//            tmpList.Add(tmp);
//        }
//    }
//}
//else if (filter.GenreIDs.Count() == 0 && filter.CountryIDs.Count() > 0)
//{
//    result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum && filter.CountryIDs.Contains(w.CountryID)).ToList();
//    foreach (UFestival f in result)
//    {
//        UFestival tmp = f;
//        tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
//        tmpList.Add(tmp);
//    }
//}
//else if (filter.GenreIDs.Count() == 0 && filter.CountryIDs.Count() == 0)
//{
//    if (filter.MonthNum == 0 || filter.YearNum == 0)
//    {
//        throw new Exception("Invalid year or month specified");
//    }
//    else
//    {
//        result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum).ToList();
//        foreach (UFestival f in result)
//        {
//            UFestival tmp = f;
//            tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
//            tmpList.Add(tmp);
//        }
//    }
//}
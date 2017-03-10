using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.PGDAL.Migrations;
using FC.Shared.Config;
using FC.Shared.Entities;
using FC.Shared.ServerMessages;
using FC.Shared.ViewModels.Date;
using FC.Shared.ViewModels.Festival;
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

            using (Db = new PGDAL.PGModel.ContentModel()) {
                festivals = Db.Festivals.OrderBy(o => o.Name).ToList();
            }

            return festivals;
        }

        public List<UFestival> GetAllWithGenres()
        {
            List<UFestival> festivals;

            using (Db = new PGDAL.PGModel.ContentModel()) {
                festivals = Db.Festivals.OrderBy(o => o.StartDate).Take(1000).ToList();
                foreach (UFestival f in festivals)
                {
                    f.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
                }
            }

            return festivals;
        }

        public List<UFestival> GetList(int month=0, int year=0, string genres="")
        {
            List<Guid> gids = new List<Guid>();
            List<UFestival> result = new List<UFestival>();
            using (Db = new PGDAL.PGModel.ContentModel())
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
                    f.StartDateExplosion = new DateVM(f.StartDate);
                    f.EndDateExplosion = new DateVM(f.EndDate);

                    if (f.Country == null)
                    {
                        f.Country = Db.Countries.Find(f.CountryID);
                    }
                }
            }
            return result.OrderBy(o => o.StartDate).ToList();
        }

        public UFestival GetByID(Guid? id)
        {
            UFestival f;
            using (Db = new PGDAL.PGModel.ContentModel())
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

        public List<FestivalVM> GetFilteredFestival(FC.Shared.ServerMessages.FestivalFilter filter)
        {
            List<UFestival> result = new List<UFestival>();
            List<UFestival> tmpList = new List<UFestival>();
            List<FestivalVM> vmResult = new List<FestivalVM>();
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                if (filter.CountryIDs == null)
                {
                    filter.CountryIDs = new List<Guid?>();
                }
                if (filter.GenreIDs == null)
                {
                    filter.GenreIDs = new List<Guid?>();
                }
                if (filter.GenreIDs.Count() > 0 && filter.CountryIDs.Count() == 0)
                {
                    result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum).ToList();
                    foreach (UFestival f in result)
                    {
                        UFestival tmp = f;
                        tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
                        if (tmp.Genres.Select(s => s).Where(w => filter.GenreIDs.Contains(w.GenreID)).Any())
                        {
                            tmpList.Add(tmp);
                        }
                    }
                }
                else if (filter.GenreIDs.Count() > 0 && filter.CountryIDs.Count() > 0)
                {
                    result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum && filter.CountryIDs.Contains(w.CountryID)).ToList();
                    foreach (UFestival f in result)
                    {
                        UFestival tmp = f;
                        tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
                        if (tmp.Genres.Select(s => s).Where(w => filter.GenreIDs.Contains(w.GenreID)).Any())
                        {
                            tmpList.Add(tmp);
                        }
                    }
                }
                else if (filter.GenreIDs.Count() == 0 && filter.CountryIDs.Count() > 0)
                {
                    result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum && filter.CountryIDs.Contains(w.CountryID)).ToList();
                    foreach (UFestival f in result)
                    {
                        UFestival tmp = f;
                        tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
                        tmpList.Add(tmp);
                    }
                }
                else if (filter.GenreIDs.Count() == 0 && filter.CountryIDs.Count() == 0)
                {
                    if (filter.MonthNum == 0 || filter.YearNum == 0)
                    {
                        throw new Exception("Invalid year or month specified");
                    }
                    else
                    {
                        result = Db.Festivals.Where(w => w.StartDate.Month == filter.MonthNum && w.StartDate.Year == filter.YearNum).ToList();
                        foreach (UFestival f in result)
                        {
                            UFestival tmp = f;
                            tmp.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).ToList();
                            tmpList.Add(tmp);
                        }
                    }
                }
                else
                {
                    throw new Exception("Cannot filter festivals because none of the filter parameters was specified.");
                }
                vmResult = (from f in tmpList.OrderBy(o => o.StartDate) select new FestivalVM(f)).ToList();
            }
            return vmResult.OrderBy(o => o.StartDateExplosion.Day).ThenBy(o=>o.StartDateExplosion.Month).ThenBy(o=>o.StartDateExplosion.Y4).ToList();
        }

        public List<FestivalVM> Search(string keyword)
        {
            keyword = keyword.ToLower();
            List<UFestival> result = new List<UFestival>();
            List<UFestival> ret = new List<UFestival>();
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                result.AddRange(Db.A2F.Where(w => w.Artist.Name.ToLower().Contains(keyword)).Select(s => s.Festival));
                result.AddRange(Db.G2F.Include("Genres").Where(w => w.Festival.Name.ToLower().Contains(keyword) || w.Festival.Country.Name.ToLower().Contains(keyword) || w.Festival.City.Contains(keyword) || w.Genre.Name.ToLower().Contains(keyword)).Select(s => s.Festival));
                foreach (UFestival f in result)
                {
                    f.Genres = Db.G2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
                    ret.Add(f);
                }
            }
            return ret.Distinct().Select(s => new FestivalVM(s)).OrderBy(o => o.OrderDate).ToList();
        }
        

        public RepositoryState Create(UFestival fest)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    List<UFestival> tmpList = Db.Festivals.Where(w => w.CountryID == fest.CountryID).Take(1000).ToList();


                    if (!tmpList.Where(w => w.Name.ToLower() == fest.Name.ToLower() && w.StartDate.Year == fest.StartDate.Year && w.StartDate.Month == fest.StartDate.Month && w.StartDate.Day == fest.StartDate.Day).Any())
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
                    else
                    {
                        return new RepositoryState { EXISTS = true, MSG = $"Festival {fest.Name} already exists." };
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

        public RepositoryState Update(UFestival fest)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
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
                    f.City = fest.City;
                    f.CountryID = fest.CountryID;
                    f.IsDeleted = false;
                    f.Description = fest.Description;
                    f.EndDate = fest.EndDate;
                    f.IndoorOutdoor = fest.IndoorOutdoor;
                    f.IsPublished = false;
                    f.IsSoldOut = fest.IsSoldOut;
                    f.LogoID = fest.LogoID;
                    f.MetaDescription = fest.MetaDescription;
                    f.MetaKeys = fest.MetaKeys;
                    f.ModifiedDate = DateTime.Now;
                    f.Name = fest.Name;
                    f.StartDate = fest.StartDate;
                    f.OrderDate = fest.StartDate.Ticks;
                    f.FestivalLocationID = fest.FestivalLocationID;
                    f.ProfileImageID = fest.ProfileImageID;
                    f.URL = string.Format("/Festival/{0}", fest.Name);
                    f.Visitors = fest.Visitors;
                    f.Title = fest.Name;


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
                using (Db = new PGDAL.PGModel.ContentModel()) { 
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
                using (Db = new PGDAL.PGModel.ContentModel())
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

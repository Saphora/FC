using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Entities;
using FC.Shared.ViewModels;
using System.Data.Entity.Validation;
using FC.BL.Validation;
using FC.Interfaces.Data;

namespace FC.BL.Repositories
{
    public class LocationRepository : BaseRepository
    {
        public LocationRepository() : base()
        {}


        public List<Location> GetSorted(Guid? countryID, string search = "0-9", int page = 1)
        {
            List<Location> result = new List<Location>();
            IQueryable<Location> query = Db.Locations;
            if (search == "0-9")
            {
                query = Db.Locations.Where(w => (w.LocationName.StartsWith("0") ||
                w.LocationName.StartsWith("0") ||
                w.LocationName.StartsWith("1") ||
                w.LocationName.StartsWith("2") ||
                w.LocationName.StartsWith("3") ||
                w.LocationName.StartsWith("4") ||
                w.LocationName.StartsWith("5") ||
                w.LocationName.StartsWith("6") ||
                w.LocationName.StartsWith("7") ||
                w.LocationName.StartsWith("8") ||
                w.LocationName.StartsWith("9") ||
                w.LocationName.StartsWith("a") ||
                w.LocationName.StartsWith("A")) && w.CountryID == countryID && w.IsDeleted==false);
            }
            else
            {
                query = Db.Locations.Where(w => w.LocationName.ToLower().StartsWith(search) && w.IsDeleted == false);
            }
            if(countryID != null)
            {
                query = query.Where(w => w.CountryID == countryID && w.IsDeleted == false);
            }
            result = query.OrderBy(o => o.LocationName).Skip((page-1)*50).Take(50).ToList();

            if(result.Count() == 0 && Db.Locations.Count() <= 50 && search == "0-9")
            {
                if(countryID != null)
                {
                    result = Db.Locations.Where(w => w.CountryID == countryID && w.IsDeleted == false).OrderBy(o => o.LocationName).ToList();
                } else
                {
                    result = Db.Locations.OrderBy(o => o.LocationName).Where(w => w.IsDeleted == false).ToList();
                }
            }

            return result;
        }

        public int GetPagedCount(Guid? countryID, int page, string search)
        {
            int result = 0;
            IQueryable<Location> query = Db.Locations;
            if (search == "0-9")
            {
                query = Db.Locations.Where(w => (w.LocationName.StartsWith("0") ||
                w.LocationName.StartsWith("0") ||
                w.LocationName.StartsWith("1") ||
                w.LocationName.StartsWith("2") ||
                w.LocationName.StartsWith("3") ||
                w.LocationName.StartsWith("4") ||
                w.LocationName.StartsWith("5") ||
                w.LocationName.StartsWith("6") ||
                w.LocationName.StartsWith("7") ||
                w.LocationName.StartsWith("8") ||
                w.LocationName.StartsWith("9") ||
                w.LocationName.StartsWith("a") ||
                w.LocationName.StartsWith("A")) && w.CountryID == countryID && w.IsDeleted == false);
            }
            else
            {
                query = Db.Locations.Where(w => w.LocationName.StartsWith(search) && w.IsDeleted == false);
            }
            if (countryID != null)
            {
                query = query.Where(w => w.CountryID == countryID && w.IsDeleted == false);
            }
            result = query.OrderBy(o => o.LocationName).Skip((page-1) * 50).Take(50).Count();
            return result;
        }

        public decimal GetPageCount(int size)
        {
            Decimal d = new Decimal((float)Db.Locations.Count() / (float)size);
            return Math.Ceiling(d) - 1;
        }

        public List<Location> GetPaged(int size, int page)
        {
            List<Location> result = new List<Location>();
            int from = 0;
            if (page == 1)
            {
                from = 0;
            }
            else if (page > 1 && page <= GetPageCount(size))
            {
                from = size * page - 1;
            }
            result = Db.Locations.Where(w => w.IsDeleted == false).OrderBy(o => o.LocationName).Skip(from).Take(size).ToList();
            return result;
        }

        public IQueryable<Location> GetAll()
        {
            return Db.Locations.Where(w => w.IsDeleted == false).OrderBy(o => o.LocationName);
        }

        public Location GetByID(Guid? id)
        {
            Location l = Db.Locations.Find(id);
            return l;
        }


        public Location GetByFestivalID(Guid? id)
        {
            UFestival f = Db.Festivals.Find(id);
            if (f.FestivalLocation != null)
            {
                return f.FestivalLocation;
            }
            else
            {
                return null;
            }
        }

        public List<Location> GetByCountryID(Guid? id)
        {
            return this.GetAll().Where(w => w.CountryID == id).ToList();
        }

        public RepositoryState Create(Location l)
        {
            Guid? dirID = null;
            MediaRepository r = new MediaRepository();
            try
            {
                List<IValidationError> errors = this.Validate<Location>(l);
                if (errors.Count == 0)
                {
                    l.LocationID = Guid.NewGuid();
                    l.Created = DateTime.Now;
                    l.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    l.Country = null;
                    l.MediaDirectoryID = Guid.NewGuid();
                    dirID = l.MediaDirectoryID;
                    RepositoryState state = r.CreateMediaDirectory(new Shared.ServerMessages.MediaDirectoryMsg { DirectoryID = l.MediaDirectoryID, DirectoryName = l.LocationName, ParentID = Guid.Parse("CE18DC4F-2F58-4DC0-8AF8-C6DA53601904"), Author = AuthorizationRepository.Current.CurrentUser.UserID.ToString() });
                    if (state.SUCCESS)
                    {
                        Db.Locations.Add(l);
                        if (l.Social != null)
                        {
                            foreach (SocialProfile s in l.Social)
                            {
                                s.GenericID = l.LocationID;
                                s.ContentType = Shared.Enum.SocialMediaBindableType.Location;
                                Db.SocialProfiles.Add(s);
                            }
                        }
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = l.LocationID, SUCCESS = true, MSG = $"Location {l.LocationName} successfully created." };
                    }
                    else
                    {
                        return state;
                    }
                } else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch(DbEntityValidationException e)
            {
                if(dirID != null)
                {
                    r.ForceDeleteDirectory(dirID);  
                }
                return this.HandleException(e, "Location not created. Please try again later.");
            }
            catch (Exception e)
            {
                if (dirID != null)
                {
                    r.ForceDeleteDirectory(dirID);
                }
                return this.HandleException(e, "Location not created. Please try again later.");
            }
        }


        public RepositoryState Update(Location l)
        {
            try
            {
                Location location = Db.Locations.Find(l.LocationID);
                location.Address = l.Address;
                location.Album = l.Album;
                location.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                location.CountryID = l.CountryID;
                location.Email = l.Email;
                location.LocationName = l.LocationName;
                location.MapsURL = l.MapsURL;
                location.Phone = l.Phone;
                location.ProfileImageID = l.ProfileImageID;
                location.ThumbnailID = l.ThumbnailID;
                location.Website = l.Website;
                location.ZIPCode = l.ZIPCode;

                if (l.Social != null)
                {

                    Db.SocialProfiles.RemoveRange(Db.SocialProfiles.Where(w => w.GenericID == l.LocationID));
                    foreach (SocialProfile s in l.Social)
                    {
                        s.SocialProfileID = Guid.NewGuid();
                        s.GenericID = location.LocationID;
                        s.ContentType = Shared.Enum.SocialMediaBindableType.Location;
                        Db.SocialProfiles.Add(s);
                    }
                }

                List<IValidationError> errors = this.Validate<Location>(l);
                if (errors.Count == 0)
                {
                    location.Album = null;
                    Db.Entry<Location>(location).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState { AffectedID = l.LocationID, SUCCESS = true, MSG = $"Location {l.LocationName} successfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException e)
            {
                return this.HandleException(e);
            }
            catch (Exception e)
            {
                return this.HandleException(e);
            }
        }

        public RepositoryState Delete(Location l)
        {
            try
            {
                Location loc = Db.Locations.Find(l.LocationID);
                loc.IsDeleted = true;
                loc.ArchiveDate = DateTime.Now.AddDays(180);
                Db.SaveChanges();
                return new RepositoryState { AffectedID = l.LocationID, SUCCESS = true, MSG = $"Location {l.LocationName} successfully removed." };
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot delete location {l.LocationName}.");
            }
        }

        public RepositoryState ForceDelete(Location l)
        {
            try
            {
                List<UFestival> festivals = Db.Festivals.Where(w => w.FestivalLocationID == l.LocationID).ToList();
                foreach(UFestival f in festivals)
                {
                    f.FestivalLocationID = null;
                    Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Modified;
                }
                Location loc = Db.Locations.Find(l.LocationID);
                Db.Locations.Remove(loc);
                Db.SaveChanges();
                return new RepositoryState { AffectedID = l.LocationID, SUCCESS = true, MSG = $"Location {l.LocationName} successfully removed with force." };
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot delete location {l.LocationName}.");
            }
        }
    }
}

using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using System.Data.Entity.Validation;
using FC.BL.Validation;
using FC.Interfaces.Data;

namespace FC.BL.Repositories
{
    public class CountryRepository : BaseRepository
    {
        public CountryRepository() : base()
        { }

        public UCountry GetByID(Guid? id)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                return Db.Countries.Find(id);
            }
        }

        public List<UCountry> GetAll()
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                return Db.Countries.OrderBy(o => o.Name).ToList();
            }
        }

        public List<Guid?> GetAllIds()
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                return Db.Countries.OrderBy(o => o.Name).Select(s => s.CountryID).ToList();
            }
        }

        public UCountry GetByCode(string code)
        {
            if(code.Length > 3)
            {
                throw new Exception("Country code format does not match against two letter ISO region name (ISO 3166)");
            } else
            {
                try
                {
                    using (Db = new PGDAL.PGModel.ContentModel())
                    {
                        RegionInfo info = new RegionInfo(code.ToUpper());
                        if (info != null)
                        {
                            return Db.Countries.ToList().Where(w => w.CultureIsoName.Split('-').Last().ToLower() == code.ToLower()).FirstOrDefault();
                        }
                    }
                } catch(Exception ex)
                {
                    return null;
                }
            }
            return null;
        }
        
        public UCountry GetByCultureName(string cultureName)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                return Db.Countries.Where(w => w.CultureIsoName == cultureName).FirstOrDefault();
            }
        }

        public List<UCountry> Search(string name)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                return Db.Countries.Where(w => w.Name.ToLower().Contains(name)).OrderBy(o => o.Name).Take(10).ToList();
            }
        }

        public RepositoryState Create(UCountry country)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    if (!Db.Countries.Where(w => w.Name == country.Name).Any())
                    {
                        country.CountryID = Guid.NewGuid();

                        List<IValidationError> errors = this.Validate<UCountry>(country);
                        if (errors.Count() == 0)
                        {
                            Db.Countries.Add(country);
                            Db.SaveChanges();
                            return new RepositoryState { AffectedID = country.CountryID, SUCCESS = true, MSG = $"Country {country.Name} successfully created." };
                        }
                        else
                        {
                            return this.HandleValidationErrors(errors);
                        }
                    }
                    else
                    {
                        return new RepositoryState { EXISTS = true, MSG = $"Country {country.Name} already exists." };
                    }
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState Update(UCountry country)
        {
            try
            {

                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    UCountry c = Db.Countries.Find(country.CountryID);

                    c.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    c.Currency = country.Currency;
                    c.CultureIsoName = country.CultureIsoName;
                    c.IsPublished = false;
                    c.LanguageName = country.LanguageName;
                    c.ModifiedDate = DateTime.Now;
                    c.Name = country.Name;

                    List<IValidationError> errors = this.Validate<UCountry>(c);
                    if (errors.Count() == 0)
                    {
                        Db.Entry<UCountry>(country).State = System.Data.Entity.EntityState.Modified;
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = country.CountryID, SUCCESS = true, MSG = $"Country {c.Name} successfully modified." };
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
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState Delete(UCountry country)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    UCountry c = Db.Countries.Find(country.CountryID);
                    c.ArchiveDate = DateTime.Now.AddDays(180);
                    c.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    c.IsPublished = false;
                    c.ModifiedDate = DateTime.Now;
                    c.IsDeleted = true;
                    Db.Entry<UCountry>(country).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState { AffectedID = country.CountryID, SUCCESS = true, MSG = $"Country {c.Name} successfully modified." };
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

        public RepositoryState ForceDelete(UCountry country)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    if (Db.Festivals.Where(w => w.CountryID == country.CountryID).Any() || Db.Artists.Where(w => w.CountryID == country.CountryID).Any())
                    {
                        return new RepositoryState() { ERROR = true, MSG = "There are festivals and artists depending on this country. Please modify these first." };
                    }
                    else
                    {
                        UCountry c = Db.Countries.Find(country.CountryID);
                        Db.Countries.Remove(c);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = country.CountryID, SUCCESS = true, MSG = $"Country {c.Name} successfully modified." };
                    }
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }

    }
}

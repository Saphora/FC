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
    public class ResellerRepository : BaseRepository
    {
        public ResellerRepository() : base()
        { }

        public List<Reseller> GetAll()
        {
            return Db.Resellers.Where(w => w.IsDeleted == false).OrderBy(o => o.Name).ToList();
        }

        public List<Reseller> GetByTypeID(Guid? resellertTypeID)
        {
            return Db.Resellers.Where(w => w.ResellerTypeID == resellertTypeID).OrderBy(o => o.Name).ToList();
        }

        public Reseller GetByID(Guid? resellerID)
        {
            return Db.Resellers.Find(resellerID);
        }

        public List<Product> GetResellerProducts(Guid? resellerID)
        {
            return Db.PROD2RES.Where(w => w.ResellerID == resellerID).Select(s => s.Product).OrderBy(o => o.Name).ToList();
        }


        public List<Ticket> GetResellerTickets(Guid? resellerID)
        {
            return Db.T2R.Where(w => w.ResellerID == resellerID).Select(s => s.Ticket).OrderBy(o => o.Name).ToList();
        }

        public RepositoryState Create(Reseller r)
        {
            try
            {
                List<IValidationError> errors = new List<IValidationError>();

                r.Created = DateTime.Now;
                r.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                r.ResellerID = Guid.NewGuid();
                if (errors.Count == 0)
                {
                    Db.Resellers.Add(r);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Reseller {r.Name} successfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create reseller {r.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create reseller {r.Name}. Please try again later.");
            }
        }

        public RepositoryState Update(Reseller r)
        {
            try
            {
                List<IValidationError> errors = new List<IValidationError>();
                Reseller dbres = Db.Resellers.Find(r.ResellerID);

                dbres.AlbumID = r.AlbumID;
                dbres.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                dbres.Contactemail = r.Contactemail;
                dbres.Contactname = r.Contactname;
                dbres.InternalUserID = r.InternalUserID;
                dbres.Modified = DateTime.Now;
                dbres.Name = r.Name;
                dbres.ProfileImageID = r.ProfileImageID;
                dbres.QueryString = r.QueryString;
                dbres.ResellerTypeID = r.ResellerTypeID;
                dbres.ThumbnailID = r.ThumbnailID;
                dbres.Website = r.Website;
                dbres.Created = DateTime.Now;
                dbres.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;

                if (errors.Count == 0)
                {
                    Db.Resellers.Add(r);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Reseller {r.Name} successfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create reseller {r.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create reseller {r.Name}. Please try again later.");
            }
        }

        public RepositoryState Delete(Reseller r)
        {
            try
            {
                Reseller dbRes = Db.Resellers.Find(r.ResellerID);
                dbRes.IsDeleted = true;
                dbRes.ArchiveDate = DateTime.Now.AddDays(180);
                Db.Entry<Reseller>(dbRes).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                return new RepositoryState { SUCCESS = true, MSG = $"Reseller {r.Name} successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove reseller {r.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove reseller {r.Name}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(Reseller r)
        {
            try
            {
                Db.T2R.RemoveRange(Db.T2R.Where(w => w.ResellerID == r.ResellerID));
                Db.PROD2RES.RemoveRange(Db.PROD2RES.Where(w => w.ResellerID == r.ResellerID));
                Reseller dbRes = Db.Resellers.Find(r.ResellerID);
                Db.Resellers.Remove(dbRes);
                Db.SaveChanges();
                return new RepositoryState { SUCCESS = true, MSG = $"Reseller {r.Name} successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove reseller {r.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove reseller {r.Name}. Please try again later.");
            }
        }
    }
}

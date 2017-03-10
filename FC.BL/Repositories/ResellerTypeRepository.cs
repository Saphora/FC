using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class ResellerTypeRepository: BaseRepository
    {
        public ResellerTypeRepository() : base()
        { }

        public RepositoryState Create(ResellerType t)
        {
            try
            {
                t.ResellerTypeID = Guid.NewGuid();
                t.Created = DateTime.Now;
                t.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                List<IValidationError> errors = this.Validate<ResellerType>(t);
                if (errors.Count == 0)
                {
                    Db.ResellerTypes.Add(t);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Type {t.Name} successfully created." };
                } else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create type {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create type {t.Name}. Please try again later.");
            }
        }

        public RepositoryState Update(ResellerType t)
        {
            try
            {
                ResellerType tmp = Db.ResellerTypes.Find(t);
                tmp.Name = t.Name;
                tmp.Description = t.Description;
                tmp.Modified = DateTime.Now;
                tmp.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;

                List<IValidationError> errors = this.Validate<ResellerType>(t);
                if (errors.Count == 0)
                {
                    Db.Entry<ResellerType>(t).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Type {t.Name} successfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify type {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify type {t.Name}. Please try again later.");
            }
        }

        public RepositoryState Delete(ResellerType t)
        {
            try
            {
                ResellerType tmp = Db.ResellerTypes.Find(t);
                tmp.IsDeleted = true;
                tmp.ArchiveDate = DateTime.Now.AddDays(180);
                tmp.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;

                List<IValidationError> errors = this.Validate<ResellerType>(t);
                if (errors.Count == 0)
                {
                    Db.Entry<ResellerType>(t).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Type {t.Name} successfully removed." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove type {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove type {t.Name}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(ResellerType t)
        {
            try
            {
                List<Reseller> resellers = Db.Resellers.Where(w => w.ResellerTypeID == t.ResellerTypeID).ToList();
                foreach(Reseller r in resellers)
                {
                    r.ResellerTypeID = Guid.Parse("AE10EDB2-2942-421E-A381-33C573C0D99A");
                    Db.Entry<Reseller>(r).State = System.Data.Entity.EntityState.Modified;
                }
                ResellerType tmp = Db.ResellerTypes.Find(t.ResellerTypeID);

                Db.ResellerTypes.Remove(tmp);
                Db.SaveChanges();

                return new RepositoryState { SUCCESS = true, MSG = $"Type {t.Name} successfully removed with force." };
                
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove type {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove type {t.Name}. Please try again later.");
            }
        }
    }
}

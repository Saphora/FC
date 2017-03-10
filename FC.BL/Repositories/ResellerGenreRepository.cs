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
    public class ResellerGenreRepository : BaseRepository
    {
        public ResellerGenreRepository():base()
        { }

        public List<ResellerGenre> GetByReseller(Guid? resellerID)
        {
            Reseller r = Db.Resellers.Find(resellerID);
            return Db.RG2GT.Where(w => w.ResellerTypeID == r.ResellerTypeID).Select(s => s.Genre).OrderBy(o => o.GenreName).ToList();
        }


        public List<ResellerGenre> GetAll()
        {
            return Db.ResellerGenres.Where(w => w.IsDeleted == false).OrderBy(o => o.GenreName).ToList();
        }

        public ResellerGenre GetByID(Guid? id)
        {
            return Db.ResellerGenres.Find(id);
        }

        public RepositoryState Create(Guid? resellerTypeID, ResellerGenre g)
        {
            try
            {
                List<IValidationError> errors = this.Validate<ResellerGenre>(g);
                if(errors.Count == 0)
                {
                    g.ResellerGenreID = Guid.NewGuid();
                    g.Created = DateTime.Now;
                    g.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    Db.ResellerGenres.Add(g);
                    Db.RG2GT.Add(new ResellerGenre2ResellerType { RG2RTID = Guid.NewGuid(), ResellerGenreID = g.ResellerGenreID, ResellerTypeID = resellerTypeID });
                    return new RepositoryState() { SUCCESS = true, MSG = $"Genre {g.GenreName} successfully created." };
                } else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create genre {g.GenreName}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create genre {g.GenreName}. Please try again later.");
            }
        }

        public RepositoryState Update(ResellerGenre g)
        {
            try
            {
                g.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                g.Modified = DateTime.Now;
                g.Description = g.Description;
                g.GenreName = g.GenreName;
                List<IValidationError> errors = this.Validate<ResellerGenre>(g);
                if(errors.Count == 0)
                {
                    Db.Entry<ResellerGenre>(g).State = System.Data.Entity.EntityState.Modified;
                    return new RepositoryState() { SUCCESS = true, MSG = $"Genre {g.GenreName} successfully modified." };
                } else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify genre {g.GenreName}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify genre {g.GenreName}. Please try again later.");
            }
        }


        public RepositoryState Delete(ResellerGenre g)
        {
            try
            {
                ResellerGenre tmp = Db.ResellerGenres.Find(g);
                tmp.IsDeleted = true;
                tmp.ArchiveDate = DateTime.Now.AddDays(180);
                Db.Entry<ResellerGenre>(g).State = System.Data.Entity.EntityState.Modified;

                return new RepositoryState() { SUCCESS = true, MSG = $"Genre {g.GenreName} successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove genre {g.GenreName}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove genre {g.GenreName}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(ResellerGenre g)
        {
            try
            {
                Db.RG2GT.RemoveRange(Db.RG2GT.Where(w => w.ResellerGenreID == g.ResellerGenreID));
                Db.ResellerGenres.Remove(Db.ResellerGenres.Find(g.ResellerGenreID));
               
                return new RepositoryState() { SUCCESS = true, MSG = $"Genre {g.GenreName} successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove genre {g.GenreName}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove genre {g.GenreName}. Please try again later.");
            }
        }
    }
}

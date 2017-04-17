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
    public class StageRepository : BaseRepository
    {
        public StageRepository() : base()
        { }

        public List<Stage> GetAll(Guid? festivalID)
        {
            List<Stage> result;

            using (Db = new FC.MSDAL.ContentModel())
            {
                result = Db.Stages.Where(w=>w.FestivalID == festivalID).OrderBy(o=>o.Name).ToList();
            }
            return result;
        }
        

        public Stage GetByID(Guid? id)
        {
            Stage result;

            using (Db = new FC.MSDAL.ContentModel())
            {
               result = Db.Stages.Find(id);
            }
            return result;
        }

        public RepositoryState Create(Stage t)
        {
            using (Db = new FC.MSDAL.ContentModel())
            {
                try
                {
                    t.StageID = Guid.NewGuid();
                    t.Created = DateTime.Now;
                    t.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    List<IValidationError> errors = this.Validate<Stage>(t);
                    if (errors.Count == 0)
                    {
                        Db.Stages.Add(t);
                        Db.SaveChanges();
                        return new RepositoryState() { AffectedID = t.StageID, SUCCESS = true, MSG = $"Stage {t.Name} successfully created." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, $"Cannot create Stage {t.Name}. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, $"Cannot create Stage {t.Name}. Please try again later.");
                }
            }
        }

        public RepositoryState Update(Stage t)
        {
            using (Db = new FC.MSDAL.ContentModel())
            {
                try
                {
                    Stage tmp = Db.Stages.Find(t.StageID);

                    tmp.Modified = DateTime.Now;
                    tmp.Name = t.Name;
                    tmp.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    tmp.Modified = DateTime.Now;

                    List<IValidationError> errors = this.Validate<Stage>(t);
                    if (errors.Count == 0)
                    {
                        Db.Entry<Stage>(t).State = System.Data.Entity.EntityState.Modified;
                        Db.SaveChanges();
                        return new RepositoryState() { AffectedID = t.StageID, SUCCESS = true, MSG = $"Stage {t.Name} successfully modified." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, $"Cannot modify Stage {t.Name}. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, $"Cannot modify Stage {t.Name}. Please try again later.");
                }
            }
        }


        public RepositoryState Delete(Stage t)
        {
            using (Db = new FC.MSDAL.ContentModel())
            {
                try
                {
                    Stage tmp = Db.Stages.Find(t.StageID);
                    Db.Stages.Remove(tmp);
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = t.StageID, SUCCESS = true, MSG = $"Stage {t} successfully removed." };
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, $"Cannot remove Stage {t.Name}. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, $"Cannot remove Stage {t.Name}. Please try again later.");
                }
            }
            
        }
        
    }
}

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
    public class LineupRepository : BaseRepository
    {
        public LineupRepository() : base()
        { }

        public IQueryable<LineupItem> GetAll()
        {
            return Db.LineupItems;
        }

        public LineupItem GetByID(Guid? id)
        {
            return Db.LineupItems.Find(id);
        }

        public List<LineupItem> GetByStage(Guid? stageID)
        {
            return Db.LineupItems.Where(w => w.StageID == stageID).OrderBy(o => o.StartDateKey).ToList();
        }

        public RepositoryState Create(LineupItem model)
        {
            try
            {
                List<IValidationError> errors = this.Validate<LineupItem>(model);
                if (errors.Count == 0)
                {
                    model.LineupItemID = Guid.NewGuid();
                    model.StartDateKey = int.Parse($"{model.StartDate.Year}{model.StartDate.Month}{model.StartDate.Day}{model.StartDate.Hour}{model.StartDate.Minute}");
                    model.EndDateKey = int.Parse($"{model.EndDate.Year}{model.EndDate.Month}{model.EndDate.Day}{model.EndDate.Hour}{model.EndDate.Minute}");
                    model.Artist = null;
                    Db.LineupItems.Add(model);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"LineupItemitem successfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create lineupitem. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create lineupitem. Please try again later.");
            }
        }

        public RepositoryState Update(LineupItem model)
        {
            try
            {
                LineupItem tmp = Db.LineupItems.Find(model.LineupItemID);
                tmp.StartDate = model.StartDate;
                tmp.EndDate = model.EndDate;
                tmp.StartDateKey = int.Parse($"{model.StartDate.Year}{model.StartDate.Month}{model.StartDate.Day}{model.StartDate.Hour}{model.StartDate.Minute}");
                tmp.EndDateKey = int.Parse($"{model.EndDate.Year}{model.EndDate.Month}{model.EndDate.Day}{model.EndDate.Hour}{model.EndDate.Minute}");
                tmp.Artist = null;
                List<IValidationError> errors = this.Validate<LineupItem>(model);
                if (errors.Count == 0)
                {
                    Db.Entry<LineupItem>(model).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = "LineupItem successfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify lineup. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify lineup. Please try again later.");
            }
        }


        public RepositoryState Delete(LineupItem model)
        {
            try
            {
                LineupItem dbModel = Db.LineupItems.Find(model.LineupItemID);
                Db.LineupItems.Where(w => w.LineupItemID == model.LineupItemID);

                Db.SaveChanges();
                return new RepositoryState() { SUCCESS = true, MSG = $"LineupItem successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove lineup. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove lineup. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(LineupItem model)
        {
            try
            {

                Db.SaveChanges();
                return new RepositoryState() { SUCCESS = true, MSG = $"LineupItem successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove lineup. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove lineup. Please try again later.");
            }
        }
    }
}

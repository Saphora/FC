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
    public class GenreRespository : BaseRepository
    {
        /// <summary>
        /// Get all ordered by name
        /// </summary>
        /// <returns></returns>
        public List<UGenre> GetAll()
        {
            List<UGenre> rootResult = Db.Genres.OrderBy(o => o.Name).Where(w=>w.IsDeleted == false).ToList();
            return rootResult;
        }
        public List<UGenre> GetAllChildren()
        {
            List<UGenre> result = Db.Genres.Where(w=>w.ParentID != null && w.IsDeleted == false).OrderBy(o => o.Name).ToList();
            return result;
        }

        public List<UGenre> GetAllRoot()
        {
            List<UGenre> tmp = Db.Genres.Where(w=>w.ParentID == null && w.IsDeleted == false).ToList();
            List<UGenre> result = new List<UGenre>();
            foreach (UGenre g in tmp)
            {
                UGenre tmpGenre = new UGenre(g);
                result.Add(tmpGenre);
            }
            return result;
        }

        public List<UGenre> GetByPartialName(string name)
        {
            return Db.Genres.Where(w => w.Name.ToLower().StartsWith(name.ToLower()) && w.IsDeleted == false).OrderBy(o => o.Name).Take(10).ToList();
        }

        public UGenre GetByName(string name)
        {
            List<UGenre> genres = Db.Genres.Where(w => w.Name.ToLower() == name.ToLower() && w.IsDeleted == false).ToList();
            if(genres.Count > 1)
            {
                string msg = string.Format("Duplicate genres found with name {0} please remove one of the genres.", genres.FirstOrDefault().Name);
                throw new Exception(msg);
            } else
            {
                return genres.FirstOrDefault();
            }
        }

        public List<UGenre> GetAllDefault()
        {
            List<UGenre> result = new List<UGenre>();
            result.AddRange(Db.Genres.Where(w1 => w1.ParentID == Db.Genres.Where(w => w.Name.ToLower() == "default" && w.IsDeleted == false).FirstOrDefault().GenreID).OrderBy(o => o.Name).ToList());
            return result;
        }
        public List<Guid?> GetAllDefaultIds()
        {
            List<Guid?> result = new List<Guid?>();
            result.AddRange(Db.Genres.Where(w1 => w1.ParentID == Db.Genres.Where(w => w.Name.ToLower() == "default" && w.IsDeleted == false).FirstOrDefault().GenreID).OrderBy(o => o.Name).Select(s=>s.GenreID).ToList());
            return result;
        }

        public List<UGenre> GetByFestivalID(Guid? festivalID)
        {
            return Db.G2F.Where(w => w.FestivalID == festivalID).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
        }

        public List<UGenre> GetByParentID(Guid? genreID)
        {
            return Db.Genres.Where(w => w.ParentID == genreID && w.IsDeleted == false).OrderBy(o => o.Name).ToList();
        }

        public UGenre GetByID(Guid? genreID)
        {
            UGenre result = Db.Genres.Find(genreID);
            if (result.IsDeleted)
            {
                return null;
            }
            else
            {
                return result;
            }
        }

        public RepositoryState Create(UGenre genre)
        {
            try { 
                List<string> names = Db.Genres.Where(w=>w.IsDeleted == false).ToList().Select(s => s.Name.ToLower()).ToList();
                if (names.Where(w => w.ToLower() == genre.Name.ToLower()).Any())
                {
                    this.Status = new RepositoryState() { EXISTS = true, MSG = $"Genre {genre.Name} already exists." };
                    return this.Status;
                }
                else
                {

                    genre.GenreID = Guid.NewGuid();
                    if (genre.AuthorID == null)
                    {
                        genre.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    }
                    genre.Created = DateTime.Now;
                    List<IValidationError> errors = this.Validate<UGenre>(genre);
                    if (errors.Count() == 0)
                    {
                        Db.Genres.Add(genre);
                        Db.SaveChanges();
                        this.Status = new RepositoryState() { AffectedID = genre.GenreID, SUCCESS = true, MSG = $"Genre {genre.Name} successfully created." };
                        return this.Status;
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

        public RepositoryState Update(UGenre genre)
        {
            try
            {
                UGenre g = Db.Genres.Find(genre.GenreID);


                if (g.AuthorID == null)
                {
                    g.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                g.IsDeleted = false;
                g.IsPublished = false;
                g.ModifiedDate = DateTime.Now;
                g.Name = genre.Name;
                g.ParentID = genre.ParentID;
                g.VisibleOnHome = genre.VisibleOnHome;
                List<IValidationError> errors = this.Validate<UGenre>(g);
                if (errors.Count() == 0)
                {
                    Db.Entry<UGenre>(g).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    this.Status = new RepositoryState() { AffectedID = genre.GenreID, SUCCESS = true, MSG = $"Genre {g.Name} successfully deleted." };
                    return this.Status;
                } else
                {
                    return this.HandleValidationErrors(errors);
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

        public RepositoryState Delete(UGenre genre)
        {
            try
            {
                UGenre g = Db.Genres.Find(genre.GenreID);
                g.IsDeleted = true;
                g.ArchiveDate = DateTime.Now.AddDays(180);
                g.ModifiedDate = DateTime.Now;
                g.IsPublished = false;
                Db.Entry<UGenre>(g).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID = genre.GenreID, SUCCESS = true, MSG=$"Genre {g.Name} successfully deleted." };
                return this.Status;
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

        public RepositoryState ForceDelete(UGenre genre)
        {
            try
            {
                UGenre g = Db.Genres.Find(genre.GenreID);
                Db.G2A.RemoveRange(Db.G2A.Where(w => w.GenreID == g.GenreID).ToList());
                Db.G2F.RemoveRange(Db.G2F.Where(w => w.GenreID == g.GenreID).ToList());
                Db.G2N.RemoveRange(Db.G2N.Where(w => w.GenreID == g.GenreID).ToList());
                Db.Genres.Remove(g);
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID = genre.GenreID, SUCCESS = true, MSG=$"Genre {g.Name} successfully deleted with force." };
                return this.Status;
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

using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using FC.Shared.ServerMessages;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class NewsRepository : BaseRepository
    {
        public NewsRepository() : base()
        {
        }

        public List<UNews> GetAll()
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                return Db.News.OrderByDescending(o=>o.Created).ToList();
            }
        }
        public UNews GetByID(Guid? id)
        {
            UNews result;

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                result = Db.News.Find(id);
            }
            return result;
        }

        public List<UNews> GetPaged(int page, int month, int year)
        {
            List<UNews> news = new List<UNews>();

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                var filterDateSt = DateTime.Now.AddDays(-31);
                page = page - 1;
                if (page < 0)
                {
                    page = 0;
                }
                news = Db.News.Where(w => w.CreateDate >= filterDateSt).OrderByDescending(o => o.CreateDate).Skip(page * PageCount).Take(PageCount).ToList();
            }
            return news;
        }

        public int GetPagedCount(int page, string month, string year)
        {
            int result;

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                page = page - 1;
                int m = int.Parse(month);
                if (m < 10)
                {
                    month = "0" + month;
                }
                DateTime filter = DateTime.Parse($"{year}/{month}/1 00:01");
                result = Db.News.Where(w => w.CreateDate >= filter ).OrderByDescending(o=>o.CreateDate).Skip(page * PageCount).Take(PageCount).Count();
            }
            return result;
        }

        public List<UNews> GetFiltered(NewsFilter filter)
        {
            IQueryable<UNews> n = Db.News;
            List<UNews> result;

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                if (filter.CountryIDs != null)
                {
                    if (filter.CountryIDs.Count > 0)
                    {
                        n = Db.N2C.Where(w => filter.CountryIDs.Contains(w.CountryID)).Select(s => s.News);
                    }
                }
                if (filter.GenreIDs != null)
                {
                    if (filter.GenreIDs.Count > 0)
                    {
                        n = Db.G2N.Where(w => filter.GenreIDs.Contains(w.GenreID)).Select(s => s.News);
                    }
                }
                result = n.Where(w => w.IsPublished == true && w.CreateDate > DateTime.Now.AddMonths(-1)).Take(PageCount).OrderBy(o => o.Date).ToList();
            }
            return result;
        }

        public RepositoryState Create(UNews news)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    news.NewsID = Guid.NewGuid();
                    news.Genres = null;
                    if (news.AuthorID == null)
                    {
                        news.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    }
                    news.Date = DateTime.Now.ToUniversalTime();
                    news.CreateDate = DateTime.Now.ToUniversalTime();
                    news.ModifiedDate = DateTime.Now;
                    news.Created = DateTime.Now;
                    news.IsPublished = false;
                    List<IValidationError> errors = this.Validate<UNews>(news);
                    if (errors.Count() == 0)
                    {
                        Db.News.Add(news);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = news.NewsID, SUCCESS = true, MSG = $"Successfully created news items {news.Title}" };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, "Cannot create news item. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, "Cannot create news item. Please try again later.");
                }
            }
        }

        public RepositoryState Update(UNews news)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    UNews n = Db.News.Find(news.NewsID);
                    if (news.Genres != null)
                    {
                        Db.G2N.RemoveRange(Db.G2N.Where(w => w.NewsID == news.NewsID));
                        foreach (UGenre g in news.Genres)
                        {
                            Db.G2N.Add(new UGenre2UNews { G2NID = Guid.NewGuid(), GenreID = g.GenreID, NewsID = news.NewsID });
                        }
                    }

                    n.Date = DateTime.Now.ToUniversalTime();
                    n.Text = news.Text;
                    n.MetaDescription = news.MetaDescription;
                    n.MetaKeys = news.MetaKeys;
                    n.ShortText = news.ShortText;
                    n.Title = news.Title;
                    n.SourceName = news.SourceName;
                    n.SourceURL = news.SourceURL;
                    n.ThumbnailID = news.ThumbnailID;
                    n.CreateDate = DateTime.Now.ToUniversalTime();
                    n.ModifiedDate = DateTime.Now;
                    if (news.AuthorID == null)
                    {
                        n.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    }
                    List<IValidationError> errors = this.Validate<UNews>(news);
                    if (errors.Count() == 0)
                    {
                        Db.Entry<UNews>(n).State = System.Data.Entity.EntityState.Modified;
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = news.NewsID, SUCCESS = true, MSG = $"Successfully modified news items {news.Title}" };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, "Cannot modify news item. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, "Cannot modify news item. Please try again later.");
                }
            }
        }

        public RepositoryState Delete(UNews news)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    UNews n = Db.News.Find(news.NewsID);
                    n.IsDeleted = true;
                    Db.Entry<UNews>(n).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState { AffectedID = news.NewsID, SUCCESS = true, MSG = $"Successfully removed news items {news.Title}" };
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, "Cannot delete news item. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, "Cannot delete news item. Please try again later.");
                }
            }
        }

        public RepositoryState ForceDelete(UNews news)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    UNews n = Db.News.Find(news.NewsID);
                    Db.G2N.RemoveRange(Db.G2N.Where(w => w.NewsID == n.NewsID));
                    Db.News.Remove(n);
                    Db.SaveChanges();
                    return new RepositoryState { AffectedID = news.NewsID, SUCCESS = true, MSG = $"Successfully created news items {news.Title}" };
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, "Cannot create delete item. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, "Cannot create delete item. Please try again later.");
                }
            }
        }
    }
}

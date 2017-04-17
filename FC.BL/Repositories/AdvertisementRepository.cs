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
    public class AdvertisementRepository : BaseRepository
    {
        public AdvertisementRepository() : base()
        { }

        public List<Advertisement> GetByUser(Guid? userID)
        {
            List<Advertisement> advertisement = new List<Advertisement>();
            using (Db = new FC.MSDAL.ContentModel())
            {
                advertisement.AddRange(Db.Advertisement.Where(w => w.AuthorID == userID).OrderBy(o => o.Created).ToList());
            }
            return advertisement;
        }

        public IQueryable<Advertisement> GetAll()
        {
            return Db.Advertisement;
        }

        public Advertisement GetByID(Guid? id)
        {
            return Db.Advertisement.Find(id);
        }

        public RepositoryState Publish(Guid? id)
        {
            try
            {
                Advertisement model = Db.Advertisement.Find(id);
                model.IsPublished = true;
                model.PublishDate = DateTime.Now;
                Db.Entry<Advertisement>(model).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                return new RepositoryState { SUCCESS = true, MSG = "Advertisement successfully published." };
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create Advertisement. Please try again later.");
            }
        }

        public RepositoryState Create(Advertisement model)
        {
            try
            {
                model.AdvertisementID = Guid.NewGuid();
                model.IsPublished = false;
                model.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                model.Created = DateTime.Now;
                List<IValidationError> errors = this.Validate<Advertisement>(model);
                if (errors.Count == 0)
                {

                    foreach (Guid? id in model.Festivals)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = model.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.Festival });
                    }
                    foreach (Guid? id in model.News)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = model.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.News });
                    }
                    foreach (Guid? id in model.Artists)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = model.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.Artist });
                    }
                    foreach (Guid? id in model.Locations)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = model.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.Location });
                    }

                    Db.Advertisement.Add(model);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Advertisement successfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create Advertisement. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create Advertisement. Please try again later.");
            }
        }

        public RepositoryState Update(Advertisement model)
        {
            try
            {
                Advertisement a = Db.Advertisement.Find(model.AdvertisementID);
                a.AdvertisementType = model.AdvertisementType;
                a.Artists = model.Artists;
                a.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                a.Expires = model.Expires;
                a.Festivals = model.Festivals;
                a.InternalContentID = model.InternalContentID;
                a.InternalContentType = model.InternalContentType;
                a.Locations = model.Locations;
                a.Modified = DateTime.Now;
                a.News = model.News;
                a.PublishDate = model.PublishDate;
                a.IsPublished = model.IsPublished;
                a.ResellerGenres = model.ResellerGenres;
                a.MusicGenres = model.MusicGenres;
                a.ResellerID = model.ResellerID;
                List<IValidationError> errors = this.Validate<Advertisement>(a);
                if (errors.Count == 0)
                {
                    Db.Advertisement.Add(a);
                    Db.Adv2Visibility.RemoveRange(Db.Adv2Visibility.Where(w => w.AdvertisementID == a.AdvertisementID));
                    
                    foreach (Guid? id in model.Festivals)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = a.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.Festival });
                    }
                    foreach (Guid? id in model.News)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = a.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.News });
                    }
                    foreach (Guid? id in model.Artists)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = a.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.Artist });
                    }
                    foreach (Guid? id in model.Locations)
                    {
                        Db.Adv2Visibility.Add(new Adv2Visibility { Adv2VisibilityID = Guid.NewGuid(), AdvertisementID = a.AdvertisementID, InternalContentID = id, InternalContentType = Shared.Enum.InternalContentType.Location });
                    }
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = $"Advertisement successfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify Advertisement. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify Advertisement. Please try again later.");
            }
        }

        public RepositoryState Delete(Advertisement model)
        {
            try
            {


                return new RepositoryState() { SUCCESS = true, MSG = $"Advertisement successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove Advertisement. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove Advertisement. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(Advertisement model)
        {
            try
            {

                return new RepositoryState() { SUCCESS = true, MSG = $"Advertisement successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove Advertisement. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove Advertisement. Please try again later.");
            }
        }

        public RepositoryState CreateCalendarCardAd(CalendarCardAd model)
        {
            try
            {
                model.CalendarAdvID = Guid.NewGuid();
                model.Created = DateTime.Now;
                model.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                List<IValidationError> errors = this.Validate<CalendarCardAd>(model);
                if (errors.Count == 0)
                {
                    Db.CalendarCardAds.Add(model);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = "Calendar card advertisement succesfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot create calendar card advertisment. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot create calendar card advertisment. Please try again later.");
            }
        }

        public RepositoryState UpdateCalendarCardAd(CalendarCardAd model)
        {
            try
            {
                CalendarCardAd a = Db.CalendarCardAds.Find(model.CalendarAdvID);
                a.AdvertisementID = model.AdvertisementID;
                a.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                a.CanRate = model.CanRate;
                a.DeepLink = model.DeepLink;
                a.Modified = DateTime.Now;
                a.Image = model.Image;
                a.MusicGenresVisible = model.MusicGenresVisible;
                a.TextLine = model.TextLine;
                a.Title = model.Title;

                model.Created = DateTime.Now;
                model.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                List<IValidationError> errors = this.Validate<CalendarCardAd>(model);
                if (errors.Count == 0)
                {

                    Db.CalendarCardAds.Add(model);
                    Db.SaveChanges();
                    return new RepositoryState { SUCCESS = true, MSG = "Calendar card advertisement succesfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot modify calendar card advertisment. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot modify calendar card advertisment. Please try again later.");
            }
        }

        public RepositoryState DeleteCalendarCardAd(CalendarCardAd model)
        {
            try
            {
                CalendarCardAd a = Db.CalendarCardAds.Find(model.CalendarAdvID);
                a.IsDeleted = true;
                a.ArchiveDate = DateTime.Now.AddDays(180);
                Db.Entry<CalendarCardAd>(a).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                return new RepositoryState { SUCCESS = true, MSG = "Calendar card advertisement succesfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot remove calendar card advertisment. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot remove calendar card advertisment. Please try again later.");
            }
        }

        public RepositoryState ForceDeleteCalendarCardAd(CalendarCardAd model)
        {
            try
            {
                CalendarCardAd a = Db.CalendarCardAds.Find(model.CalendarAdvID);
                Db.CalendarCardAds.Remove(a);
                Db.SaveChanges();
                return new RepositoryState { SUCCESS = true, MSG = "Calendar card advertisement succesfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot remove calendar card advertisment. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot remove calendar card advertisment. Please try again later.");
            }
        }
    }
}

using FC.MSDAL;
using FC.Shared.Entities;
using FC.Shared.ServerMessages;
using FC.Shared.ViewModels.Rating;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class RatingRepository : BaseRepository
    {
        public RepositoryState Rate(RatingMsg msg, string host, string ip, Guid? UserID = null)
        {
            try
            {
                string key = ip;
                using (Db = new FC.MSDAL.ContentModel())
                {
                    if (!Db.Ratings.Where(w => w.ContentItemID == msg.ContentItemID && w.IP == key).Any())
                    {
                        Db.Ratings.Add(new Shared.Entities.Rating() { RatingID = Guid.NewGuid(), ContentItemID = msg.ContentItemID, Type = msg.ContentType, CreditAmmount = msg.CreditAmmount, UserID = UserID, Host = host, IP = key });
                        Db.SaveChanges();
                        return new RepositoryState() { SUCCESS = true, MSG = $"Thanks, your rating is successfully received." };
                    }
                    else
                    {
                        return new RepositoryState() { SUCCESS = false, MSG = $"Cannot rate this item because it was already rated from this IP " + ip };
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

        public RatingVm GetRating(Guid? ContentItemID, string type)
        {
                RatingVm result;
                List<Rating> rating = new List<Rating>();
                using (var db = new FC.MSDAL.ContentModel())
                {
                    rating = db.Ratings.Where(w => w.ContentItemID == ContentItemID && w.Type == type).ToList();
                }
                result = new RatingVm();
                result.ContentItemID = ContentItemID;
                result.Counter = rating.Count;
                int maxValue = rating.Count * 5;
                int sumAmmount = rating.Sum(s => s.CreditAmmount);
                if (sumAmmount > 0 && maxValue > 0)
                {
                    float sum = (float)sumAmmount / (float)maxValue * (float)5;
                    result.StarCount = (int)Math.Floor(sum);
                }
                else
                {
                    return new RatingVm { ContentItemID = ContentItemID, Counter = 0, StarCount = 0 };
                }
                return result;
            
        }
    }
}

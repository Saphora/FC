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
    public class ProductRepository : BaseRepository
    {
        public ProductRepository() : base()
        { }

        public List<Product> GetByReseller(Guid? resellerID)
        {
            Reseller r = Db.Resellers.Find(resellerID);

            return Db.PROD2RES.Where(w => w.ResellerID == r.ResellerID).Select(s => s.Product).OrderBy(o => o.Name).ToList();
        }


        public List<Product> GetAll()
        {
            return Db.Products.Where(w => w.IsDeleted == false).OrderBy(o => o.Name).ToList();
        }

        public Product GetByID(Guid? id)
        {
            return Db.Products.Find(id);
        }

        public RepositoryState Create(Guid? resellerID, Product t)
        {
            try
            {
                List<IValidationError> errors = this.Validate<Product>(t);
                if (errors.Count == 0)
                {
                    t.ProductID = Guid.NewGuid();
                    t.Created = DateTime.Now;
                    t.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    Db.Products.Add(t);
                    Db.PROD2RES.Add(new Product2Reseller { PR2REID = Guid.NewGuid(), ProductID = t.ProductID, ResellerID = resellerID });
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = t.ProductID, SUCCESS = true, MSG = $"Product {t.Name} successfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create Product {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create Product {t.Name}. Please try again later.");
            }
        }

        public RepositoryState Update(Product t)
        {
            try
            {
                Product tmp = Db.Products.Find(t.ProductID);
                tmp.CurrencyBase = t.CurrencyBase;
                tmp.ExternalProductURL = t.ExternalProductURL;
                tmp.InternalURL = t.InternalURL;
                tmp.IsAllinclusive = t.IsAllinclusive;
                tmp.IsAvailable = t.IsAvailable;
                tmp.IsCombiDeal = t.IsCombiDeal;
                tmp.IsDiscount = t.IsDiscount;
                tmp.Modified = DateTime.Now;
                tmp.Price = t.Price;
                tmp.DiscountPrice = t.DiscountPrice;
                tmp.Name = t.Name;
                tmp.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                tmp.Modified = DateTime.Now;


                List<IValidationError> errors = this.Validate<Product>(t);
                if (errors.Count == 0)
                {
                    Db.Entry<Product>(t).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = t.ProductID, SUCCESS = true, MSG = $"Product {t.Name} successfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify Product {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify Product {t.Name}. Please try again later.");
            }
        }


        public RepositoryState Delete(Product t)
        {
            try
            {
                Product tmp = Db.Products.Find(t);
                tmp.IsDeleted = true;
                tmp.ArchiveDate = DateTime.Now.AddDays(180);
                Db.Entry<Product>(t).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = t.ProductID, SUCCESS = true, MSG = $"Product {t} successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove Product {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove Product {t.Name}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(Product t)
        {
            try
            {
                Db.PROD2RES.RemoveRange(Db.PROD2RES.Where(w => w.ProductID == t.ProductID));
                Db.Products.Remove(Db.Products.Find(t.ProductID));
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = t.ProductID, SUCCESS = true, MSG = $"Product {t.Name} successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove Product {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove Product {t.Name}. Please try again later.");
            }
        }
    }
}

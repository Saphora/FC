using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace FC.BL.Repositories
{
    public class TicketRepository : BaseRepository, IRepository
    {
        public TicketRepository() : base()
        { }

        public List<Ticket> GetByReseller(Guid? resellerID)
        {
            Reseller r = Db.Resellers.Find(resellerID);

            return Db.T2R.Where(w => w.ResellerID == r.ResellerID).Select(s => s.Ticket).OrderBy(o => o.Name).ToList();
        }


        public IQueryable<Ticket> GetAll()
        {
            return Db.Tickets.Where(w => w.IsDeleted == false).OrderBy(o => o.Name);
        }


        public List<Ticket> GetByFestivalID(Guid? id)
        {
            return Db.T2F.Where(w => w.FestivalID == id).Select(s => s.Ticket).Where(w=>w.IsDeleted == false).OrderBy(o => o.Price).ToList();
        }

        public Ticket GetByID(Guid? id)
        {
            return Db.Tickets.Find(id);
        }

        public RepositoryState Create(Guid? festivalID, Guid? resellerID, Ticket t)
        {
            try
            {
                List<IValidationError> errors = this.Validate<Ticket>(t);
                if (errors.Count == 0)
                {
                    t.TicketID = Guid.NewGuid();
                    t.Created = DateTime.Now;
                    t.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    Db.Tickets.Add(t);
                    Db.T2F.Add(new Ticket2Festival { T2FID = Guid.NewGuid(), TicketID = t.TicketID, FestivalID = festivalID});
                    Db.T2R.Add(new Tickets2Reseller { T2RID = Guid.NewGuid(), TicketID = t.TicketID, ResellerID = resellerID });
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = t.TicketID, SUCCESS = true, MSG = $"Ticket {t.Name} successfully created." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create ticket {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create ticket {t.Name}. Please try again later.");
            }
        }

        public RepositoryState Update(Ticket t)
        {
            try
            {
                Ticket tmp = Db.Tickets.Find(t.TicketID);
                tmp.CurrencyBase = t.CurrencyBase;
                tmp.ExternalTicketURL = t.ExternalTicketURL;
                tmp.InternalURL = t.InternalURL;
                tmp.IsAllinclusive = t.IsAllinclusive;
                tmp.IsAvailable = t.IsAvailable;
                tmp.IsCombiDeal = t.IsCombiDeal;
                tmp.IsDiscount = t.IsDiscount;
                tmp.IsEarlyBird = t.IsEarlyBird;
                tmp.IsVipTicket = t.IsVipTicket;
                tmp.Modified = DateTime.Now;
                tmp.Price = t.Price;
                tmp.TicketDescription = t.TicketDescription;
                tmp.Name = t.Name;
                tmp.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                tmp.Modified = DateTime.Now;


                List<IValidationError> errors = this.Validate<Ticket>(t);
                if (errors.Count == 0)
                {
                    Db.Entry<Ticket>(t).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = t.TicketID, SUCCESS = true, MSG = $"Ticket {t.Name} successfully modified." };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify ticket {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify ticket {t.Name}. Please try again later.");
            }
        }


        public RepositoryState Delete(Ticket t)
        {
            try
            {
                Ticket tmp = Db.Tickets.Find(t);
                tmp.IsDeleted = true;
                tmp.ArchiveDate = DateTime.Now.AddDays(180);
                Db.Entry<Ticket>(t).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = t.TicketID, SUCCESS = true, MSG = $"Ticket {t} successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove ticket {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove ticket {t.Name}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(Ticket t)
        {
            try
            {
                Db.T2F.RemoveRange(Db.T2F.Where(w => w.TicketID == t.TicketID));
                Db.T2R.RemoveRange(Db.T2R.Where(w => w.TicketID == t.TicketID));
                Db.Tickets.Remove(Db.Tickets.Find(t.TicketID));
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = t.TicketID, SUCCESS = true, MSG = $"Ticket {t.Name} successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove ticket {t.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove ticket {t.Name}. Please try again later.");
            }
        }

        public List<Ticket> GetPaged(int page, int pageCount=50)
        {
            return Db.Tickets.OrderBy(o => o.Created).Take(pageCount).Skip(pageCount * page).ToList();
        }
    }
}

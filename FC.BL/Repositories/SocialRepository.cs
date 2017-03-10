using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class SocialRepository : BaseRepository
    {
        public SocialRepository() : base()
        { }

        public decimal GetPageCount(int size)
        {
            Decimal d = new Decimal((float)Db.SocialProfiles.Count() / (float)size);
            return Math.Ceiling(d) - 1;
        }


        public SocialProfile GetByID(Guid? id)
        {
            SocialProfile a = Db.SocialProfiles.Find(id);
            return a;
        }

        public List<SocialProfile> GetByContentID(Guid? id)
        {
            List<SocialProfile> profiles = Db.SocialProfiles.Where(w=>w.GenericID == id).OrderBy(o=>o.ProfileType.Name).ToList();
            return profiles;
        }

        public List<SocialProfileType> GetAllTypes()
        {
            return Db.SocialProfileTypes.OrderBy(o => o.Name).ToList();
        }

        public RepositoryState Create(SocialProfile Social)
        {

            if (!Db.SocialProfiles.Where(w => w.URL == Social.URL).Any())
            {
                try
                {
                    Social.SocialProfileID = Guid.NewGuid();

                    List<IValidationError> errors = this.Validate<SocialProfile>(Social);
                    if (errors.Count() == 0)
                    {
                        Social.SocialProfileID = Guid.NewGuid();
                        Db.SocialProfiles.Add(Social);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = Social.SocialProfileID, SUCCESS = true, MSG = $"Social profile {Social.URL} successfully created." };
                    }
                    else
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
                    return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
                }
            }
            else
            {
                return new RepositoryState { EXISTS = true, MSG = $"Social profile {Social.URL} already exists in our database." };
            }
            
        }

        public RepositoryState Update(SocialProfile d)
        {
            try
            {
                SocialProfile a = Db.SocialProfiles.Find(d.SocialProfileID);

                List<IValidationError> errors = this.Validate<SocialProfile>(a);
                if (errors.Count() == 0)
                {
                    a.URL = d.URL;
                    a.ProfileTypeID = d.ProfileTypeID;

                    Db.Entry<SocialProfile>(a).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = a.SocialProfileID, SUCCESS = true, MSG = $"Social profile {d.URL} successfully updated." };
                }
                else
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
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }


        public RepositoryState Delete(SocialProfile Social)
        {
            try
            {
               
                SocialProfile a = Db.SocialProfiles.Find(Social.SocialProfileID);
                Db.SocialProfiles.Remove(a);
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = a.SocialProfileID, SUCCESS = true, MSG = $"Social profile {a.URL} successfully deleted with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
            }
        }
    }
}

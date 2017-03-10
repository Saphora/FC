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
    public class RoleRepository : BaseRepository
    {
        public RoleRepository() : base()
        {}

        public List<Role> GetAll()
        {
            return this.Db.Roles.OrderBy(o => o.Name).ToList();
        }

        public Role GetByID(Guid? id)
        {
            return this.Db.Roles.Find(id);
        }

        public RepositoryState Create(Role model)
        {
            try
            {
                model.RoleID = Guid.NewGuid();
                List<IValidationError> errors = this.Validate<Role>(model);
                if (errors.Count == 0)
                {
                    this.Db.Roles.Add(model);
                    this.Db.SaveChanges();
                    return new RepositoryState { AffectedID = model.RoleID, SUCCESS = true, MSG = $"Successfully created role {model.Name}" };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create Role {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create Role {model.Name}. Please try again later.");
            }
        }

        public RepositoryState Update(Role model)
        {
            try
            {
                Role m = this.Db.Roles.Find(model.RoleID);
                List<IValidationError> errors = this.Validate<Role>(model);
                if (errors.Count == 0)
                {
                    m.Name = model.Name;
                    this.Db.Entry(m).State = System.Data.Entity.EntityState.Modified;
                    this.Db.SaveChanges();
                    return new RepositoryState { AffectedID = model.RoleID, SUCCESS = true, MSG = $"Successfully modified role {model.Name}" };
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify Role {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify Role {model.Name}. Please try again later.");
            }
        }

        public Role GetByName(string name)
        {
            return this.Db.Roles.Where(w => w.Name.ToLower() == name).FirstOrDefault();
        }

        public RepositoryState Delete(Role model)
        {
            try
            {
                Role m = this.Db.Roles.Find(model.RoleID);
                this.Db.Roles.Remove(m);
                this.Db.SaveChanges();

                return new RepositoryState() { AffectedID = model.RoleID, SUCCESS = true, MSG = $"Role {model.Name} successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove Role {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove Role {model.Name}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete(Role model)
        {
            return this.Delete(model);
        }

        public RepositoryState AddByUserID(Role model, Guid? userID)
        {
            try
            {
                if (!Db.U2R.Where(w => w.UserID == userID).Select(s => s.Role).ToList().Where(w => w.RoleID == model.RoleID).Any())
                {
                    this.Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), UserID = userID, RoleID = model.RoleID });
                    this.Db.SaveChanges();
                    return new RepositoryState() { SUCCESS = true, MSG = $"Role {model.Name} successfully binded to user." };
                } else
                {
                    return new RepositoryState() { SUCCESS = false, MSG = $"Role {model.Name} already binded to user." };
                }

            } catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot bind user to role, please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot bind user to role, please try again later.");
            }
        }

        public RepositoryState AddByUserID(string name, Guid? userID)
        {
            try
            {
                Role model = this.GetByName(name);
                if (!Db.U2R.Where(w => w.UserID == userID).Select(s => s.Role).ToList().Where(w => w.RoleID == model.RoleID).Any())
                {
                    this.Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), UserID = userID, RoleID = model.RoleID });
                    this.Db.SaveChanges();
                    return new RepositoryState() { SUCCESS = true, MSG = $"Role {model.Name} successfully binded to user." };
                }
                else
                {
                    return new RepositoryState() { SUCCESS = false, MSG = $"Role {model.Name} already binded to user." };
                }

            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot bind user to role, please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot bind user to role, please try again later.");
            }
        }
    }
}

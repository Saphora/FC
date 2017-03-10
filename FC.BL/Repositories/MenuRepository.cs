using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using FC.Shared.ViewModels.Artist;
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
    public class MenuRepository : BaseRepository
    {
        public MenuRepository() : base()
        { }

        public List<MenuItem> GetBySectionID(Guid? sectionID)
        {
            return Db.MenuItems.Where(w => w.SectionID == sectionID).OrderBy(o => o.SortOrder).ToList();
        }

        public List<MenuSection> GetMenu(string pageKey = "")
        {
            List<MenuSection> sections = new List<MenuSection>();

            List<Guid?> roleIDs = new List<Guid?>();
            if (AuthorizationRepository.Current.CurrentUser != null && AuthorizationRepository.Current.CurrentUserRoles != null)
            {
                roleIDs.AddRange(AuthorizationRepository.Current.CurrentUserRoles.Select(s => s.RoleID));
            }
            else
            {
                roleIDs.Add(Guid.Parse("525cdb04-60ec-4c4c-bb78-ba65a1eb2ff7"));
            }
            if (!String.IsNullOrEmpty(pageKey))
            {
                sections = this.Db.MS2R.Where(w => (w.Section.PageKey == pageKey || w.Section.PageKey == null) && roleIDs.Contains(w.RoleID)).Select(s => s.Section).Distinct().ToList();
            }
            else
            {
                sections = this.Db.MS2R.Where(w => w.Section.PageKey == null && roleIDs.Contains(w.RoleID)).Select(s => s.Section).Distinct().ToList();
            }
            foreach (MenuSection s in sections)
            {
                if (s.MenuItems == null)
                {
                    s.MenuItems = this.Db.MenuItems.Where(w => w.SectionID == s.SectionID).ToList();
                }
            }
            return sections.OrderBy(o => o.SortOrder).ToList();
        }

        public List<MenuSection> GetAllSections()
        {
            List<MenuSection> sections = Db.MenuSections.ToList();
            foreach (MenuSection s in sections)
            {
                if (s.MenuItems == null)
                {
                    s.MenuItems = this.Db.MenuItems.Where(w => w.SectionID == s.SectionID).ToList();
                }
            }
            return sections;
        }
        public List<MenuItem> GetAllItems()
        {
            return Db.MenuItems.OrderBy(o => o.Name).ToList();
        }

        public MenuSection GetByID(Guid? id)
        {
            MenuSection a = Db.MenuSections.Find(id);
            if (a != null)
            {
                a.MenuItems = Db.MenuItems.Where(w => w.SectionID == id).OrderBy(o => o.Name).ToList();
                return a;
            }
            return null;

        }

        public IQueryable<MenuSection> GetAll()
        {
            return Db.MenuSections.Where(w => w.IsDeleted == false).OrderBy(o => o.Name);
        }

        public RepositoryState Create(MenuSection ms)
        {
            if (!Db.MenuSections.Where(w => w.Name == ms.Name && w.IsDeleted == false).Any())
            {
                try
                {
                    ms.SectionID = Guid.NewGuid();
                    List<IValidationError> errors = this.Validate<MenuSection>(ms);
                    if (errors.Count() == 0)
                    {
                        Db.MenuSections.Add(ms);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = ms.SectionID, SUCCESS = true, MSG = $"Menu section {ms.Name} successfully created." };
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
                return new RepositoryState { EXISTS = true, MSG = $"Menu section {ms.Name} already exists." };
            }
        }
        public RepositoryState CreateItem(MenuItem ms)
        {
            if (!Db.MenuItems.Where(w => w.Name == ms.Name &&  w.SectionID == ms.SectionID && w.IsDeleted == false).Any())
            {
                try
                {
                    ms.MenuItemID = Guid.NewGuid();
                    List<IValidationError> errors = this.Validate<MenuItem>(ms);
                    if (errors.Count() == 0)
                    {
                        Db.MenuItems.Add(ms);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = ms.MenuItemID, SUCCESS = true, MSG = $"Menu item {ms.Name} successfully created." };
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
                return new RepositoryState { EXISTS = true, MSG = $"Menu item {ms.Name} already exists." };
            }
        }

        public MenuItem GetMenuItemByID(Guid? id)
        {
            return Db.MenuItems.Find(id);
        }

        public RepositoryState Update(MenuSection d)
        {
            try
            {
                MenuSection section = Db.MenuSections.Find(d.SectionID);
                section.Name = d.Name;
                section.IsPublished = d.IsPublished;
                section.SortOrder = d.SortOrder;
                section.PageKey = d.PageKey;
                section.FAIcon = d.FAIcon;
                List<IValidationError> errors = this.Validate<MenuSection>(section);
                if (errors.Count() == 0)
                {
                    Db.Entry<MenuSection>(section).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = section.SectionID, SUCCESS = true, MSG = $"Menu section {section.Name} successfully modified." };
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
        public RepositoryState UpdateMenuItem(MenuItem d)
        {
            try
            {
                MenuItem item = Db.MenuItems.Find(d.MenuItemID);
                item.Name = d.Name;
                item.IsPublished = d.IsPublished;
                item.SortOrder = d.SortOrder;
                item.OnClick = d.OnClick;
                item.URL = d.URL;
                item.SectionID = d.SectionID;
                item.IsSpecific = d.IsSpecific;
                item.FAIcon = d.FAIcon;
                item.ParentID = d.ParentID;
                List<IValidationError> errors = this.Validate<MenuItem>(item);
                if (errors.Count() == 0)
                {
                    Db.Entry<MenuItem>(item).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = item.SectionID, SUCCESS = true, MSG = $"Menu item {item.Name} successfully modified." };
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

        public RepositoryState Delete(MenuSection s)
        {
            try
            {
                Db.MenuItems.RemoveRange(Db.MenuItems.Where(w => w.SectionID == s.SectionID));
                Db.MenuSections.Remove(Db.MenuSections.Find(s.SectionID));
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = s.SectionID, SUCCESS = true, MSG = $"Menu section {s.Name} successfully deleted." };
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
        public RepositoryState DeleteMenuItem(MenuItem s)
        {
            try
            {
                Db.MenuItems.RemoveRange(Db.MenuItems.Where(w => w.MenuItemID == s.MenuItemID));
                Db.SaveChanges();
                return new RepositoryState() { AffectedID = s.SectionID, SUCCESS = true, MSG = $"Menu item {s.Name} successfully deleted." };
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

        public RepositoryState ForceDelete(MenuSection artist)
        {
            throw new NotImplementedException("Force delete is not implemented for menu sections. Items were force deleted by default.");
        }
    }
}
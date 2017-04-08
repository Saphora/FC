using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public class FestivalController : BaseController
    {
        // GET: Festival
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            if (this.repositories.Auth.ActionAuthorized(new string[] { Roles.Festival }))
            {
                ViewBag.CountrySelect = (from c in this.repositories.Countries.GetAll() select new SelectListItem { Value = c.CountryID.Value.ToString(), Text = c.Name }).ToList();
                return View("Forms/_FestivalCRUD", new UFestival() { StartDate = DateTime.Now, EndDate = DateTime.Now });
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        private UFestival fetchDates(UFestival festival)
        {
            string startDate = DateTime.Now.ToString();
            string endDate = DateTime.Now.AddDays(1).ToString();
            if (Request.Form.AllKeys.Contains("StartDate.Year")
                && Request.Form.AllKeys.Contains("StartDate.Month")
                && Request.Form.AllKeys.Contains("StartDate.Day")
                && Request.Form.AllKeys.Contains("StartDate.Hour")
                && Request.Form.AllKeys.Contains("StartDate.Minute"))
            {
                startDate = string.Format(
                   "{0}/{1}/{2} {3}:{4}:00",
                   Request.Form["StartDate.Year"],
                   Request.Form["StartDate.Month"],
                   Request.Form["StartDate.Day"],
                   Request.Form["StartDate.Hour"],
                   Request.Form["StartDate.Minute"]);
            }
            if (Request.Form.AllKeys.Contains("EndDate.Year")
                && Request.Form.AllKeys.Contains("EndDate.Month")
                && Request.Form.AllKeys.Contains("EndDate.Day")
                && Request.Form.AllKeys.Contains("EndDate.Hour")
                && Request.Form.AllKeys.Contains("EndDate.Minute"))
            {
                endDate = string.Format(
                    "{0}/{1}/{2} {3}:{4}:00",
                    Request.Form["EndDate.Year"],
                    Request.Form["EndDate.Month"],
                    Request.Form["EndDate.Day"],
                    Request.Form["EndDate.Hour"],
                    Request.Form["EndDate.Minute"]);
            }

            festival.StartDate = DateTime.Parse(startDate);
            festival.EndDate = DateTime.Parse(endDate);
            return festival;
        }
        [HttpPost]
        public ActionResult Create(UFestival festival)
        {
            if (this.repositories.Auth.ActionAuthorized(new string[] { Roles.Festival }))
            {
                festival = this.fetchDates(festival);
                festival.IsPublished = false;
                var state = this.repositories.Festivals.Create(festival);
                state.Data = festival;
                this.Flash(state);
                if (state.SUCCESS)
                {
                    return RedirectToAction("Edit", state.AffectedID);
                }
                else
                {
                    ViewBag.CountrySelect = (from c in this.repositories.Countries.GetAll() select new SelectListItem { Value = c.CountryID.Value.ToString(), Text = c.Name }).ToList();
                    return RedirectToAction("Create", festival.FestivalID);
                }
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        // GET: Festival
        [HttpPost]
        public ActionResult Edit(UFestival festival)
        {
            if (this.repositories.Auth.ActionAuthorized(new string[] { Roles.Festival }, festival.AuthorID))
            {
                festival = this.fetchDates(festival);
                var state = this.repositories.Festivals.Update(festival);
                state.Data = festival;
                this.Flash(state);
                return Redirect(string.Format("/Festival/Edit/{0}", festival.FestivalID));
               
            } else
            {
                return this.NotAuthorized();
            }
        }
        // GET: Festival
        public ActionResult Edit(Guid? id)
        {
            var festival = this.repositories.Festivals.GetByID(id);
            if (this.repositories.Auth.ActionAuthorized(Roles.GetAllPublic(), festival.AuthorID))
            {
                if (ViewBag.Flash != null)
                {
                    var state = ViewBag.Flash as RepositoryState;
                    if (state.Data != null)
                    {
                        festival = state.Data as UFestival;
                    }
                    
                }
                ViewBag.CountrySelect = (from c in this.repositories.Countries.GetAll() select new SelectListItem { Value = c.CountryID.Value.ToString(), Text = c.Name }).ToList();
                return View("Forms/_FestivalCRUD", festival);
            } else
            {
                this.Flash(new RepositoryState { SUCCESS = false, MSG = "You dont have the permission to access this content." });
                return this.NotAuthorized();
            }
        }
    }
}
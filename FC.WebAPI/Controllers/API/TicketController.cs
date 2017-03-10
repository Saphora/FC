using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FC.Shared.Entities;
using FC.BL.Repositories;
using FC.Shared.Enum;

namespace FC.WebAPI.Controllers.API
{
    public class TicketController : BaseAPIController
    {
        private TicketRepository repo;
        public TicketController() : base() {
            repo = new TicketRepository();
        }
        
        
        [HttpGet]
        public List<Ticket> GetByFestivalID(Guid? id)
        {
            return repo.GetByFestivalID(id);
        }


    }
}

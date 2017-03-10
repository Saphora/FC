using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FC.WebMVC.Models.Issues
{
    public class IssueVm
    {
        public GenericMessage Message { get; set; }
        public ApplicationUser User { get; set; }
    }
}
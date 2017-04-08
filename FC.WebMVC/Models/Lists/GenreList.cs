using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FC.WebMVC.Models.Lists
{
    public class GenreList : List<UGenre>
    {
        public GenreList():
            base()
        {}
    }
}
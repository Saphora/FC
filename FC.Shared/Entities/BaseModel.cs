﻿using FC.Interfaces;
using FC.Interfaces.Data;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class BaseModel : IBaseModel
    {
        public void init()
        {

        }
        public BaseModel()
        {

        }
        public BaseModel(object data)
        {
            BaseModel bm = (BaseModel)data;
            this.Created = bm.Created;
            this.IsPublished = bm.IsPublished;
        }
        [Column(TypeName = "datetime2")]
        public  DateTime? ModifiedDate { get; set; }
        public  bool IsPublished { get; set; }
        public  int SortOrder { get; set; }
        public  string URL { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? Created { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? Modified { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? ArchiveDate { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? CreatedDate { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? DeleteDate { get; set; }
        public  Guid? AuthorID { get; set; }

        public bool Deleted
        {
            get; set;
        }

        public bool IsDeleted
        {

            get; set;
        }

        public bool IsActive
        {

            get; set;
        }

        public string Name
        {
            get; set;
        }
    }
}

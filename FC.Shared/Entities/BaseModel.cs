using FC.Interfaces;
using FC.Interfaces.Data;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public virtual DateTime? ModifiedDate { get; set; }
        public virtual bool IsPublished { get; set; }
        public virtual int SortOrder { get; set; }
        public virtual string URL { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? ArchiveDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? DeleteDate { get; set; }
        public virtual Guid? AuthorID { get; set; }

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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Data
{
    public interface IBaseModel
    {
        string Name { get; set; }
        Guid? AuthorID { get; set; }
        DateTime? CreatedDate { get; set; }
        DateTime? ModifiedDate { get; set; }
        DateTime? DeleteDate { get; set; }
        DateTime? ArchiveDate { get; set; }
        bool IsDeleted { get; set; }
        bool IsPublished { get; set; }
        bool IsActive { get; set; }
    }
}

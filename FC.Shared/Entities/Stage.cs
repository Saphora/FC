using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;
using FC.Interfaces.Data;

namespace FC.Shared.Entities
{
    public class Stage: BaseModel
    {
        [Key]
        public Guid? StageID { get; set; }

        [Validation(ValidationRule.Any,true)]
        public string Name { get; set; }

        [Index]
        [Validation(ValidationRule.Guid, true)]
        public Guid? FestivalID { get; set; }
        
        public List<LineupItem> LineUp { get; set; }
        
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MaterializedArtistListVM
    { 
        public string GenreNames  { get; set; }
        public string ArtistName  { get; set; }
        public string CountryName { get; set; }
        public Guid? ThumbnailID    { get; set; }
        public Guid? LogoID       { get; set; }
        public Guid? MediaDirectoryID { get; set; }
        public bool IsPublished    { get; set; }
        [Key]
        public Guid? ArtistID       { get; set; }
    }
}

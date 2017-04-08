using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;
using FC.Interfaces.Data;
using System.ComponentModel;

namespace FC.Shared.Entities
{
    public class ApplicationUser : BaseModel, INotifyPropertyChanged
    {
        public ApplicationUser()
        {
            Roles = new List<Role>();
        }
        
        [Key]
        public Guid? UserID           { get; set;}
        public Guid? ActivationToken { get; set; }
        public int UserCount        { get; set;}

        [Index("UserName", IsUnique =true, IsClustered = true)]
        public string UserName         { get; set;}

        //private string _name { get; set; }

        //[NotMapped]
        //public string Name { get { if (!string.IsNullOrEmpty(UserMiddlename)) { return $"{UserFirstname}, {UserLastname}, {UserMiddlename}"; } else { return $"{UserFirstname}, {UserLastname}"; } } set { _name = value; } }

        [Validation(ValidationRule.Any, true)]
        [Index]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Password should contains between 8 and 40 characters")]
        public string UserPassword     { get; set;}
        public string UserCode         { get; set;}
        
        [Required(AllowEmptyStrings = false, ErrorMessage = "Sur name is mandatory")]
        public string UserFirstname    { get; set; }
        
        [RegularExpression(Validation.NAME)]
        [Required(AllowEmptyStrings =false, ErrorMessage ="Last name is mandatory")]
        public string UserLastname     { get; set; }
        
        public string UserMiddlename   { get; set;}
        
        public string UserAddress      { get; set; }
        public string UserAddressNR { get; set; }

        [ForeignKey("CountryID")]
        public UCountry Country { get; set; }

        public Guid? CountryID { get; set; }

        public string City { get; set; }

        public string ZIPCode { get; set; }

        [Index("UserEmail", IsUnique=true, IsClustered=true)]
        [Validation(ValidationRule.Email, true)]
        [RegularExpression(Validation.EMAIL, ErrorMessage ="E-mail address is not a valid format.")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "E-mail address is mandatory")]
        public string UserEmailAddress { get; set;}
        public string UserProfileIMG   { get; set;}

        private bool _userActivated { get; set; }
        public bool UserActivated {
            get
            {
                return _userActivated;
            }
            set
            {
                if (value != this._userActivated)
                {
                    this._userActivated = value;
                    if(this.PropertyChanged != null)
                    {
                        this.PropertyChanged(this, new PropertyChangedEventArgs("UserActivated"));
                    }
                }
            }
        }

        public string UserPhoneNumber  { get; set;}
        public Guid? MediaDirectoryID { get; set; }

        [NotMapped]
        public  List<SocialProfile> Social { get; set; }
        [NotMapped]
        public  List<Role> Roles { get; set; }
        public DateTime? DeletedDate { get; set; }



        [ForeignKey("MediaDirectoryID")]
        public MediaDirectory Album { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}

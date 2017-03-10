
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedSocialProfileTypes : SeedBase
    {
        public SeedSocialProfileTypes(string versionID, ContentModel db) : base(versionID, db)
        {
            if (SeedCanRun)
            {
                this.SeedStart();
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("F090893B-A2F5-479A-A1C7-6221EED54DC0"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Instagram",
                    CssClass = "icon instagram",
                    FontAwesomeIcon = "fa fa-instagram"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("0E8AE414-BF77-464A-8DCE-2983AB9F6E59"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Website",
                    CssClass = "icon website",
                    FontAwesomeIcon = "fa fa-home"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("33105BA5-0A40-4C70-852C-BF5F89A662C4"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "LinkedIn",
                    CssClass = "icon linkedin",
                    FontAwesomeIcon = "fa fa-linkedin-square"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("C1036074-3FA5-4ACD-9CF5-8CFF8DB1337E"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Pinterest",
                    CssClass = "icon pinterest",
                    FontAwesomeIcon = "fa fa-pinterest-square"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("B7C6367D-3DF7-491E-98BA-F51E1D70B41B"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Google+",
                    CssClass = "icon google",
                    FontAwesomeIcon = "fa fa-google-plus-official"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("0336CDB3-5CAC-4F6D-90F0-1B1378EA3990"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Spotify",
                    CssClass="icon spotify",
                    FontAwesomeIcon = "fa fa-spotify"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("26C9840B-4496-457D-BFAF-1832C28EF291"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Deezer",
                    CssClass = "icon deezer",
                    FontAwesomeIcon = "fa fa-question"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("67E9D8C7-7266-41A1-9275-3239FA25D04B"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Youtube",
                    CssClass = "icon youtube",
                    FontAwesomeIcon = "fa fa-youtube-square"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("D80118C6-4BEE-41DC-8F87-6E9BAE13DA49"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "MySpace",
                    CssClass = "icon myspace",
                    FontAwesomeIcon = "fa fa-question"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("8A5C85BC-A5C2-4EE2-B1AF-985B183B2C92"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Facebook",
                    CssClass = "icon facebook",
                    FontAwesomeIcon = "fa fa-facebook-official"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("06BA2AEA-8059-4E0E-AAA5-DA28CCE9988F"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "SoundCloud",
                    CssClass = "icon soundcloud",
                    FontAwesomeIcon = "fa fa-soundcloud"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("26FE0A26-7D52-440C-B0A8-31615D508A87"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Twitter",
                    CssClass = "icon twitter",
                    FontAwesomeIcon = "fa fa-twitter"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("D8D55D00-FBDD-40E6-81DF-6B0BD3A259D2"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Vimeo",
                    CssClass = "icon vimeo",
                    FontAwesomeIcon = "fa fa-vimeo"
                });
                this.Db.SocialProfileTypes.Add(new SocialProfileType
                {
                    SocialProfileTypeID = Guid.Parse("2FA22E38-5B89-44B9-AB37-ACFE5C26F393"),
                    Created = DateTime.Now,
                    MediaID = null,
                    Name = "Twitch",
                    CssClass = "icon twitch",
                    FontAwesomeIcon = "fa fa-twitch"
                });
                try
                {
                    Db.SaveChanges();
                    SeedFinished(true);
                }
                catch (DbEntityValidationException ex)
                {
                    HandleDbEntityValidationException(ex);
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }
    }
}
////        static string GetMd5Hash(MD5 md5Hash, string input)
//        {

//            // Convert the input string to a byte array and compute the hash.
//            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

//            // Create a new Stringbuilder to collect the bytes
//            // and create a string.
//            StringBuilder sBuilder = new StringBuilder();

//            // Loop through each byte of the hashed data 
//            // and format each one as a hexadecimal string.
//            for (int i = 0; i < data.Length; i++)
//            {
//                sBuilder.Append(data[i].ToString("x2"));
//            }

//            // Return the hexadecimal string.
//            return sBuilder.ToString();
//        }

//        // Verify a hash against a string.
//        static bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
//        {
//            // Hash the input.
//            string hashOfInput = GetMd5Hash(md5Hash, input);

//            // Create a StringComparer an compare the hashes.
//            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

//            if (0 == comparer.Compare(hashOfInput, hash))
//            {
//                return true;
//            }
//            else
//            {
//                return false;
//            }
//        }

//    }
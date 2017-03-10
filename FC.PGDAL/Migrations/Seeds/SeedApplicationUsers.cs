
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
    public class SeedApplicationUsers : SeedBase
    {
        public string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        // Verify a hash against a string.
        public bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
        {
            // Hash the input.
            string hashOfInput = GetMd5Hash(md5Hash, input);

            // Create a StringComparer an compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    
        public SeedApplicationUsers(string versionID, ContentModel db) : base(versionID, db)
        {
            if (SeedCanRun)
            {
                this.SeedStart();
                //Store MD5 passwords.
                MD5 md5 = System.Security.Cryptography.MD5.Create();
                string password = GetMd5Hash(md5, "Welcome@1");
                string code = GetMd5Hash(md5, "68320");
                string passwordImgHandler = GetMd5Hash(md5, "C0EADCF2#37A2!412D$BDB7@0559BB1C1EE4");
                string codeImgHandler = GetMd5Hash(md5, "201610110304");
                md5.Dispose();
                ApplicationUser developer = new ApplicationUser()
                {
                    UserActivated = true,
                    UserAddress = "Wolfsklauwstraat 3",
                    UserAddressNR = "3",
                    UserEmailAddress = "wesleyvdmeer@ziggo.nl",
                    UserFirstname = "Wesley",
                    UserMiddlename = "van der",
                    UserLastname = "Meer",
                    UserID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"),
                    UserName = "Saphora",
                    UserPassword = password,
                    UserCode = code,
                    UserPhoneNumber = "0031642775321",
                    UserProfileIMG = null,
                    UserCount = 1,
                };

                ApplicationUser FCImageHandler = new ApplicationUser()
                {
                    UserActivated = true,
                    UserAddress = "Wolfsklauwstraat 3",
                    UserAddressNR = "3",
                    UserEmailAddress = "imagehandler@festival-calendar.nl",
                    UserFirstname = "Wesley",
                    UserMiddlename = "van der",
                    UserLastname = "Meer",
                    UserID = Guid.NewGuid(),
                    UserName = "FC_IMG_HANDLER",
                    UserPassword = passwordImgHandler,
                    UserCode = codeImgHandler,
                    UserPhoneNumber = "0031642775321",
                    UserProfileIMG = null,
                    UserCount = 2
                };
                Role anon = new Role();
                anon.Name = "Anonymous";
                anon.RoleID = Guid.Parse("525CDB04-60EC-4C4C-BB78-BA65A1EB2FF7");
                anon.Permissions = new List<Permission>();

                Role role = new Role();
                role.Name = "Developer";
                role.RoleID = Guid.NewGuid();
                role.Permissions = new List<Permission>();

                Role role2 = new Role();
                role2.Name = "Admin";
                role2.RoleID = Guid.NewGuid();
                role2.Permissions = new List<Permission>();

                Role role3 = new Role();
                role3.Name = "EndUser";
                role3.RoleID = Guid.NewGuid();
                role3.Permissions = new List<Permission>();

                Role role4 = new Role();
                role4.Name = "FestivalAdmin";
                role4.RoleID = Guid.NewGuid();
                role4.Permissions = new List<Permission>();

                Role role5 = new Role();
                role5.Name = "ArtistAdmin";
                role5.RoleID = Guid.NewGuid();
                role5.Permissions = new List<Permission>();

                Role role6 = new Role();
                role6.Name = "NewsAdmin";
                role6.RoleID = Guid.NewGuid();
                role6.Permissions = new List<Permission>();

                Role role7 = new Role();
                role7.Name = "UserAdmin";
                role7.RoleID = Guid.NewGuid();
                role7.Permissions = new List<Permission>();

                Role role8 = new Role();
                role8.Name = "Analyzer";
                role8.RoleID = Guid.NewGuid();
                role8.Permissions = new List<Permission>();

                Role role9 = new Role();
                role9.Name = "GenreAdmin";
                role9.RoleID = Guid.NewGuid();
                role9.Permissions = new List<Permission>();

                Role role10 = new Role();
                role10.Name = "Reporter";
                role10.RoleID = Guid.NewGuid();
                role10.Permissions = new List<Permission>();

                Role role11 = new Role();
                role11.Name = "Customer";
                role11.RoleID = Guid.NewGuid();
                role11.Permissions = new List<Permission>();

                Role role12 = new Role();
                role12.Name = "Partner";
                role12.RoleID = Guid.NewGuid();
                role12.Permissions = new List<Permission>();

                Role role13 = new Role();
                role13.Name = "Journalist";
                role13.RoleID = Guid.NewGuid();
                role13.Permissions = new List<Permission>();

                Role role14 = new Role();
                role14.Name = "BannerAdmin";
                role14.RoleID = Guid.NewGuid();
                role14.Permissions = new List<Permission>();

                Role role15 = new Role();
                role15.Name = "SponsorAdmin";
                role15.RoleID = Guid.NewGuid();
                role15.Permissions = new List<Permission>();

                Role role16 = new Role();
                role16.Name = "AnnouncementAdmin";
                role16.RoleID = Guid.NewGuid();
                role16.Permissions = new List<Permission>();

                Role role17 = new Role();
                role17.Name = "RoleAdmin";
                role17.RoleID = Guid.NewGuid();
                role17.Permissions = new List<Permission>();

                Role role18 = new Role();
                role18.Name = "Bot";
                role18.RoleID = Guid.NewGuid();
                role18.Permissions = new List<Permission>();



                Permission p = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "ROOT",
                    Weight = 999999999
                };

                Permission p2 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "IMG_HNDL",
                    Weight = 1000
                };

                Permission p3 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "END_USER",
                    Weight = 10,
                };

                Permission p4 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "ADMIN",
                    Weight = 1000
                };

                Permission p5 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "REPORTER",
                    Weight = 1000
                };

                Permission p6 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "FESTIVAL_ADMIN",
                    Weight = 1000
                };

                Permission p7 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "ANALYZER",
                    Weight = 1000
                };

                Permission p8 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "JOURNALIST",
                    Weight = 100
                };

                Permission p9 = new Permission()
                {
                    PermissionID = Guid.NewGuid(),
                    PermissionKey = "UPLOADER",
                    Weight = 100
                };
                //role.Permissions.Add(p);
                //role2.Permissions.Add(p2);
                //developer.Roles.Add(role);
                //FCImageHandler.Roles.Add(role2);
                Db.P2R.Add(new Permission2Role { P2RID = Guid.NewGuid(), RoleID = role.RoleID, PermissionID = p.PermissionID });
                Db.P2R.Add(new Permission2Role { P2RID = Guid.NewGuid(), RoleID = role2.RoleID, PermissionID = p2.PermissionID });
                Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), RoleID = role.RoleID, UserID = developer.UserID });
                Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), RoleID = role2.RoleID, UserID = FCImageHandler.UserID });

                Db.Permissions.Add(p);
                Db.Permissions.Add(p2);
                Db.Permissions.Add(p3);
                Db.Permissions.Add(p4);
                Db.Permissions.Add(p5);
                Db.Permissions.Add(p6);
                Db.Permissions.Add(p7);
                Db.Permissions.Add(p8);
                Db.Permissions.Add(p9);
                Db.Roles.Add(role);
                Db.Roles.Add(role2);
                Db.Roles.Add(role3);
                Db.Roles.Add(role4);
                Db.Roles.Add(role5);
                Db.Roles.Add(role6);
                Db.Roles.Add(role7);
                Db.Roles.Add(role8);
                Db.Roles.Add(role9);
                Db.Roles.Add(role10);
                Db.Roles.Add(role11);
                Db.Roles.Add(role12);
                Db.Roles.Add(role13);
                Db.Roles.Add(role14);
                Db.Roles.Add(role15);
                Db.Roles.Add(role16);
                Db.Roles.Add(role17);
                Db.Roles.Add(role18);
                Db.Roles.Add(role18);
                Db.ApplicationUsers.Add(developer);
                Db.ApplicationUsers.Add(FCImageHandler);
                try
                {
                    Db.SaveChanges();
                    SeedFinished(true);
                } catch(DbEntityValidationException ex)
                {
                    HandleDbEntityValidationException(ex);
                } catch(Exception ex)
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
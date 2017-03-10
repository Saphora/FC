
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
    public class SeedApplicationUsersV2 : SeedBase
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

    
        public SeedApplicationUsersV2(string versionID, ContentModel db) : base(versionID, db)
        {
            if (SeedCanRun)
            {
                this.SeedStart();
                //Store MD5 passwords.
                MD5 md5 = System.Security.Cryptography.MD5.Create();
                string password = GetMd5Hash(md5, "Welcome@1");
                string password2 = GetMd5Hash(md5, "1Arnhem1");
                string code = GetMd5Hash(md5, "68320");
                string passwordImgHandler = GetMd5Hash(md5, "C0EADCF2#37A2!412D$BDB7@0559BB1C1EE4");
                string codeImgHandler = GetMd5Hash(md5, "201610110304");
                md5.Dispose();

                ApplicationUser developer = new ApplicationUser()
                {
                    UserActivated = true,
                    UserAddress = "Zuidelijke parallelweg",
                    UserAddressNR = "11-2",
                    UserEmailAddress = "info@reggae-agenda.nl",
                    UserFirstname = "Arjen",
                    UserMiddlename = "",
                    UserLastname = "Bloemendaal",
                    UserID = Guid.Parse("AD4E4A1C-C753-4D3E-B1F0-1686DA52DA6C"),
                    UserName = "knurrum",
                    UserPassword = password2,
                    UserCode = code,
                    UserPhoneNumber = "0031628264336",
                    UserProfileIMG = null,
                    UserCount = 1,
                };
                //role.Permissions.Add(p);
                //role2.Permissions.Add(p2);
                //developer.Roles.Add(role);
                //FCImageHandler.Roles.Add(role2);
                Db.ApplicationUsers.Add(developer);
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
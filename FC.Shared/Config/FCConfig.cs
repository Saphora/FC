using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Config
{
    public class FCConfig
    {
       
        public static Guid FestivalMediaDir = Guid.Parse("5b778e5b-a1e4-40b4-a260-51d79890fafa");
        public static Guid UsersDirectoryID = Guid.Parse("52BAE06C-1EE7-4DED-B413-FB6FD1009AB0");
        public static Guid NewsDirectoryID = Guid.Parse("e55379cd-13e3-4180-8b68-07b82e0d6172");
        public static Guid ArtistsDirectoryID = Guid.Parse("bd808f49-dee0-4ec4-9024-dec2a716948a");
        public static Guid LocationsDirectoryID = Guid.Parse("186A264A-75A0-484A-A7F1-BF44B3A631F3");


        public static string MEDIA_ROOT_ID
        {
            get
            {
                if (ConfigurationManager.AppSettings["MEDIA_ROOT_ID"] != null)
                {
                    return ConfigurationManager.AppSettings["MEDIA_ROOT_ID"];
                }
                else
                {
                    throw new Exception("Application setting MEDIA_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string MEDIA_BASE_PATH
        {
            get
            {
                if (ConfigurationManager.AppSettings["MEDIA_BASE_PATH"] != null)
                {
                    return ConfigurationManager.AppSettings["MEDIA_BASE_PATH"];
                }
                else
                {
                    throw new Exception("Application setting MEDIA_BASE_PATH was not found. Check your Web/App.config files.");
                }
            }
        }
        /// <summary>
        /// WEB API URL.
        /// </summary>
        public static string API
        {
            get
            {
                if (ConfigurationManager.AppSettings["API"] != null)
                {
                    return ConfigurationManager.AppSettings["API"];
                }
                else
                {
                    throw new Exception("Application setting API was not found. Check your Web/App.config files.");
                }
            }
        }

        /// <summary>
        /// Temporary cache file path folder for WPF Backoffice.
        /// </summary>
        public static string LOCAL_TMP_DATA_DIR
        {
            get
            {
                if (ConfigurationManager.AppSettings["LOCAL_TMP_DATA_DIR"] != null)
                {
                    return ConfigurationManager.AppSettings["LOCAL_TMP_DATA_DIR"];
                }
                else
                {
                    throw new Exception("Application setting LOCAL_TMP_DATA_DIR was not found. Check your Web/App.config files.");
                }
            }
        }
        
        /// <summary>
        /// The root folder of the SQL files for Code first migrations.
        /// </summary>
        /// 
        public static string SQL_FILE_ROOT
        {
            get
            {
                if (ConfigurationManager.AppSettings["SQL_FILE_ROOT"] != null)
                {
                    return ConfigurationManager.AppSettings["SQL_FILE_ROOT"];
                }
                else
                {
                    throw new Exception("Application setting SQL_FILE_ROOT was not found. Check your Web/App.config files.");
                }
            }
        }
    }
}

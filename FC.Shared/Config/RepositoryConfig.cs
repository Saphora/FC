using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace FC.Shared.Config
{
    public class MediaRepositoryConfig
    {
        /// <summary>
        /// The root folder of the WebAPI.
        /// </summary>
        public static string SERVER_ROOT
        {
            get
            {
                if (ConfigurationManager.AppSettings["SERVER_ROOT"] != null)
                {
                    return ConfigurationManager.AppSettings["SERVER_ROOT"];
                }
                else
                {
                    throw new Exception("Application setting SERVER_ROOT was not found. Check your Web/App.config files.");
                }
            }
        }

        /// <summary>
        /// The relative media path default value is /media/
        /// </summary>
        public static string MEDIA_BASE
        {
            get
            {
                if (ConfigurationManager.AppSettings["MEDIA_BASE"] != null)
                {
                    return ConfigurationManager.AppSettings["MEDIA_BASE"];
                }
                else
                {
                    throw new Exception("Application setting MEDIA_BASE was not found. Check your Web/App.config files.");
                }
            }
        }

        /// <summary>
        /// The absolute media base path e.g(C:/path/to/media/root)
        /// </summary>
        public static string MEDIA_ROOT
        {
            get
            {
                if (ConfigurationManager.AppSettings["MEDIA_ROOT"] != null)
                {
                    return ConfigurationManager.AppSettings["MEDIA_ROOT"];
                }
                else
                {
                    throw new Exception("Application setting MEDIA_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }

        public static Guid MEDIA_ROOT_ID
        {
            get
            {
                if (ConfigurationManager.AppSettings["MEDIA_ROOT_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["MEDIA_ROOT_ID"]);
                }
                else
                {
                    throw new Exception("Application setting MEDIA_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }
        public static Guid ARTIST_DIR_ROOT_ID {
            get {
                if(ConfigurationManager.AppSettings["ARTIST_DIR_ROOT_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["ARTIST_DIR_ROOT_ID"]);
                } else
                {
                    throw new Exception("Application setting ARTIST_DIR_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }

        public static Guid NEWS_DIR_ROOT_ID {
            get {
                if (ConfigurationManager.AppSettings["NEWS_DIR_ROOT_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["NEWS_DIR_ROOT_ID"]);
                }
                else
                {
                    throw new Exception("Application setting NEWS_DIR_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }

        public static Guid FESTIVAL_DIR_ROOT_ID {
            get {
                if (ConfigurationManager.AppSettings["FESTIVAL_DIR_ROOT_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["FESTIVAL_DIR_ROOT_ID"]);
                }
                else
                {
                    throw new Exception("Appsetting FESTIVAL_DIR_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }

        public static Guid REPORT_DIR_ROOT_ID
        {
            get
            {
                if (ConfigurationManager.AppSettings["REPORT_DIR_ROOT_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["REPORT_DIR_ROOT_ID"]);
                }
                else
                {
                    throw new Exception("Appsetting REPORT_DIR_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }

        public static Guid APPUSER_DIR_ROOT_ID
        {
            get
            {
                if (ConfigurationManager.AppSettings["APPUSER_DIR_ROOT_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["APPUSER_DIR_ROOT_ID"]);
                }
                else
                {
                    throw new Exception("Appsetting APPUSER_DIR_ROOT_ID was not found. Check your Web/App.config files.");
                }
            }
        }
    }
}

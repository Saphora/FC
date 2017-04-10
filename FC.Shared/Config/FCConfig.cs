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
        public static string SMTP_SERVER
        {
            get
            {
                if (ConfigurationManager.AppSettings["SMTP_SERVER"] != null)
                {
                    return ConfigurationManager.AppSettings["SMTP_SERVER"];
                }
                else
                {
                    throw new Exception("Application setting SMTP_SERVER was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string IMAP_SERVER
        {
            get
            {
                if (ConfigurationManager.AppSettings["IMAP_SERVER"] != null)
                {
                    return ConfigurationManager.AppSettings["IMAP_SERVER"];
                }
                else
                {
                    throw new Exception("Application setting IMAP_SERVER was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string RELAY_SERVER
        {
            get
            {
                if (ConfigurationManager.AppSettings["RELAY_SERVER"] != null)
                {
                    return ConfigurationManager.AppSettings["RELAY_SERVER"];
                }
                else
                {
                    throw new Exception("Application setting RELAY_SERVER was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string IMAP_PORT
        {
            get
            {
                if (ConfigurationManager.AppSettings["IMAP_PORT"] != null)
                {
                    return ConfigurationManager.AppSettings["IMAP_PORT"];
                }
                else
                {
                    throw new Exception("Application setting IMAP_PORT was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string SMTP_PORT
        {
            get
            {
                if (ConfigurationManager.AppSettings["SMTP_PORT"] != null)
                {
                    return ConfigurationManager.AppSettings["SMTP_PORT"];
                }
                else
                {
                    throw new Exception("Application setting SMTP_PORT was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string INFO_MAIL_NL
        {
            get
            {
                if (ConfigurationManager.AppSettings["INFO_MAIL_NL"] != null)
                {
                    return ConfigurationManager.AppSettings["INFO_MAIL_NL"];
                }
                else
                {
                    throw new Exception("Application setting INFO_MAIL_NL was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string INFO_MAIL_NL_PASSWORD
        {
            get
            {
                if (ConfigurationManager.AppSettings["INFO_MAIL_NL_PASSWORD"] != null)
                {
                    return ConfigurationManager.AppSettings["INFO_MAIL_NL_PASSWORD"];
                }
                else
                {
                    throw new Exception("Application setting INFO_MAIL_NL_PASSWORD was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string NOREPLY_MAIL_NL
        {
            get
            {
                if (ConfigurationManager.AppSettings["NOREPLY_MAIL_NL"] != null)
                {
                    return ConfigurationManager.AppSettings["NOREPLY_MAIL_NL"];
                }
                else
                {
                    throw new Exception("Application setting NOREPLY_MAIL_NL was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string NOREPLY_MAIL_NL_PASSWORD
        {
            get
            {
                if (ConfigurationManager.AppSettings["NOREPLY_MAIL_NL_PASSWORD"] != null)
                {
                    return ConfigurationManager.AppSettings["NOREPLY_MAIL_NL_PASSWORD"];
                }
                else
                {
                    throw new Exception("Application setting NOREPLY_MAIL_NL_PASSWORD was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string WESLEY_MAIL_NL
        {
            get
            {
                if (ConfigurationManager.AppSettings["WESLEY_MAIL_NL"] != null)
                {
                    return ConfigurationManager.AppSettings["WESLEY_MAIL_NL"];
                }
                else
                {
                    throw new Exception("Application setting WESLEY_MAIL_NL was not found. Check your Web/App.config files.");
                }
            }
        }

        public static string WESLEY_MAIL_NL_PASSWORD
        {
            get
            {
                if (ConfigurationManager.AppSettings["WESLEY_MAIL_NL_PASSWORD"] != null)
                {
                    return ConfigurationManager.AppSettings["WESLEY_MAIL_NL_PASSWORD"];
                }
                else
                {
                    throw new Exception("Application setting WESLEY_MAIL_NL_PASSWORD was not found. Check your Web/App.config files.");
                }
            }
        }

        public static List<string> Domains
        {
            get
            {
                int index = 1;
                List<string> result = new List<string>();
                while (index <= 100)
                {
                    if (ConfigurationManager.AppSettings.AllKeys.Contains("DOMAIN_" + index))
                    {
                        string val = ConfigurationManager.AppSettings["DOMAIN_" + index];
                        result.Add(val);
                        index++;
                    }
                    else
                    {
                        break;
                    }
                }
                return result;
            }
        }

        public static Guid UploadStateKey = Guid.Parse("4C3A3ADE-CCD0-4CAC-A46A-1E8410DDA79C");
        public static Guid FestivalMediaDir = Guid.Parse("5b778e5b-a1e4-40b4-a260-51d79890fafa");
        public static Guid UsersDirectoryID = Guid.Parse("52BAE06C-1EE7-4DED-B413-FB6FD1009AB0");
        public static Guid NewsDirectoryID = Guid.Parse("e55379cd-13e3-4180-8b68-07b82e0d6172");
        public static Guid ArtistsDirectoryID = Guid.Parse("bd808f49-dee0-4ec4-9024-dec2a716948a");
        public static Guid LocationsDirectoryID = Guid.Parse("186A264A-75A0-484A-A7F1-BF44B3A631F3");

        public static Guid? ANON_USER_ID
        {
            get
            {
                if (ConfigurationManager.AppSettings["ANON_USER_ID"] != null)
                {
                    return Guid.Parse(ConfigurationManager.AppSettings["ANON_USER_ID"]);
                }
                else
                {
                    throw new Exception("Application setting ANON_USER_ID was not found. Check your Web/App.config files.");
                }
            }
        }

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
                    throw new Exception("Application setting MEDIA_ROOT was not found. Check your Web/App.config files.");
                }
            }
        }
        public static string DEFAULT_THUMB
        {
            get
            {
                if (ConfigurationManager.AppSettings["DEFAULT_THUMB"] != null)
                {
                    return ConfigurationManager.AppSettings["DEFAULT_THUMB"];
                }
                else
                {
                    throw new Exception("Application setting DEFAULT_THUMB was not found. Check your Web/App.config files.");
                }
            }
        }
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

        public static string RECAPTCHA_PUBLIC
        {
            get
            {
                if (ConfigurationManager.AppSettings["RECAPTCHA_PUBLIC"] != null)
                {
                    return ConfigurationManager.AppSettings["RECAPTCHA_PUBLIC"];
                }
                else
                {
                    throw new Exception("Application setting RECAPTCHA_PUBLIC was not found. Check your Web/App.config files.");
                }
            }
        }
        public static string RECAPTCHA_PRIVATE
        {
            get
            {
                if (ConfigurationManager.AppSettings["RECAPTCHA_PRIVATE"] != null)
                {
                    return ConfigurationManager.AppSettings["RECAPTCHA_PRIVATE"];
                }
                else
                {
                    throw new Exception("Application setting RECAPTCHA_PRIVATE was not found. Check your Web/App.config files.");
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

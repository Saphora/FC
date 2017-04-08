using FC.BL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace FC.WebMVC.Helpers
{
    public static class HtmlHelpers
    {
        /// <summary>
        /// Get the thumbnail image source by MediaID
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="MediaID"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <returns></returns>
        public static string Thumbnail(this HtmlHelper helper, Guid? MediaID, int width = 150, int height = 150)
        {
            if (MediaID != null)
            {
                return FC.Shared.Config.FCConfig.API + "/" + MediaID.Value.ToString() + ".img?&thumb=true&width=" + width + "&height=" + height;
            }
            return FC.Shared.Config.FCConfig.DEFAULT_THUMB;
        }

        /// <summary>
        /// Get a resized image (based upon width and height). When cropping, the center of the image shall be returned, also when cropping the image resizes height to crop height.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="MediaID"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="crop"></param>
        /// <returns></returns>
        public static string Image(this HtmlHelper helper, Guid? MediaID, int width, int height, bool crop = true)
        {
            if (MediaID != null)
            {
                return FC.Shared.Config.FCConfig.API + "/" + MediaID.Value.ToString() + ".img?&width=" + width + "&height=" + height + "&crop=" + (crop ? "true" : "false");
            }
            return FC.Shared.Config.FCConfig.DEFAULT_THUMB;
        }

        /// <summary>
        /// Get the image unmodified
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="MediaID"></param>
        /// <returns></returns>
        public static string RawImage(this HtmlHelper helper, Guid? MediaID)
        {
            if (MediaID != null)
            {
                return FC.Shared.Config.FCConfig.API + "/" + MediaID.Value.ToString() + ".img";
            }
            return FC.Shared.Config.FCConfig.DEFAULT_THUMB;
        }

        /// <summary>
        /// Checks if the CurrentUser in auth repository has the correct view action roles.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="roles"></param>
        /// <returns></returns>
        public static bool HasViewAuth(this HtmlHelper helper, string[] roles)
        {
            if (RepositoryContext.GetInstance().Auth.CurrentUser != null)
            {
                if (roles.Count() == 0)
                {
                    return true;
                }
                else
                {
                    return RepositoryContext.GetInstance().Auth.UserHasRoles(roles);
                }
            }
            else
            {
                return false;
            }
        }
    }
}
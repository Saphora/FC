using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Configuration;
using System.IO;
using FC.Shared.Entities;
using Newtonsoft.Json.Linq;
using FC.Shared.ServerMessages;
using FC.BL.Repositories;

namespace FC.WebAPI.Controllers.API
{
    public class UploadController : BaseAPIController
    {
        private string MediaRootDir { get; set; }
        private MediaRepository repo { get; set; }
        public UploadController()
        {
            MediaRootDir = ConfigurationManager.AppSettings["MediaBasePath"];
            repo = new MediaRepository();
        }

        [HttpOptions, HttpPost]
        public bool Handle()
        {
            MediaDirectory result = new MediaDirectory();
            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            int filesLength = files.AllKeys.Count()-1;
            result.DirectoryID = Guid.Parse(HttpContext.Current.Request.Form["DirectoryID"]);
            HttpContext.Current.Response.Headers.Add("content-type", "application/json");
            string abspath = HttpContext.Current.Server.MapPath("~/" + MediaRootDir);
            for (int i = 0;i <= filesLength; i++)
            {
                if(Directory.Exists(abspath))
                {
                    try
                    {
                        HttpPostedFile f = files[i];
                        Media m = new Media
                        {
                            MediaID = Guid.NewGuid(),
                            DirectoryID = result.DirectoryID,
                            Name = f.FileName
                        };
                        string path = abspath + "/" + result.DirectoryID.ToString();
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        if (File.Exists(path + "/" + f.FileName))
                        {
                            int count = Directory.GetFileSystemEntries(path).Where(w => w.Contains(Path.GetFileNameWithoutExtension(path + "/" + f.FileName))).Count();
                            FileInfo fi = new FileInfo(path + "/" + f.FileName);
                            string nFileName = Path.GetFileNameWithoutExtension(path + "/" + f.FileName) + "_" + count +fi.Extension;
                            m.Name = Path.GetFileNameWithoutExtension(path + "/" + f.FileName) + "_" + count + fi.Extension;
                            m.FileName = MediaRootDir + result.DirectoryID + '/' + m.Name;

                            f.SaveAs(path + "/" + nFileName);
                        }
                        else
                        {
                            f.SaveAs(path + "/" + f.FileName);
                            m.Name = f.FileName;
                            m.FileName = MediaRootDir + result.DirectoryID + '/' + f.FileName;
                        }

                        if (File.Exists(HttpContext.Current.Server.MapPath("~/" + m.FileName))) {
                           // repo.CreateMedia(m);
                        } else
                        {
                            throw new Exception("File: "+ HttpContext.Current.Server.MapPath("~/" + m.FileName)+" not exists" );
                        }
                    } catch(Exception ex)
                    {
                        throw ex;
                    }
                    
                } else
                {
                    throw new DirectoryNotFoundException("The path: "+abspath+" is not found!");
                }
            }
            return true;
        }
    }
}

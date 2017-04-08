using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

using FC.Shared.EntityMapper;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using Newtonsoft.Json.Linq;
using FC.Shared.ViewModels;
using FC.Shared.ViewModels.Search;
using FC.Interfaces.ViewModels;
using FC.Shared.ServerMessages;
using FC.Shared.ViewModels.Festival;
using FC.BL.Repositories;
using System.Configuration;
using System.IO;
using System.Text;
using FC.Shared.Config;
using System.Drawing;

namespace FC.WebAPI.Controllers.API
{
    public class MediaController : BaseAPIController
    {
        MD5 MD5Hasher;
        MediaRepository repo = new MediaRepository();
        public MediaController() : base()
        {
            MD5Hasher = MD5.Create();
        }

        [HttpGet]
        public ServiceResponse<MediaDirectory> GetRoot()
        {
            return new ServiceResponse<MediaDirectory>(repo.GetRoot(), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<List<MediaDirectory>> GetDirectories()
        {
            var result = repo.GetDirectories();
            return new ServiceResponse<List<MediaDirectory>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<Media> GetByID(Guid? id)
        {
            return new ServiceResponse<Media>(repo.GetByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }
        [HttpGet]
        public ServiceResponse<MediaDirectory> GetDirByID(Guid? id)
        {
            return new ServiceResponse<MediaDirectory>(repo.GetDirectoryByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<MediaDirectory> HandleUploaded(Guid? id)
        {
            var state = this.GetStateByKey(FCConfig.UploadStateKey);
            return new ServiceResponse<MediaDirectory>(repo.GetDirectoryByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken, state);
        }


        [HttpGet]
        public ServiceResponse<List<Media>> GetDirectoryMedia(Guid? id)
        {
            return new ServiceResponse<List<Media>>(repo.GetMediaByDirectoryID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<List<MediaDirectory>> GetChildren(Guid? id)
        {
            return new ServiceResponse<List<MediaDirectory>>(repo.GetChildren(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpPost, HttpOptions]
        public ServiceResponse<RepositoryState> CreateDirectory([FromBody]JObject payload)
        {
            ServiceMessage<MediaDirectoryMsg> media = new ServiceMessage<MediaDirectoryMsg>(payload);
            return this.HandleRepositoryState(repo.CreateMediaDirectory(media.Data));

        }

        [HttpPost, HttpOptions]
        public ServiceResponse<RepositoryState> EditDirectory([FromBody]JObject payload)
        {
            ServiceMessage<MediaDirectory> media = new ServiceMessage<MediaDirectory>(payload);
            return this.HandleRepositoryState(repo.UpdateMediaDirectory(media.Data));

        }

        [HttpGet]
        public ServiceResponse<RepositoryState> DeleteMedia(Guid? mediaID)
        {
            try
            {
                if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
                {
                    return this.HandleRepositoryState(repo.DeleteMedia(mediaID));
                } else
                {
                    return NotAuthorized();
                }
            }
            catch (Exception e)
            {
                return this.HandleException<RepositoryState>(e);
            }
        }

        [HttpGet]
        public ServiceResponse<RepositoryState> DeleteMediaDir(Guid id)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                try
                {
                    RepositoryState state = this.repo.DeleteDirectory(id);
                    return new ServiceResponse<RepositoryState>(state, HttpStatusCode.OK, state.MSG, this.Repositories.Auth.ActiveToken);
                }
                catch (Exception ex)
                {
                    return this.HandleException<RepositoryState>(ex);
                }
            } else
            {
                return NotAuthorized();
            }
        }

        [HttpPost, HttpOptions]
        public async Task<ServiceResponse<RepositoryState>> Upload(Guid dirID, Guid token, int width = 0, int height = 0, bool thumb = false) {
            
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAllPublic()))
            {
                HttpContext.Current.Response.Headers.Add("enctype", "multipart/form-data");
                string absoluteMediaBase = MediaRepositoryConfig.MEDIA_ROOT;
                string MediaBase = MediaRepositoryConfig.MEDIA_BASE;
                List<Media> dir = repo.GetMediaByDirectoryID(dirID);
                if (dir.Count() == 50)
                {
                    return this.HandleRepositoryState(
                        new RepositoryState
                        {
                            SUCCESS = false,
                            MSG = "Max. file count for this directory exceeded.",
                        }, FCConfig.UploadStateKey);
                }
                else
                {
                    try
                    {
                        if (Request.Content.IsMimeMultipartContent())
                        {
                            string rootpath = Path.Combine(absoluteMediaBase, dirID.ToString());
                            if(!Directory.Exists(rootpath))
                            {
                                Directory.CreateDirectory(rootpath);
                            }
                            MultipartFormDataStreamProvider strProvider = new MultipartFormDataStreamProvider(rootpath);
                            await Request.Content.ReadAsMultipartAsync(strProvider);
                            foreach (MultipartFileData fileData in strProvider.FileData)
                            {
                                string fileName = fileData.Headers.ContentDisposition.FileName;
                                if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                                {
                                    fileName = fileName.Trim('"');
                                }
                                if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                                {
                                    fileName = Path.GetFileName(fileName);
                                }
                                Guid? mediaTypeID = repo.GetMediaTypeIDByMime(fileData.Headers.ContentType.MediaType);
                                byte[] fileBytes = File.ReadAllBytes(fileData.LocalFileName);
                                int length = fileBytes.Length;
                                Media m = new Media();
                                m.FileName = Path.Combine(MediaBase, dirID.ToString(), fileName);
                                m.Name = fileName;
                                m.MediaTypeID = mediaTypeID;
                                m.MD5Checksum = GetMd5Hash(MD5Hasher, fileBytes);
                                m.Created = DateTime.Now;
                                m.AuthorID = AuthRepo.CurrentUser.UserID;
                                m.DirectoryID = dirID;
                                m.Height = height.ToString();
                                m.Width = width.ToString();
                                m.IsThumbNail = thumb;
                                m.Size = length;
                                m.Modified = null;
                                m.Deleted = false;
                                m.ArchiveDate = null;

                                string newFile = Path.Combine(absoluteMediaBase, dirID.ToString(), fileName);
                                FileInfo finfo = new FileInfo(fileData.LocalFileName);
                                if(length > 2097152) //2Mb
                                {
                                    return this.HandleRepositoryState(new RepositoryState() { INVALID = true, MSG = "File is to large, 2MB is the maximum" }, FCConfig.UploadStateKey);
                                }
                                int bmpWidth = 0;
                                int bmpHeight = 0;
                                using (Image bmp = new Bitmap(fileData.LocalFileName))
                                {
                                    bmpHeight = bmp.Height;
                                    bmpWidth = bmp.Width;
                                }
                                if (width != 0 && height != 0)
                                {
                                    if (thumb == false)
                                    {
                                        if (bmpWidth == width && bmpHeight == height)
                                        {
                                            File.Move(fileData.LocalFileName, newFile);
                                            if (File.Exists(newFile))
                                            {
                                                repo.CreateMedia(m);
                                            }
                                        }
                                        else
                                        {
                                            return this.HandleRepositoryState(new RepositoryState() { INVALID = true, MSG = string.Format("Image size invalid, it should be width:{0}, height:{1} pixels", width, height) }, FCConfig.UploadStateKey);
                                        }
                                    }
                                    else
                                    {
                                        if (bmpWidth >= width && bmpHeight >= height && bmpHeight == bmpWidth)
                                        {
                                            File.Move(fileData.LocalFileName, newFile);
                                            if (File.Exists(newFile))
                                            {
                                                repo.CreateMedia(m);
                                            }
                                        }
                                        else
                                        {
                                            return this.HandleRepositoryState(new RepositoryState() { INVALID = true, MSG = string.Format("Image size is not valid, it should be at least width:{0}, height:{1} pixels", width, height) }, FCConfig.UploadStateKey);
                                        }
                                    }
                                }
                                else
                                {
                                    File.Move(fileData.LocalFileName, newFile);
                                    if (File.Exists(newFile))
                                    {
                                        repo.CreateMedia(m);
                                    }
                                }
                            }
                            return this.HandleRepositoryState(new RepositoryState() { SUCCESS = true, MSG = "Media successfully uploaded to server. " },FCConfig.UploadStateKey);
                        }
                        else
                        {
                            return this.HandleRepositoryState(new RepositoryState(), FCConfig.UploadStateKey);
                        }
                    }
                    catch (Exception ex)
                    {
                        return this.HandleException<RepositoryState>(ex);
                    }
                }
            } else
            {
                return NotAuthorized();
            }
        }
    }
}

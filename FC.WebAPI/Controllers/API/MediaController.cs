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
            return new ServiceResponse<MediaDirectory>(repo.GetRoot(), HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<List<MediaDirectory>> GetDirectories()
        {
            var result = repo.GetDirectories();
            return new ServiceResponse<List<MediaDirectory>>(result, HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<Media> GetByID(Guid? id)
        {
            return new ServiceResponse<Media>(repo.GetByID(id), HttpStatusCode.OK, "OK");
        }
        [HttpGet]
        public ServiceResponse<MediaDirectory> GetDirByID(Guid? id)
        {
            return new ServiceResponse<MediaDirectory>(repo.GetDirectoryByID(id), HttpStatusCode.OK, "OK");
        }


        [HttpGet]
        public ServiceResponse<List<Media>> GetDirectoryMedia(Guid? id)
        {
            return new ServiceResponse<List<Media>>(repo.GetMediaByDirectoryID(id), HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<List<MediaDirectory>> GetChildren(Guid? id)
        {
            return new ServiceResponse<List<MediaDirectory>>(repo.GetChildren(id), HttpStatusCode.OK, "OK");
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
                    return new ServiceResponse<RepositoryState>(state, HttpStatusCode.OK, state.MSG);
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
        public async Task<ServiceResponse<RepositoryState>> Upload(Guid dirID, Guid token, string width = "0", string height = "0", bool thumb = false) {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                HttpContext.Current.Response.Headers.Add("enctype", "multipart/form-data");
                string absoluteMediaBase = MediaRepositoryConfig.MEDIA_ROOT;
                string MediaBase = MediaRepositoryConfig.MEDIA_BASE;
                List<Media> dir = repo.GetMediaByDirectoryID(dirID);
                if (dir.Count() == 20)
                {
                    return new ServiceResponse<RepositoryState>(
                        new RepositoryState
                        {
                            SUCCESS = false,
                            MSG = "Max. file count for this directory exceeded.",
                        }
                        , HttpStatusCode.InternalServerError, "Max.file count for this directory exceeded.");
                }
                else
                {
                    try
                    {
                        if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins(), token))
                        {
                            if (Request.Content.IsMimeMultipartContent())
                            {
                                string rootpath = Path.Combine(absoluteMediaBase, dirID.ToString());
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
                                    m.Height = height;
                                    m.Width = width;
                                    m.IsThumbNail = thumb;
                                    m.Size = length;
                                    m.Modified = null;
                                    m.Deleted = false;
                                    m.ArchiveDate = null;

                                    string newFile = Path.Combine(absoluteMediaBase, dirID.ToString(), fileName);

                                    if(File.Exists(newFile))
                                    {
                                        return this.HandleRepositoryState(new RepositoryState() { SUCCESS = true, MSG = "Media successfully uploaded to server. " });
                                    }

                                    File.Move(fileData.LocalFileName, newFile);
                                    if (File.Exists(newFile))
                                    {
                                        repo.CreateMedia(m);
                                    }
                                }
                                return this.HandleRepositoryState(new RepositoryState() { SUCCESS = true, MSG = "Media successfully uploaded to server. " });
                            }
                            else
                            {
                                return this.HandleRepositoryState(new RepositoryState());
                            }
                        }
                        else
                        {
                            return NotAuthorized();
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

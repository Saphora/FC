using FC.BL.Validation;
using FC.Shared.Entities;
using FC.Shared.ServerMessages;
using FC.Shared.Config;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using FC.Interfaces.Data;
using System.Security.Cryptography;

namespace FC.BL.Repositories
{
    public class MediaRepository : BaseRepository
    {
        private List<MediaDirectory> directories { get; set; }

        public MediaRepository()
            :base()
        {
            directories = new List<MediaDirectory>();
        }

        public string GetMd5Hash(byte[] bytes)
        {
            MD5 md5Hash = MD5.Create();
            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(bytes);

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

        public MediaDirectory GetRoot()
        {
            MediaDirectory r = Db.MediaDirectories.Find(Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF"));
            r.Media = Db.Media.Where(w => w.DirectoryID == r.DirectoryID).OrderBy(o => o.Name).ToList();
            return r;
        }

        public Guid? GetMediaTypeIDByMime(string mimeType)
        {
            if (Db.MimeTypes.Where(w => w.Name == mimeType).Any())
            {
                MimeType m = Db.MimeTypes.Where(w => w.Name == mimeType).FirstOrDefault();
                MediaType t = Db.MT2MT.Where(w => w.MimeTypeID == m.MimeTypeID).Select(s => s.MediaType).FirstOrDefault();
                return t.MediaTypeID;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Get directories based on their parent id.
        /// </summary>
        /// <param name="parentID"></param>
        /// <returns></returns>
        public List<MediaDirectory> GetDirectories(Guid? parentID=null)
        {
            if (parentID == null)
            {
                parentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF");
            }
            List<MediaDirectory> dbResult = Db.MediaDirectories.Where(w => w.ParentID == parentID && w.IsDeleted == false).OrderBy(o => o.Name).ToList();
            return dbResult;
        }
        
        public Media GetByID(Guid? id)
        {
            Media m = Db.Media.Find(id);
            if (m != null)
            {
                if (m.IsDeleted == false)
                {
                    return m;
                }
                else
                {
                    return null;
                }
            } else
            {
                return null;
            }
        }

        public List<Media> GetMediaByDirectoryID(Guid? id)
        {
            List<Media> m = Db.Media.Where(w => w.DirectoryID == id && w.IsDeleted == false).OrderBy(o=>o.Name).ToList();
            return m;
        }

        public MediaDirectory GetDirectoryByID(Guid? id)
        {
            if (id != null)
            {
                MediaDirectory r = Db.MediaDirectories.Find(id);
                r.Media = GetMediaByDirectoryID(id);
                r.Children = GetDirectories(r.DirectoryID);
                return r;
            } else
            {
                return null;
            }
        }

        public List<MediaDirectory> GetChildren(Guid? id)
        {
            List<MediaDirectory> result = Db.MediaDirectories.Where(w => w.ParentID == id).OrderBy(o => o.Name).ToList();
            return result;
        }

        public RepositoryState CreateMedia(Media media)
        {
            try
            {
                media.MediaID = Guid.NewGuid();
                List<IValidationError> errors = this.Validate<Media>(media);
                MediaDirectory dir = Db.MediaDirectories.Find(media.DirectoryID);
                if(dir.IsDeleted)
                {
                    throw new Exception("Cannot write to deleted folders.");
                }
                if (errors.Count() == 0)
                {
                    this.Db.Media.Add(media);
                    this.Db.SaveChanges();
                    return new RepositoryState { AffectedID = media.MediaID, SUCCESS = true, MSG = $"Media {media.Name} successfully created." };
                } else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }

        public RepositoryState UpdateMedia(Media media)
        {
            try
            {

                Media m = Db.Media.Find(media.MediaID);
                m.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                m.DirectoryID = media.DirectoryID;
                m.ExternalURL = media.ExternalURL;
                m.FileMimeType = media.FileMimeType;
                m.FileName = media.FileName;
                m.Modified = DateTime.Now;
                m.Width = media.Width;
                m.Height = media.Height;
                m.MediaURL = media.MediaURL;
                m.MediaTypeID = media.MediaTypeID;
                m.ObsoleteID = media.ObsoleteID;
                m.IsThumbNail = media.IsThumbNail;
                List<IValidationError> errors = this.Validate<Media>(media);
                if (errors.Count() == 0)
                {
                    Db.Entry<Media>(media).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    this.Status = new RepositoryState() { AffectedID = media.MediaID, SUCCESS = true, MSG = $"Media {media.Name} successfully modified." };
                    return this.Status;
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }

        public RepositoryState DeleteMedia(Guid? id)
        {
            try { 
                Media m = Db.Media.Find(id);

                m.IsDeleted = true;
                m.ArchiveDate = DateTime.Now.AddDays(180);
                m.Modified = DateTime.Now;
                Db.Entry<Media>(m).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID = id, SUCCESS = true, MSG = $"Media {m.Name} successfully deleted." };
                return this.Status;
                
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }


        public RepositoryState ForceDeleteMedia(Guid? id)
        {
            try
            {
                Media m = Db.Media.Find(id);
                m.IsDeleted = true;
                m.ArchiveDate = DateTime.Now.AddDays(180);
                m.Modified = DateTime.Now;
                Db.Entry<Media>(m).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID = id, SUCCESS = true, MSG = $"Media {m.Name} successfully deleted with force." };
                return this.Status;

            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }

        public RepositoryState DeleteDirectory(Guid? id)
        {
            try
            {
                MediaDirectory d = Db.MediaDirectories.Find(id);
                d.IsDeleted = true;
                d.ArchiveDate = DateTime.Now.AddDays(180);
                Db.Entry<MediaDirectory>(d).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID = id,  SUCCESS = true, MSG = $"Directory {d.Name} successfully removed." };
                return this.Status;
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Directory not removed. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Directory not removed. Please try again later.");
            }
        }

        public RepositoryState ForceDeleteDirectory(Guid? id)
        {
            try
            {
                MediaDirectory d = Db.MediaDirectories.Find(id);
                List<Media> media = Db.Media.Where(w => w.DirectoryID == id).ToList();
                foreach(Media m in media)
                {
                    string fileName = Path.Combine(MediaRepositoryConfig.SERVER_ROOT, m.FileName);
                    if(File.Exists(fileName))
                    {
                        File.Delete(fileName);
                        Db.Media.Remove(Db.Media.Find(m.MediaID));
                    }
                }
                if(Directory.Exists(Path.Combine(MediaRepositoryConfig.MEDIA_ROOT, d.DirectoryID.ToString())))
                {
                    Directory.Delete(Path.Combine(MediaRepositoryConfig.MEDIA_ROOT, d.DirectoryID.ToString()));
                }
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID =d.DirectoryID, SUCCESS = true, MSG = $"Directory {d.Name} successfully removed." };
                return this.Status;
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Directory not removed. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Directory not removed. Please try again later.");
            }
        }


        public RepositoryState CreateMediaDirectory(MediaDirectoryMsg msg)
        {
            try
            {

                string absBasePath = MediaRepositoryConfig.MEDIA_ROOT;
                string basePath = MediaRepositoryConfig.MEDIA_BASE;

                MediaDirectory dir = new MediaDirectory()
                {
                    DirectoryID = Guid.NewGuid(),
                    ParentID = msg.ParentID,
                    Media = new List<Media>(),
                    Name = msg.DirectoryName,
                    AuthorID = AuthorizationRepository.Current.CurrentUser.UserID,
                    Created = DateTime.Now
                };

                if (msg.DirectoryID != null)
                {
                    dir.DirectoryID = msg.DirectoryID;
                }
                List<IValidationError> errors = this.Validate<MediaDirectory>(dir);
                if (errors.Count == 0)
                {
                    string p = Path.Combine(new string[] { absBasePath, dir.DirectoryID.ToString() });
                    Directory.CreateDirectory(p);
                    bool result = Db.MediaDirectories.Where(w => w.ParentID == dir.ParentID && w.Name == dir.Name).Any();
                    if (Directory.Exists(p) && result == false)
                    {
                        Db.MediaDirectories.Add(dir);
                        Db.SaveChanges();
                    }
                    else
                    {
                        throw new Exception($"Directory {dir.Name} in directory {Db.MediaDirectories.Find(dir.ParentID).Name} already exists");
                    }
                    this.Status = new RepositoryState() { AffectedID = dir.DirectoryID, SUCCESS = true, MSG = $"Directory {dir.Name} successfully created." };
                    return this.Status;
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }
        public RepositoryState CreateMediaDirectory(MediaDirectory dir)
        {
            try
            {
                string absBasePath = MediaRepositoryConfig.MEDIA_ROOT;
                string basePath = MediaRepositoryConfig.MEDIA_BASE;
                List<IValidationError> errors = this.Validate<MediaDirectory>(dir);
                if (errors.Count == 0)
                {
                    string p = Path.Combine(new string[] { absBasePath, dir.DirectoryID.ToString() });
                    Directory.CreateDirectory(p);
                    bool result = Db.MediaDirectories.Where(w => w.ParentID == dir.ParentID && w.Name == dir.Name).Any();
                    if (Directory.Exists(p) && result == false)
                    {
                        Db.MediaDirectories.Add(dir);
                        Db.SaveChanges();
                    }
                    else
                    {
                        throw new Exception($"Directory {dir.Name} in directory {Db.MediaDirectories.Find(dir.ParentID).Name} already exists");
                    }
                    this.Status = new RepositoryState() { AffectedID = dir.DirectoryID, SUCCESS = true, MSG = $"Directory {dir.Name} successfully created." };
                    return this.Status;
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }

        public RepositoryState UpdateMediaDirectory(MediaDirectory mediaDir)
        {
            try
            {
                MediaDirectory md = this.Db.MediaDirectories.Find(mediaDir.DirectoryID);
                md.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                md.Modified = DateTime.Now;
                md.Name = mediaDir.Name;
                md.ParentID = mediaDir.ParentID;
                Db.Entry<MediaDirectory>(md).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                this.Status = new RepositoryState() { AffectedID = md.DirectoryID, SUCCESS = true, MSG = $"Directory {md.Name} successfully modified." };
                return this.Status;
            }
            catch (DbEntityValidationException ex)
            {
                return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
            }
            catch (Exception ex)
            {
                return new RepositoryState() { Exception = ex, ERROR = true, MSG = ex.Message };
            }
        }
        
        public Media GetByObsoleteID(int obsoleteId)
        {
            return this.Db.Media.Where(w => w.ObsoleteID == obsoleteId).FirstOrDefault();
        }
    }
}

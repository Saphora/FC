
using FC.MSDAL;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedAlbumIDs : SeedBase
    {
        public SeedAlbumIDs(string versionID, ContentModel db) : base(versionID, db)
        {
            SeedName = "SeedAlbumIDs";
            string basePath = ConfigurationManager.AppSettings["AbsoluteMediaBasePath"];
            SeedStart();
            if (SeedCanRun)
            {
                try
                {
                    foreach (ApplicationUser user in Db.ApplicationUsers.ToList())
                    {
                        //user.MediaDirectoryID = Guid.NewGuid();
                        //MediaDirectory album = new MediaDirectory
                        //{
                        //    DirectoryID = user.MediaDirectoryID,
                        //    AuthorID = user.UserID,
                        //    Created = DateTime.Now,
                        //    Name = user.UserName,
                        //    ParentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF")
                        //};
                        //Db.MediaDirectories.Add(album);
                        //Db.SaveChanges();
                        MediaDirectory album = Db.MediaDirectories.Find(user.MediaDirectoryID);
                        string path = Path.Combine(new string[] { basePath, album.DirectoryID.ToString() });
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        //Db.Entry<ApplicationUser>(user).State = System.Data.Entity.EntityState.Modified;
                        //Db.SaveChanges();
                    }
                    foreach (UFestival f in Db.Festivals.ToList())
                    {
                        //f.MediaDirectoryID = Guid.NewGuid();
                        //MediaDirectory album = new MediaDirectory
                        //{
                        //    DirectoryID = f.MediaDirectoryID,
                        //    AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"),
                        //    Created = DateTime.Now,
                        //    Name = f.Name,
                        //    ParentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF")
                        //};
                        //Db.MediaDirectories.Add(album);
                        //Db.SaveChanges();
                        MediaDirectory album = Db.MediaDirectories.Find(f.MediaDirectoryID);
                        string path = Path.Combine(new string[] { basePath, album.DirectoryID.ToString() });
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }

                        //Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Modified;
                        //Db.SaveChanges();
                    }
                    foreach (UArtist a in Db.Artists.ToList())
                    {
                        //a.MediaDirectoryID = Guid.NewGuid();
                        //MediaDirectory album = new MediaDirectory
                        //{
                        //    DirectoryID = a.MediaDirectoryID,
                        //    AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"),
                        //    Created = DateTime.Now,
                        //    Name = a.Name,
                        //    ParentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF")
                        //};
                        //Db.MediaDirectories.Add(album);
                        //Db.SaveChanges();
                        MediaDirectory album = Db.MediaDirectories.Find(a.MediaDirectoryID);
                        string path = Path.Combine(new string[] { basePath, album.DirectoryID.ToString() });
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }

                        //Db.Entry<UArtist>(a).State = System.Data.Entity.EntityState.Modified;
                        //Db.SaveChanges();
                    }
                    //Db.SaveChanges();
                    SeedFinished(true);
                }
                catch (DbEntityValidationException ex)
                {
                    Db = new ContentModel();
                    Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.DBError));
                    Db.SaveChanges();
                    this.HandleDbEntityValidationException(ex);
                }
                catch (Exception ex)
                {
                    Db = new ContentModel();
                    Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, $"CF Migration error - {SeedName}", GenericMessageStatus.DBError));
                    Db.SaveChanges();
                }
            }
            else
            {
                SeedFinished(true);
            }
        }
    }
}

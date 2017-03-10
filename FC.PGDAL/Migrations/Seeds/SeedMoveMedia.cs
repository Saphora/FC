//
//using FC.PGDAL.PGModel;
//using FC.Shared.Entities;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data.Entity.Validation;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FC.PGDAL.Migrations.Seeds
//{
//    public class SeedMoveMedia : SeedBase
//    {
//        public SeedMoveMedia(string versionID, ContentModel db) : base(versionID, db)
//        {
//            SeedName = "SeedMoveMedia";
//            string basePath = ConfigurationManager.AppSettings["AbsoluteMediaBasePath"];
//            string relBasePath = ConfigurationManager.AppSettings["MediaBasePath"];

//            SeedStart();
//            if (SeedCanRun)
//            {
//                try
//                {
//                    MediaDirectory artistDir = new MediaDirectory();
//                    artistDir.Name = "Artists";
//                    artistDir.ParentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF");
//                    artistDir.DirectoryID = Guid.Parse("3AA4EEE3-5821-40CE-A82C-5018B890B824");
//                    artistDir.Created = DateTime.Now;
//                    artistDir.AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A");

//                    if (Db.MediaDirectories.Find(artistDir.DirectoryID)==null)
//                    {
//                        Db.MediaDirectories.Add(artistDir);
//                    }
//                    Directory.CreateDirectory(basePath + artistDir.DirectoryID);
//                    Db.SaveChanges();
//                    MediaDirectory festivalDir = new MediaDirectory();
//                    festivalDir.Name = "Festivals";
//                    festivalDir.ParentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF");
//                    festivalDir.DirectoryID = Guid.Parse("5B778E5B-A1E4-40B4-A260-51D79890FAFA");
//                    festivalDir.Created = DateTime.Now;
//                    festivalDir.AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A");

//                    if (Db.MediaDirectories.Find(festivalDir.DirectoryID) == null)
//                    {
//                        Db.MediaDirectories.Add(festivalDir);
//                    }
//                    Directory.CreateDirectory(basePath + festivalDir.DirectoryID);
//                    Db.SaveChanges();

//                    MediaDirectory festivalDir2016 = new MediaDirectory();
//                    festivalDir2016.Name = "Festivals 2016";
//                    festivalDir2016.ParentID = festivalDir.DirectoryID;
//                    festivalDir2016.DirectoryID = Guid.Parse("1C9F99E9-1FF2-4EEF-9F94-25B400340FBA");
//                    festivalDir2016.Created = DateTime.Now;
//                    festivalDir2016.AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A");

//                    if (Db.MediaDirectories.Find(festivalDir2016.DirectoryID) == null)
//                    {
//                        Db.MediaDirectories.Add(festivalDir2016);
//                    }
//                    Directory.CreateDirectory(basePath + festivalDir2016.DirectoryID);
//                    Db.SaveChanges();


//                    foreach (UFestival f in Db.Festivals.ToList())
//                    {
//                        Guid result;
//                        FC.Shared.Entities.Media m;
//                        if(Guid.TryParse(f.Logo, out result))
//                        {
//                            m = Db.Media.Find(result);
//                            if (m != null)
//                            {
//                                MediaDirectory d = Db.MediaDirectories.Find(f.MediaDirectoryID);
//                                if (m.FileName.ToLower().Contains("/media/"))
//                                {
//                                    basePath = basePath.ToLower().Replace("/media/", "/");
//                                }

//                                d.ParentID = festivalDir2016.DirectoryID;
//                                m.DirectoryID = f.MediaDirectoryID;
//                                string fileName = basePath + m.FileName;
//                                string p = Path.Combine(new string[] { basePath + "/media/", d.DirectoryID.ToString(), m.Name });
//                                m.FileName = Path.Combine(new string[] { relBasePath, d.DirectoryID.ToString(), m.Name });
//                                Db.Entry<MediaDirectory>(d).State = System.Data.Entity.EntityState.Modified;
//                                Db.Entry<FC.Shared.Entities.Media>(m).State = System.Data.Entity.EntityState.Modified;
//                                Db.SaveChanges();
//                                if (File.Exists(fileName))
//                                {
//                                    File.Copy(fileName, p);
//                                    if (File.Exists(p))
//                                    {
//                                        File.Delete(fileName);
//                                        Directory.Delete(fileName.Replace(m.Name, ""), true);
//                                    }
//                                }
//                                else
//                                {
//                                     //throw new Exception($"File not exists {fileName}");
//                                }
//                            }
//                        } else
//                        {
//                            if (f.Logo != null)
//                            {
//                                int oid = int.Parse(f.Logo);
//                                m = Db.Media.Where(w => w.ObsoleteID == oid).FirstOrDefault();
//                                if (m != null)
//                                {
//                                    MediaDirectory d = Db.MediaDirectories.Find(f.MediaDirectoryID);
//                                    d.ParentID = festivalDir2016.DirectoryID;
//                                    if (m.FileName.ToLower().Contains("/media/"))
//                                    {
//                                        basePath = basePath.ToLower().Replace("/media/", "/");
//                                    }

//                                    string fileName = basePath + m.FileName;
//                                    string p = Path.Combine(new string[] { basePath + "/media/", d.DirectoryID.ToString(), m.Name });
//                                    if (File.Exists(fileName))
//                                    {
//                                        File.Copy(fileName, p);
//                                        if (File.Exists(p))
//                                        {
//                                            File.Delete(fileName);
//                                            Directory.Delete(fileName.Replace(m.Name, ""), true);
//                                        }
//                                    }
//                                    else
//                                    {
//                                        //throw new Exception($"File not exists {fileName}");
//                                    }

//                                    m.DirectoryID = f.MediaDirectoryID;
//                                    m.FileName = Path.Combine(new string[] { relBasePath, d.DirectoryID.ToString(), m.Name });
//                                    m.ObsoleteID = 0;
//                                    f.Logo = m.MediaID;
//                                    Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Modified;
//                                    Db.Entry<MediaDirectory>(d).State = System.Data.Entity.EntityState.Modified;
//                                    Db.Entry<FC.Shared.Entities.Media>(m).State = System.Data.Entity.EntityState.Modified;
//                                    Db.SaveChanges();
//                                }
//                            }
//                        }
//                    }
//                    foreach (UArtist a in Db.Artists.ToList())
//                    {
//                        Guid result;
//                        FC.Shared.Entities.Media m;
//                        if (Guid.TryParse(a.Image, out result))
//                        {
//                            m = Db.Media.Find(result);
//                            if (m != null)
//                            {
//                                MediaDirectory d = Db.MediaDirectories.Find(a.MediaDirectoryID);

//                                d.ParentID = artistDir.DirectoryID;

//                                if (m.FileName.ToLower().Contains("/media/"))
//                                {
//                                    basePath = basePath.ToLower().Replace("/media/", "/");
//                                }
//                                string fileName = basePath + m.FileName;
//                                string p = Path.Combine(new string[] { basePath + "/media/", d.DirectoryID.ToString(), m.Name });
//                                m.FileName = Path.Combine(new string[] { relBasePath, d.DirectoryID.ToString(), m.Name });
//                                m.DirectoryID = a.MediaDirectoryID;
//                                Db.Entry<FC.Shared.Entities.MediaDirectory>(d).State = System.Data.Entity.EntityState.Modified;
//                                Db.Entry<FC.Shared.Entities.Media>(m).State = System.Data.Entity.EntityState.Modified;
//                                Db.SaveChanges();
//                                if (File.Exists(fileName))
//                                {
//                                    if (File.Exists(p))
//                                    {
//                                        File.Delete(fileName);
//                                        Directory.Delete(fileName.Replace(m.Name, ""), true);
//                                    }
//                                }
//                                else
//                                {
//                                    //throw new Exception($"File not exists {fileName}");
//                                }
//                            }
//                        }
//                        else
//                        {
//                            if (a.Image != null)
//                            {
//                                int oid = int.Parse(a.Image);
//                                m = Db.Media.Where(w => w.ObsoleteID == oid).FirstOrDefault();
//                                if (m != null)
//                                {
//                                    MediaDirectory d = Db.MediaDirectories.Find(a.MediaDirectoryID);

//                                    d.ParentID = artistDir.DirectoryID;

//                                    if (m.FileName.ToLower().Contains("/media/"))
//                                    {
//                                        basePath = basePath.ToLower().Replace("/media/", "/");
//                                    }
//                                    string fileName = basePath + m.FileName;
//                                    string p = Path.Combine(new string[] { basePath + "/media/", d.DirectoryID.ToString(), m.Name });
//                                    m.FileName = Path.Combine(new string[] { relBasePath, d.DirectoryID.ToString(), m.Name });
//                                    if (File.Exists(fileName))
//                                    {
//                                        File.Copy(fileName, p);
//                                        if (File.Exists(p))
//                                        {
//                                            File.Delete(fileName);
//                                            Directory.Delete(fileName.Replace(m.Name, ""), true);
//                                        }
//                                    }
//                                    else
//                                    {
//                                        //throw new Exception($"File not exists {fileName}");
//                                    }

//                                    m.ObsoleteID = 0;
//                                    a.Image = m.MediaID.ToString();
//                                    m.DirectoryID = a.MediaDirectoryID;
//                                    Db.Entry<UArtist>(a).State = System.Data.Entity.EntityState.Modified;
//                                    Db.Entry<MediaDirectory>(d).State = System.Data.Entity.EntityState.Modified;
//                                    Db.Entry<FC.Shared.Entities.Media>(m).State = System.Data.Entity.EntityState.Modified;
//                                    Db.SaveChanges();
//                                }
//                            }
//                        }

//                        //Db.Entry<UArtist>(a).State = System.Data.Entity.EntityState.Modified;
//                        //Db.SaveChanges();
//                    }
//                    //Db.SaveChanges();
//                    SeedFinished(true);
//                }
//                catch (DbEntityValidationException ex)
//                {
//                    Db = new ContentModel();
//                    this.HandleDbEntityValidationException(ex);
//                    throw;
//                }
//                catch (Exception ex)
//                {
//                    Db = new ContentModel();
//                    Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, $"CF Migration error - {SeedName}", GenericMessageStatus.DBError));
//                    Db.SaveChanges();
//                    throw;
//                }
//            }
//            else
//            {
//                SeedFinished(true);
//            }
//        }
//    }
//}

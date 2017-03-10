
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.IO;
using System.Net.Mime;
namespace FC.PGDAL.Migrations.Seeds
{
    public class UObsoleteMedia
    {
        public UObsoleteMedia() { }
        public UObsoleteMedia(IDataRecord record)
        {
            if (record == null)
            {
                throw new Exception("Record was null");

            }
            if (record["dataNvarchar"] == null)
            {
                throw new Exception("record datanvarchar is null");
            }
            if (record["contentNodeId"] == null)
            {
                throw new Exception("contentNodeId is null");
            }
            ContentNodeID = int.Parse(record["contentNodeId"].ToString());
            DataNVarchar = record["dataNvarchar"].ToString();
        }
        public int ContentNodeID { get; set; }
        public string DataNVarchar { get; set; }
    }

    public class SeedMedia : SeedBase
    {
        private List<UObsoleteMedia> obsoleteMedia;

        public void GetObsoleteUmbracoMedia()
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["umbracoDbDSN"].ConnectionString);
                //using ())
                //{
                    if (conn == null)
                    {
                        throw new Exception("SqlConnection is null");
                    }
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("SELECT [contentNodeId],[dataNvarchar] FROM [FestivalCalendar].[dbo].[cmsPropertyData] WHERE propertytypeid = 6");
                    if(cmd == null)
                    {
                        throw new Exception("SQLCommand is null");
                    
                    }
                    cmd.Connection = conn;
                    SqlDataReader reader = cmd.ExecuteReader();
                    if(reader == null)
                    {
                        throw new Exception("Reader is null");
                    }
                    if(conn == null)
                    {
                        throw new Exception("SQLConnection does not need te be closed for now");
                    }
                    while (reader.Read())
                    {
                        UObsoleteMedia media = new UObsoleteMedia(reader);
                        if(obsoleteMedia == null)
                        {
                            throw new Exception("ObsoleteMediaList is null");
                        }
                        obsoleteMedia.Add(media);
                    }
                conn.Close();
               // }
            } catch(Exception ex)

            {
                if (ex.InnerException != null)
                {
                    throw new Exception(string.Format("{0}{1}{2}", ex.Message, Environment.NewLine + Environment.NewLine, ex.InnerException.Message));
                }
                if (ex != null && ex.Message != null)
                {
                    throw new Exception(string.Format("{0}{1}", ex.Message, Environment.NewLine + Environment.NewLine));
                } else
                {
                    throw ex;
                }
            }
        }

        public SeedMedia(string versionID, ContentModel db) : base(versionID, db)
        {
            if (this.SeedCanRun)
            {
                Db = db;
                obsoleteMedia = new List<UObsoleteMedia>();
                GetObsoleteUmbracoMedia();
                SeedName = "Media";
                if (SeedCanRun)
                {
                    SeedStart();
                    MediaDirectory defaultDir = new MediaDirectory { Name = "Media", AuthorID= Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"), Created = DateTime.Now, Modified =null, DirectoryID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF"), ParentID = null };
                    if (Db.MediaDirectories.Find(defaultDir.DirectoryID.Value) == null)
                    {
                        Db.MediaDirectories.Add(defaultDir);
                    }
                    MediaDirectory obsoleteDir = new MediaDirectory { Name = "Obsolete", AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"), Created= DateTime.Now, Modified=null, ParentID = defaultDir.DirectoryID.Value, DirectoryID = Guid.Parse("19D0268E-4ACA-41F5-BC14-77DC4C1343CD") };
                    if (Db.MediaDirectories.Find(obsoleteDir.DirectoryID.Value) == null)
                    {
                        Db.MediaDirectories.Add(obsoleteDir);
                    }
                    foreach (UObsoleteMedia media in obsoleteMedia)
                    {
                        if (media == null)
                        {
                            throw new Exception("MEDIA IS NULL");
                        }
                        if (Db == null)
                        {
                            throw new Exception("DB IS NULL");
                        }
                        if (obsoleteDir == null || defaultDir == null)
                        {
                            throw new Exception("ONE OF THE DIRECTORY OBJ ARE NULL");
                        }
                        if (Db.Media == null)
                        {
                            throw new Exception("DB MEDIA NULL ERRROR");
                        }

                        if (media.DataNVarchar != null)
                        {
                            if (media.ContentNodeID != null)
                            {
                                Shared.Entities.Media m = new Shared.Entities.Media();
                                m.Name = media.DataNVarchar.Split('/').Last();
                                m.MediaID = Guid.NewGuid();
                                m.DirectoryID = obsoleteDir.DirectoryID;
                                m.FileName = media.DataNVarchar;
                                m.ObsoleteID = media.ContentNodeID;
                                m.FileMimeType = "none";
                                m.Created = DateTime.Now;
                                m.Modified = null;
                                m.AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A");
                                Db.Media.Add(m);
                                m = new FC.Shared.Entities.Media();
                            }
                        }
                    }
                    try
                    {
                        Db.SaveChanges();
                        SeedFinished(true);
                    }
                    catch (System.Data.Entity.Validation.DbEntityValidationException ex)
                    {
                        HandleDbEntityValidationException(ex);
                        throw ex;
                    }
                }
                else
                {
                    SeedFinished(true);
                }
            }
        }
    }
}


using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedMediaTypes : SeedBase
    {
        public SeedMediaTypes(string versionID, ContentModel db) : base(versionID, db)
        {
            SeedName = "SeedMediaTypes";
            SeedStart();
            if (SeedCanRun)
            {
                try
                {
                    FC.Shared.Entities.MediaType image = new Shared.Entities.MediaType()
                    {
                        Name = "Image",
                        MediaTypeID = Guid.NewGuid(),
                    };

                    FC.Shared.Entities.MediaType video = new Shared.Entities.MediaType()
                    {
                        Name = "Video",
                        MediaTypeID = Guid.NewGuid(),
                    };

                    FC.Shared.Entities.MediaType audio = new Shared.Entities.MediaType()
                    {
                        MediaTypeID = Guid.NewGuid(),
                        Name = "Audio"
                    };

                    FC.Shared.Entities.MediaType document = new Shared.Entities.MediaType()
                    {
                        MediaTypeID = Guid.NewGuid(),
                        Name = "Document"
                    };

                    FC.Shared.Entities.MediaType html = new Shared.Entities.MediaType()
                    {
                        MediaTypeID = Guid.NewGuid(),
                        Name = "HTML"
                    };

                    FC.Shared.Entities.MediaType css = new Shared.Entities.MediaType()
                    {
                        MediaTypeID = Guid.NewGuid(),
                        Name = "CSS"
                    };

                    FC.Shared.Entities.MediaType script = new Shared.Entities.MediaType()
                    {
                        MediaTypeID = Guid.NewGuid(),
                        Name = "Script"
                    };

                    FC.Shared.Entities.MediaType DLL = new Shared.Entities.MediaType()
                    {
                        MediaTypeID = Guid.NewGuid(),
                        Name = "DLL"
                    };

                    Db.MediaTypes.Add(image);
                    Db.MediaTypes.Add(video);
                    Db.MediaTypes.Add(audio);
                    Db.MediaTypes.Add(document);
                    Db.MediaTypes.Add(css);
                    Db.MediaTypes.Add(html);
                    Db.MediaTypes.Add(script);
                    Db.MediaTypes.Add(audio);
                    Db.MediaTypes.Add(DLL);

                    FC.Shared.Entities.MimeType jpg = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "image/jpeg",
                        Mime = "JPG"
                    };
                    Db.MimeTypes.Add(jpg);

                    FC.Shared.Entities.MimeType gif = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "image/gif",
                        Mime = "GIF"
                    };
                    Db.MimeTypes.Add(gif);

                    FC.Shared.Entities.MimeType png = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "image/png",
                        Mime = "PNG"
                    };
                    Db.MimeTypes.Add(png);

                    FC.Shared.Entities.MimeType avi = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "video/avi",
                        Mime = "AVI"
                    };
                    Db.MimeTypes.Add(avi);

                    FC.Shared.Entities.MimeType mpeg = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "video/mpeg",
                        Mime = "MPEG"
                    };
                    Db.MimeTypes.Add(mpeg);

                    FC.Shared.Entities.MimeType svf = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "image/x-dwg",
                        Mime = "SVF"
                    };
                    Db.MimeTypes.Add(svf);

                    FC.Shared.Entities.MimeType mp3 = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "audio/mpeg3",
                        Mime = "MP3"
                    };
                    Db.MimeTypes.Add(mp3);

                    FC.Shared.Entities.MimeType pdf = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "application/pdf",
                        Mime = "PDF"
                    };
                    Db.MimeTypes.Add(pdf);

                    FC.Shared.Entities.MimeType txt = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "text/plain",
                        Mime = "TXT"
                    };
                    Db.MimeTypes.Add(txt);

                    FC.Shared.Entities.MimeType doc = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "application/msword",
                        Mime = "DOC(X)"
                    };
                    Db.MimeTypes.Add(doc);

                    FC.Shared.Entities.MimeType xlsx = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "application/msexcel",
                        Mime = "XLS(X)"
                    };
                    Db.MimeTypes.Add(xlsx);

                    FC.Shared.Entities.MimeType mcss = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "text/css",
                        Mime = "CSS"
                    };
                    Db.MimeTypes.Add(mcss);

                    FC.Shared.Entities.MimeType xml1 = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "text/xml",
                        Mime = "XML"
                    };
                    Db.MimeTypes.Add(xml1);

                    FC.Shared.Entities.MimeType js = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "application/javascript",
                        Mime = "JS"
                    };
                    Db.MimeTypes.Add(js);

                    FC.Shared.Entities.MimeType json = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "application/javascript",
                        Mime = "JSON"
                    };
                    Db.MimeTypes.Add(json);

                    FC.Shared.Entities.MimeType dll = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "application/x-msdownload",
                        Mime = "DLL"
                    };
                    Db.MimeTypes.Add(dll);

                    FC.Shared.Entities.MimeType mhtml = new FC.Shared.Entities.MimeType()
                    {
                        MimeTypeID = Guid.NewGuid(),
                        Name = "text/html",
                        Mime = "HTML"
                    };
                    Db.MimeTypes.Add(mhtml);

                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = image.MediaTypeID, MimeTypeID = jpg.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = image.MediaTypeID, MimeTypeID = png.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = image.MediaTypeID, MimeTypeID = gif.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = document.MediaTypeID, MimeTypeID = doc.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = document.MediaTypeID, MimeTypeID = pdf.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = document.MediaTypeID, MimeTypeID = xlsx.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = document.MediaTypeID, MimeTypeID = txt.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = html.MediaTypeID, MimeTypeID = mhtml.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = css.MediaTypeID, MimeTypeID = mcss.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = script.MediaTypeID, MimeTypeID = js.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = script.MediaTypeID, MimeTypeID = json.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = DLL.MediaTypeID, MimeTypeID = dll.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = video.MediaTypeID, MimeTypeID = avi.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = video.MediaTypeID, MimeTypeID = mpeg.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = video.MediaTypeID, MimeTypeID = svf.MimeTypeID });
                    Db.MT2MT.Add(new MimeType2MediaType { MT2MTID = Guid.NewGuid(), MediaTypeID = audio.MediaTypeID, MimeTypeID = mp3.MimeTypeID });
                    Db.SaveChanges();
                    SeedFinished(true);

                }
                catch (DbEntityValidationException ex)
                {
                    Db = new ContentModel();
                    this.HandleDbEntityValidationException(ex);
                    throw;
                }
                catch (Exception ex)
                {
                    Db = new ContentModel();
                    Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, $"CF Migration error - {SeedName}", GenericMessageStatus.DBError));
                    Db.SaveChanges();
                    throw;
                }
            }
            else
            {
                SeedFinished(true);
            }
        }
    }
}

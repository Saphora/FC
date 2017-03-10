using System;
using System.Linq;
using System.Web;

using FC.Interfaces;
using FC.Shared.Helpers;

using System.Collections.Generic;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Drawing.Drawing2D;
using System.Configuration;
using FC.BL.Repositories;

namespace FC.WebAPI
{
    public enum ImageMode
    {
        Landscape,
        Portrait,
        Square
    }
    public class FCImageHandler : IHttpHandler
    {
        /// <summary>
        /// You will need to configure this handler in the Web.config file of your 
        /// web and register it with IIS before being able to use it. For more information
        /// see the following link: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members
        public bool DoCrop { get; set; }
        public bool MarkImage { get; set; }
        public bool IsCroppable { get; set; }
        public bool Thumb { get; set; }
        public Guid? IMGID { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public int _Width { get; set; }
        public int _Height { get; set; }
        public string ClientScreenHeight { get; set; }
        protected HttpContext CurrentContext { get; set; }
        public int OriginHeight { get; set; }
        public int OriginWidth { get; set; }
        public bool IsUmbracoImage = true;
        public string Pattern { get; set; }
        public bool FetchOrigin { get; set; }
        public int Top { get; set; }
        public int Left { get; set; }
        public int FromLeft { get; set; }
        public int FromTop { get; set; }

        private Rectangle CropArea = new Rectangle();
        private int _CropWidth;
        private int _CropHeight;

        public bool IsReusable
        {
            // Return false in case your Managed Handler cannot be reused for another request.
            // Usually this would be false in case you have some state information preserved per request.
            get { return true; }
        }
        private void _FetchURLParams()
        {

            string strImgID = CurrentContext.Request.FilePath.Replace("/", "").Replace(".img", "").Trim();
            IMGID = Guid.Parse(strImgID);
            ClientScreenHeight = CurrentContext.Request.QueryString["screen_height"];
            if (CurrentContext.Request.QueryString["height"] != null)
            {
                Height = CurrentContext.Request.QueryString["height"];
            }
            else
            {
                Height = "0";
            }
            if (CurrentContext.Request.QueryString["origin"] != null)
            {
                if (bool.Parse(CurrentContext.Request.QueryString["origin"]) == true)
                {
                    FetchOrigin = true;
                }
                else
                {
                    FetchOrigin = false;
                }
            }
            else
            {
                FetchOrigin = false;
            }
            if (CurrentContext.Request.QueryString["watermark"] != null)
            {
                if (bool.Parse(CurrentContext.Request.QueryString["watermark"]) == true)
                {
                    MarkImage = true;
                }
                else
                {
                    MarkImage = false;
                }
            }
            else
            {
                MarkImage = false;
            }
            if (CurrentContext.Request.QueryString["thumb"] != null)
            {
                if (bool.Parse(CurrentContext.Request.QueryString["thumb"]) == true)
                {
                    Thumb = true;
                }
                else
                {
                    Thumb = false;
                }
            }
            else
            {
                Thumb = false;
            }
            if (CurrentContext.Request.QueryString["width"] != null)
            {
                Width = CurrentContext.Request.QueryString["width"];
            }
            else
            {
                Width = "0";
            }
            if (CurrentContext.Request.QueryString["crop"] != null)
            {
                DoCrop = Convert.ToBoolean(CurrentContext.Request.QueryString["crop"]);
            }
            else
            {
                DoCrop = false;
            }

        }
        public void ProcessRequest(HttpContext context)
        {
            CurrentContext = context;
            _FetchURLParams();
            _LoadImage();
        }

        private void _CalcRatio()
        {
            if (!FetchOrigin)
            {
                if (!String.IsNullOrEmpty(Height) && Height != "0")
                {
                    _Height = int.Parse(Height);
                    _Width = int.Parse(Width);
                    int percentage = _Height * 100 / OriginHeight;
                    int calcHeight = OriginHeight / 100 * percentage;
                    int calcWidth = OriginWidth / 100 * percentage;
                    _Width = calcWidth;
                    _Height = calcHeight;
                }
                else if (!String.IsNullOrEmpty(Width) && Width != "0")
                {
                    _Height = int.Parse(Height);
                    _Width = int.Parse(Width);
                    int percentage = _Width * 100 / OriginWidth;
                    int calcHeight = OriginHeight / 100 * percentage;
                    int calcWidth = OriginWidth / 100 * percentage;
                    _Width = calcWidth;
                    _Height = calcHeight;
                }
            }
            else
            {
                _Width = OriginWidth;
                _Height = OriginHeight;
            }

        }
        private void _Crop()
        {
            if (!FetchOrigin)
            {
                if (!String.IsNullOrEmpty(Width) && !String.IsNullOrEmpty(Height))
                {
                    _Height = int.Parse(Height);
                    _Width = int.Parse(Width);
                    IsCroppable = false;
                    int factor = OriginWidth / _Width;
                    _CropWidth = OriginWidth / factor;
                    _CropHeight = OriginHeight / factor;
                    CropArea.X = 0;
                    CropArea.Y = 0;
                    IsCroppable = true;
                    CropArea.Width = _Width;
                    CropArea.Height = _Height;
                        //int percentage = (_Height + 10) * 100 / OriginHeight;
                        //if (percentage > 100)
                        //{
                        //    percentage = 100;
                        //}
                        //_CropHeight = OriginHeight / 100 * percentage;
                        //_CropWidth = OriginWidth / 100 * percentage;
                        //_CropWidth = _CropWidth + OriginWidth / percentage;
                        //_CropHeight = _CropHeight + OriginWidth / percentage;
                        //if (_CropWidth >= _Width && _CropHeight >= _Height)
                        //{
                        //    CropArea.X = _CropWidth / 2 - _Height / 2;
                        //    CropArea.Y = _CropHeight / 2 - _Height / 2;
                        //    CropArea.Width = _Width;
                        //    CropArea.Height = _Height;
                        //    IsCroppable = true;
                        //}
                        //else
                        //{
                        //    _CropWidth = OriginWidth;
                        //    _CropHeight = OriginHeight;
                        //    CropArea.Width = _Width;
                        //    CropArea.Height = _Height;
                        //    CropArea.X = (OriginWidth - _Width) / 2;
                        //    CropArea.Y = (OriginHeight - _Height) / 2;
                        //    IsCroppable = true;
                        //}
                }
            }
        }

        private ImageMode _GetImageMode(int width, int height)
        {
            if (OriginWidth > OriginHeight)
            {
                //landscape
                return ImageMode.Landscape;
            }
            else if (OriginHeight > OriginWidth)
            {
                return ImageMode.Portrait;
            }
            else
            {
                return ImageMode.Square;
            }
        }
        public bool ThumbCallback()
        {
            return false;
        }
        private void _LoadImage()
        {
            MediaRepository mediaRepo = new MediaRepository();
            //Umbraco.Web.Media.ImageUrlProviders.ImageUrlProvider p = new Umbraco.Web.Media.ImageUrlProviders.ImageUrlProvider();
            //
           Dictionary<string, string> parameters = new Dictionary<string, string>();

            string url = "";
            url = CurrentContext.Server.MapPath(mediaRepo.GetByID(IMGID).FileName);
            
            if (File.Exists(url))
            {
                FileInfo info = new FileInfo(url);
                using (Image img = Image.FromFile(url))
                {
                    OriginWidth = img.Width;
                    OriginHeight = img.Height;
                    if (Thumb)
                    {

                        _WriteThumbnail(img, info);
                    }
                    else
                    {
                        if (!FetchOrigin)
                        {
                            if (DoCrop)
                            {
                                _Crop();
                                if (IsCroppable)
                                {
                                    _WriteCroppedImage(img, info);
                                }
                                else
                                {
                                    _CalcRatio();
                                    _WriteScaledImage(img, info);
                                }
                            }
                            else
                            {
                                _CalcRatio();
                                _WriteScaledImage(img, info);
                            }
                        }
                        else
                        {
                            _WriteOriginImage(img, info);
                        }
                    }

                }

            }
            else
            {
                CurrentContext.Response.StatusCode = 404;
                CurrentContext.Response.Write("FILE NOT FOUND: " + url);
            }
        }

        public void _WriteScaledImage(Image img, FileInfo info)
        {
            using (Bitmap bmp = new Bitmap(img, _Width, _Height))
            {
                MemoryStream outStr = new MemoryStream();
                using (MemoryStream memStr = new MemoryStream())
                {
                    switch (info.Extension.ToLower())
                    {
                        case ".png":
                            bmp.Save(memStr, ImageFormat.Png);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".jpg":
                            bmp.Save(memStr, ImageFormat.Jpeg);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".jpeg":
                            bmp.Save(memStr, ImageFormat.Jpeg);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".gif":
                            bmp.Save(memStr, ImageFormat.Gif);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".wmf":
                            bmp.Save(memStr, ImageFormat.Wmf);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".exif":
                            bmp.Save(memStr, ImageFormat.Exif);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".icon":
                            bmp.Save(memStr, ImageFormat.Icon);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                        case ".bmp":
                            bmp.Save(memStr, ImageFormat.Bmp);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()), true);
                            }
                            break;
                    }
                    ImageFormat format = img.RawFormat;
                    ImageCodecInfo codec = ImageCodecInfo.GetImageDecoders().First(c => c.FormatID == format.Guid);
                    string mimeType = codec.MimeType;
                    CurrentContext.Response.AddHeader("Content-Type", mimeType);
                    if (MarkImage)
                    {
                        CurrentContext.Response.BinaryWrite(outStr.ToArray());
                        outStr.Dispose();
                    } else
                    {
                        CurrentContext.Response.BinaryWrite(memStr.ToArray());
                    }

                }
            }
        }
       

        public ImageFormat GetFormat(string ext)
        {
            switch (ext)
            {
                case ".png":
                  return ImageFormat.Png;
                    break;
                case ".jpg":
                    return ImageFormat.Jpeg;
                    break;
                case ".jpeg":
                    return ImageFormat.Jpeg;
                    break;
                case ".gif":
                    return ImageFormat.Gif;
                    break;
                case ".wmf":
                    return ImageFormat.Wmf;
                    break;
                case ".exif":
                    return ImageFormat.Exif;
                    break;
                case ".icon":
                    return ImageFormat.Icon;
                    break;
                case ".bmp":
                    return ImageFormat.Bmp;
                    break;
            }
            return null;
        }

        public void _WriteThumbnail(Image img, FileInfo info)
        {
            using (Bitmap bmp = new Bitmap(img, OriginWidth, OriginHeight))
            {
                MemoryStream outStr = new MemoryStream();
                MemoryStream outStrWm = new MemoryStream();
                using (MemoryStream memStr = new MemoryStream())
                {
                    switch (info.Extension.ToLower())
                    {
                        case ".png":
                            bmp.Save(memStr, ImageFormat.Png);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".jpg":
                            bmp.Save(memStr, ImageFormat.Jpeg);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".jpeg":
                            bmp.Save(memStr, ImageFormat.Jpeg);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".gif":
                            bmp.Save(memStr, ImageFormat.Gif);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".wmf":
                            bmp.Save(memStr, ImageFormat.Wmf);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".exif":
                            bmp.Save(memStr, ImageFormat.Exif);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".icon":
                            bmp.Save(memStr, ImageFormat.Icon);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".bmp":
                            bmp.Save(memStr, ImageFormat.Bmp);
                            GetThumb(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            if (MarkImage)
                            {
                                AddWaterMark(outStr, outStrWm, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                    }
                    ImageFormat format = img.RawFormat;
                    ImageCodecInfo codec = ImageCodecInfo.GetImageDecoders().First(c => c.FormatID == format.Guid);
                    string mimeType = codec.MimeType;
                    CurrentContext.Response.AddHeader("Content-Type", mimeType);
                    if (MarkImage)
                    {
                        CurrentContext.Response.BinaryWrite(outStrWm.ToArray());
                        outStrWm.Dispose();
                    } else
                    {
                        CurrentContext.Response.BinaryWrite(outStr.ToArray());
                    }
                    outStr.Dispose();

                }
            }
        }

        public void AddWaterMark(MemoryStream ms, MemoryStream outputStream, ImageFormat format, bool scale=false)
        {
            System.Drawing.Image img = System.Drawing.Image.FromStream(ms);
            Graphics gr = Graphics.FromImage(img);
            if (!scale)
            {
                gr.DrawImage(Image.FromFile(ConfigurationManager.AppSettings["SERVER_ROOT"] + "logoc.png"), OriginWidth - 170, OriginHeight - 55, 160, 45);
            } else
            {
                gr.DrawImage(Image.FromFile(ConfigurationManager.AppSettings["SERVER_ROOT"] + "logoc.png"),  _Width-170, _Height-55, 160, 45);
            }

            img.Save(outputStream, format);
        }

        public void GetThumb(MemoryStream ms, MemoryStream outputStream, ImageFormat format)
        {
            System.Drawing.Image img = System.Drawing.Image.FromStream(ms);
            img = img.GetThumbnailImage(int.Parse(Width), int.Parse(Height), ThumbCallback, IntPtr.Zero);

            img.Save(outputStream, format);
        }
        public void _WriteOriginImage(Image img, FileInfo info)
        {
            MemoryStream outStr = new MemoryStream();
            using (Bitmap bmp = new Bitmap(img, OriginWidth, OriginHeight))
            {
               
                using (MemoryStream memStr = new MemoryStream())
                {
                    switch (info.Extension.ToLower())
                    {
                        case ".png":
                            bmp.Save(memStr, ImageFormat.Png);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".jpg":
                            bmp.Save(memStr, ImageFormat.Jpeg);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".jpeg":
                            bmp.Save(memStr, ImageFormat.Jpeg);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".gif":
                            bmp.Save(memStr, ImageFormat.Gif);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".wmf":
                            bmp.Save(memStr, ImageFormat.Wmf);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".exif":
                            bmp.Save(memStr, ImageFormat.Exif);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".icon":
                            bmp.Save(memStr, ImageFormat.Icon);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                        case ".bmp":
                            bmp.Save(memStr, ImageFormat.Bmp);
                            if (MarkImage)
                            {
                                AddWaterMark(memStr, outStr, GetFormat(info.Extension.ToLower()));
                            }
                            break;
                    }
                    ImageFormat format = img.RawFormat;
                    ImageCodecInfo codec = ImageCodecInfo.GetImageDecoders().First(c => c.FormatID == format.Guid);
                    string mimeType = codec.MimeType;
                    CurrentContext.Response.AddHeader("Content-Type", mimeType);
                    if (MarkImage)
                    {
                        CurrentContext.Response.BinaryWrite(outStr.ToArray());
                        outStr.Dispose();
                    } else
                    {
                        CurrentContext.Response.BinaryWrite(memStr.ToArray());
                    }

                }
            }
        }

        public void _WriteCroppedImage(Image img, FileInfo info)
        {
            if (OriginWidth > _Width && OriginHeight > _Height)
            {
                using (Bitmap bmp = new Bitmap(img, _CropWidth, _CropHeight))
                {
                    using (Bitmap clone = bmp.Clone(CropArea, bmp.PixelFormat))
                    {
                        using (MemoryStream memStr = new MemoryStream())
                        {
                            switch (info.Extension.ToLower())
                            {
                                case ".png":
                                    clone.Save(memStr, ImageFormat.Png);
                                    break;
                                case ".jpg":
                                    clone.Save(memStr, ImageFormat.Jpeg);
                                    break;
                                case ".jpeg":
                                    clone.Save(memStr, ImageFormat.Jpeg);
                                    break;
                                case ".gif":
                                    clone.Save(memStr, ImageFormat.Gif);
                                    break;
                                case ".wmf":
                                    clone.Save(memStr, ImageFormat.Wmf);
                                    break;
                                case ".exif":
                                    clone.Save(memStr, ImageFormat.Exif);
                                    break;
                                case ".icon":
                                    clone.Save(memStr, ImageFormat.Icon);
                                    break;
                                case ".bmp":
                                    clone.Save(memStr, ImageFormat.Bmp);
                                    break;
                            }
                            ImageFormat format = img.RawFormat;
                            ImageCodecInfo codec = ImageCodecInfo.GetImageDecoders().First(c => c.FormatID == format.Guid);
                            string mimeType = codec.MimeType;
                            CurrentContext.Response.AddHeader("Content-Type", mimeType);
                            CurrentContext.Response.BinaryWrite(memStr.ToArray());
                        }
                    }
                }
            }
            else
            {
                _CalcRatio();
                _WriteScaledImage(img, info);
            }
        }
        #endregion
    }
}

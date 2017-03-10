using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Attribs
{
    public enum ValidationRule
    {
        Email,
        Zip,
        Website,
        Phone,
        Number,
        Word,
        Text,
        Sentence,
        Name,
        Any,
        FacebookURL,
        TwitterURL,
        InstagramURL,
        YoutubeURL,
        FlickrURL,
        GoogleURL,
        LinkedInURL,
        MySpaceURL,
        SoundcloudURL,
        PinterestURL,
        DeezerURL,
        SpotifyURL,
        Guid,
        BigText,
    }
    public class Validation : System.Attribute
    {
        public bool HasRegex = false;
        public string Regex { get; set; }
        public bool Required { get; set; }
        public long MaxLength { get; set; }
        public ValidationRule? Rule { get; set; }
        public string InvalidMsg { get; set; }
        public string RequiredMsg = "The field $FIELD_NAME$ is empty but required.";
        public const string ANY =  ".*";
        public const string EMAIL =  @"([a-z-A-Z-0-9\-_\.]+@+[a-z-A-Z-0-9\-_]+[a-z-A-Z-0-9\.\-_]+\.[a-zA-Z-0-9\-_]+)";
        public const string NUMBER =  @"([0-9]+)";
        public const string PHONE =  @"((\+[0-9]{9,12}))";
        public const string TEXT =  @".*";
        public const string NAME =  @"[0-9A-Z-a-z\'\s\.\,\-]{2,100}";
        public const string BIGTEXT =  @".*";
        public const string ZIP =  @"[0-9A-Za-z]+";
        public const string WEBSITE =  @"(((http(s)?)(://+))(www\.)?[a-zA-Z0-9\-\._]+\.+([\.a-zA-Z0-9\-]+)?(:[0-9]+)?)";
        public const string GUID =  @"(([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12})";
        public const string DEEZER =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?deezer.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string SPOTIFY =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?spotify.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string PINTEREST =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?pinterest.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string SOUNDCLOUD =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?soundcloud.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string MYSPACE =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?myspace.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string YOUTUBE =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?youtube.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string FLICKR =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?flickr.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string LINKEDIN =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?linkedin.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string GOOGLE =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?google.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string TWITTER =  @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?twitter.com+([a-zA-Z0-9\.\-_/\?\=])+)";
        public const string WORD =  @"\w+";
        public const string SENTENCE =  @"([0-9A-Z]+[a-zA-Z0-9\s\,\-\'\(\)\%\+\-\=\;\:\[\]\{\}\*\#\!\\\|\?]+?(\.|\?|\!))";

        private void setRegex(ValidationRule r)
        {
            this.Rule = r;
            switch (r)
            {
                case ValidationRule.Any:
                    this.MaxLength = 255;
                    this.Regex = ".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.Email:
                    this.MaxLength = 255;
                    this.Regex = @"([a-z-A-Z-0-9\-_\.]+@+[a-z-A-Z-0-9\-_]+[a-z-A-Z-0-9\.\-_]+\.[a-zA-Z-0-9\-_]+)";
                    this.InvalidMsg = "The field $FIELD_NAME$ is not a valid e-mail address.";
                    break;
                case ValidationRule.Number:
                    this.Regex = @"([0-9]+)";
                    this.MaxLength = 50;
                    this.InvalidMsg = "The field $FIELD_NAME$ is not a valid number.";
                    break;
                case ValidationRule.Phone:
                    this.MaxLength = 20;
                    this.Regex = @"((\+[0-9]{9,12}))";
                    this.InvalidMsg = "The field $FIELD_NAME$ is not a valid phone number.";
                    break;
                case ValidationRule.Text:
                    this.MaxLength = 2048;
                    this.Regex = @".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.Name:
                    this.MaxLength = 100;
                    this.Regex = @"[0-9A-Z-a-z\'\s\.\,\-]{2,100}";
                    this.InvalidMsg = "The input of $FIELD_NAME$ name is not in a valid name.";
                    break;
                case ValidationRule.BigText:
                    this.MaxLength = 20480000;
                    this.Regex = @".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.Zip:
                    this.MaxLength = 15;
                    this.Regex = @"[0-9A-Za-z]+";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid ZIP code.";
                    break;
                case ValidationRule.Website:
                    this.MaxLength = 512;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?[a-zA-Z0-9\-\._]+\.+([\.a-zA-Z0-9\-]+)?(:[0-9]+)?)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid website.";
                    break;
                case ValidationRule.Guid:
                    this.MaxLength = 40;
                    this.Regex = @"(([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12})";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid GUID.";
                    break;
                case ValidationRule.DeezerURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?deezer.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Deezer URL";
                    break;
                case ValidationRule.SpotifyURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?spotify.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid spotify URL";
                    break;
                case ValidationRule.PinterestURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?pinterest.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Pinterest URL";
                    break;
                case ValidationRule.SoundcloudURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?soundcloud.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Soundcloud URL";
                    break;
                case ValidationRule.MySpaceURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?myspace.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid MySpace URL";
                    break;
                case ValidationRule.YoutubeURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?youtube.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Youtube URL";
                    break;
                case ValidationRule.FlickrURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?flickr.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid FlickR URL";
                    break;
                case ValidationRule.LinkedInURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?linkedin.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid LinkedIn URL";
                    break;
                case ValidationRule.GoogleURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?google.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Google URL";
                    break;
                case ValidationRule.TwitterURL:
                    this.MaxLength = 255;
                    this.Regex = @"(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?twitter.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Twitter URL";
                    break;
                case ValidationRule.Word:
                    this.MaxLength = 255;
                    this.Regex = @"\w+";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not in a valid format.";
                    break;
                case ValidationRule.Sentence:
                    this.MaxLength = 1024;
                    this.Regex = @"([0-9A-Z]+[a-zA-Z0-9\s\,\-\'\(\)\%\+\-\=\;\:\[\]\{\}\*\#\!\\\|\?]+?(\.|\?|\!))";
                    break;
                default:
                    this.Rule = ValidationRule.Any;
                    this.Regex = ".*";
                    this.MaxLength = 2048;
                    this.InvalidMsg = "The input of $FIELD_NAME$ exceeds the max. character limit of 2048";
                    break;
            }
        }
        public Validation(ValidationRule rule, bool required = false)
        {
            this.setRegex(rule);
            this.Required = required;
            this.Rule = rule;
            this.MaxLength = MaxLength;

        }
        public Validation(bool required)
        {
            this.setRegex(ValidationRule.Any);
            this.Required = required;
            this.Rule = ValidationRule.Any;
        }

        public Validation(string regex, bool required)
        {
            this.HasRegex = true;
            this.Regex = regex;
            this.Required = required;
        }
    }
}

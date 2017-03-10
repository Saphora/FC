module FC.Shared.Util {
    export enum ValidationRule {
        Email,
        Zip,
        Website,
        Phone,
        Number,
        Word,
        Text,
        Sentence,
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
        ShortText,
        Time
    }
    export class _VALIDATOR_REGITEM {
        fieldID: string;
        rule: ValidationRule = ValidationRule.Any;
        msg: string;
        required: boolean = false;
    }

    export class Validator 
    {
        public HasRegex: boolean = false;
        public Regex: string;
        public Required: boolean = false;
        public MaxLength: number;
        public Rule: ValidationRule;
        public InvalidMsg: string;
        public RequiredMsg: string = "The field $FIELD_NAME$ is empty but required.";
        private static instance;
        private _register: _VALIDATOR_REGITEM[];
        public static GetInstance():Validator {
            if (Validator.instance == null) {
                Validator.instance = new Validator("13B072C0-E000-47CB-BEDC-8D0A8C9690FD");
            }
            return Validator.instance;
        }


        public Validate(rule: ValidationRule, fieldID: string, fieldValue: string) {
            this.setRegex(rule);
            var regex = new RegExp(this.Regex);
            if (regex.test(fieldValue) != true) {
                $("#" + fieldID).addClass("invalid");
            } else {
                $("#" + fieldID).removeClass("invalid");
                $("#" + fieldID).addClass("valid");
            }

        }

        public constructor(instKey: string) {
            if (instKey != "13B072C0-E000-47CB-BEDC-8D0A8C9690FD") {
                throw new Error("Use Validator.GetInstance() instead of manually creating instances.");
            }
        }

        private setRegex(r:ValidationRule):void
        {
            this.Rule = r;
            switch (r) {
                case ValidationRule.Any:
                    this.MaxLength = 255;
                    this.Regex = ".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.Email:
                    this.MaxLength = 255;
                    this.Regex = "([a-z-A-Z-0-9\-_\.]++[a-z-A-Z-0-9\-_]+[a-z-A-Z-0-9\.\-_]+\.[a-zA-Z-0-9\-_]+)";
                    this.InvalidMsg = "The field $FIELD_NAME$ is not a valid e-mail address.";
                    break;
                case ValidationRule.Number:
                    this.Regex = "([0-9]+)";
                    this.MaxLength = 50;
                    this.InvalidMsg = "The field $FIELD_NAME$ is not a valid number.";
                    break;
                case ValidationRule.Phone:
                    this.MaxLength = 20;
                    this.Regex = "((\+[0-9]{9,12}))";
                    this.InvalidMsg = "The field $FIELD_NAME$ is not a valid phone number.";
                    break;
                case ValidationRule.Text:
                    this.MaxLength = 2048;
                    this.Regex = ".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.BigText:
                    this.MaxLength = 2048000;
                    this.Regex = ".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.ShortText:
                    this.MaxLength = 125;
                    this.Regex = ".*";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                    break;
                case ValidationRule.Time:
                    this.MaxLength = 5;
                    this.Regex = "^([0-9]{1,2}:[0-9]{2})$";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid time format.";
                break;
                case ValidationRule.Zip:
                    this.MaxLength = 15;
                    this.Regex = "[0-9A-Za-z]+";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid ZIP code.";
                    break;
                case ValidationRule.Website:
                    this.MaxLength = 512;
                    this.Regex = "(((http(s)?)(://+))(www\.)?[a-zA-Z0-9\-\._]+\.+([\.a-zA-Z0-9\-]+)?(:[0-9]+)?)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid website.";
                    break;
                case ValidationRule.Guid:
                    this.MaxLength = 40;
                    this.Regex = "(([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12})";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid GUID.";
                    break;
                case ValidationRule.DeezerURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?deezer.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Deezer URL";
                    break;
                case ValidationRule.SpotifyURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?spotify.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid spotify URL";
                    break;
                case ValidationRule.PinterestURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?pinterest.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Pinterest URL";
                    break;
                case ValidationRule.SoundcloudURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?soundcloud.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Soundcloud URL";
                    break;
                case ValidationRule.MySpaceURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?myspace.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid MySpace URL";
                    break;
                case ValidationRule.YoutubeURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?youtube.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Youtube URL";
                    break;
                case ValidationRule.FlickrURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?flickr.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid FlickR URL";
                    break;
                case ValidationRule.LinkedInURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?linkedin.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid LinkedIn URL";
                    break;
                case ValidationRule.GoogleURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?google.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Google URL";
                    break;
                case ValidationRule.TwitterURL:
                    this.MaxLength = 255;
                    this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?twitter.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Twitter URL";
                    break;
                case ValidationRule.Word:
                    this.MaxLength = 255;
                    this.Regex = "\w+";
                    this.InvalidMsg = "The input of $FIELD_NAME$ is not in a valid format.";
                    break;
                case ValidationRule.Sentence:
                    this.MaxLength = 1024;
                    this.Regex = "([0-9A-Z]+[a-zA-Z0-9\s\,\-\'\(\)\%\+\-\=\;\:\[\]\{\}\*\#\!\\\|\?]+?(\.|\?|\!))";
                    break;
                default:
                    this.Rule = ValidationRule.Any;
                    this.Regex = ".*";
                    this.MaxLength = 2048;
                    this.InvalidMsg = "The input of $FIELD_NAME$ exceeds the max. character limit of 2048";
                    break;
            }
        }
    }
}
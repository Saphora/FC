var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            (function (ValidationRule) {
                ValidationRule[ValidationRule["Email"] = 0] = "Email";
                ValidationRule[ValidationRule["Zip"] = 1] = "Zip";
                ValidationRule[ValidationRule["Website"] = 2] = "Website";
                ValidationRule[ValidationRule["Phone"] = 3] = "Phone";
                ValidationRule[ValidationRule["Number"] = 4] = "Number";
                ValidationRule[ValidationRule["Word"] = 5] = "Word";
                ValidationRule[ValidationRule["Text"] = 6] = "Text";
                ValidationRule[ValidationRule["Sentence"] = 7] = "Sentence";
                ValidationRule[ValidationRule["Any"] = 8] = "Any";
                ValidationRule[ValidationRule["FacebookURL"] = 9] = "FacebookURL";
                ValidationRule[ValidationRule["TwitterURL"] = 10] = "TwitterURL";
                ValidationRule[ValidationRule["InstagramURL"] = 11] = "InstagramURL";
                ValidationRule[ValidationRule["YoutubeURL"] = 12] = "YoutubeURL";
                ValidationRule[ValidationRule["FlickrURL"] = 13] = "FlickrURL";
                ValidationRule[ValidationRule["GoogleURL"] = 14] = "GoogleURL";
                ValidationRule[ValidationRule["LinkedInURL"] = 15] = "LinkedInURL";
                ValidationRule[ValidationRule["MySpaceURL"] = 16] = "MySpaceURL";
                ValidationRule[ValidationRule["SoundcloudURL"] = 17] = "SoundcloudURL";
                ValidationRule[ValidationRule["PinterestURL"] = 18] = "PinterestURL";
                ValidationRule[ValidationRule["DeezerURL"] = 19] = "DeezerURL";
                ValidationRule[ValidationRule["SpotifyURL"] = 20] = "SpotifyURL";
                ValidationRule[ValidationRule["Guid"] = 21] = "Guid";
                ValidationRule[ValidationRule["BigText"] = 22] = "BigText";
                ValidationRule[ValidationRule["ShortText"] = 23] = "ShortText";
                ValidationRule[ValidationRule["Time"] = 24] = "Time";
            })(Util.ValidationRule || (Util.ValidationRule = {}));
            var ValidationRule = Util.ValidationRule;
            var _VALIDATOR_REGITEM = (function () {
                function _VALIDATOR_REGITEM() {
                    this.rule = ValidationRule.Any;
                    this.required = false;
                }
                return _VALIDATOR_REGITEM;
            }());
            Util._VALIDATOR_REGITEM = _VALIDATOR_REGITEM;
            var Validator = (function () {
                function Validator(instKey) {
                    this.HasRegex = false;
                    this.Required = false;
                    this.RequiredMsg = "The field $FIELD_NAME$ is empty but required.";
                    if (instKey != "13B072C0-E000-47CB-BEDC-8D0A8C9690FD") {
                        throw new Error("Use Validator.GetInstance() instead of manually creating instances.");
                    }
                }
                Validator.GetInstance = function () {
                    if (Validator.instance == null) {
                        Validator.instance = new Validator("13B072C0-E000-47CB-BEDC-8D0A8C9690FD");
                    }
                    return Validator.instance;
                };
                Validator.prototype.Validate = function (rule, fieldID, fieldValue) {
                    this.setRegex(rule);
                    var regex = new RegExp(this.Regex);
                    if (regex.test(fieldValue) != true) {
                        $("#" + fieldID).addClass("invalid");
                    }
                    else {
                        $("#" + fieldID).removeClass("invalid");
                        $("#" + fieldID).addClass("valid");
                    }
                };
                Validator.prototype.setRegex = function (r) {
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
                };
                return Validator;
            }());
            Util.Validator = Validator;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=Validator.js.map
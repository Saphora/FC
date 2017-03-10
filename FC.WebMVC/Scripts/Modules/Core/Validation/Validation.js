var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Validation;
        (function (Validation_1) {
            (function (ValidationRule) {
                ValidationRule[ValidationRule["Email"] = 0] = "Email";
                ValidationRule[ValidationRule["Zip"] = 1] = "Zip";
                ValidationRule[ValidationRule["Website"] = 2] = "Website";
                ValidationRule[ValidationRule["Name"] = 3] = "Name";
                ValidationRule[ValidationRule["Phone"] = 4] = "Phone";
                ValidationRule[ValidationRule["Number"] = 5] = "Number";
                ValidationRule[ValidationRule["Word"] = 6] = "Word";
                ValidationRule[ValidationRule["Text"] = 7] = "Text";
                ValidationRule[ValidationRule["Sentence"] = 8] = "Sentence";
                ValidationRule[ValidationRule["Any"] = 9] = "Any";
                ValidationRule[ValidationRule["FacebookURL"] = 10] = "FacebookURL";
                ValidationRule[ValidationRule["TwitterURL"] = 11] = "TwitterURL";
                ValidationRule[ValidationRule["InstagramURL"] = 12] = "InstagramURL";
                ValidationRule[ValidationRule["YoutubeURL"] = 13] = "YoutubeURL";
                ValidationRule[ValidationRule["FlickrURL"] = 14] = "FlickrURL";
                ValidationRule[ValidationRule["GoogleURL"] = 15] = "GoogleURL";
                ValidationRule[ValidationRule["LinkedInURL"] = 16] = "LinkedInURL";
                ValidationRule[ValidationRule["MySpaceURL"] = 17] = "MySpaceURL";
                ValidationRule[ValidationRule["SoundcloudURL"] = 18] = "SoundcloudURL";
                ValidationRule[ValidationRule["PinterestURL"] = 19] = "PinterestURL";
                ValidationRule[ValidationRule["DeezerURL"] = 20] = "DeezerURL";
                ValidationRule[ValidationRule["SpotifyURL"] = 21] = "SpotifyURL";
                ValidationRule[ValidationRule["Guid"] = 22] = "Guid";
            })(Validation_1.ValidationRule || (Validation_1.ValidationRule = {}));
            var ValidationRule = Validation_1.ValidationRule;
            var ValidationRuleItem = (function () {
                function ValidationRuleItem() {
                }
                return ValidationRuleItem;
            }());
            Validation_1.ValidationRuleItem = ValidationRuleItem;
            var Validation = (function () {
                function Validation(rule, required) {
                    if (required === void 0) { required = false; }
                    this.HasRegex = false;
                    this.RequiredMsg = "The field $FIELD_NAME$ is empty but required.";
                    this.setRegex(rule);
                    this.Required = required;
                    this.Rule = rule;
                }
                Validation.prototype.setRegex = function (r) {
                    this.Rule = r;
                    switch (r) {
                        case ValidationRule.Any:
                            this.MaxLength = 255;
                            this.Regex = ".*";
                            this.InvalidMsg = "$FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Name:
                            this.MaxLength = 50;
                            this.Regex = ".*";
                            this.InvalidMsg = "$FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Email:
                            this.MaxLength = 255;
                            this.Regex = "([a-z-A-Z-0-9\-_\.]+@+[a-z-A-Z-0-9\-_]+[a-z-A-Z-0-9\.\-_]+\.[a-zA-Z-0-9\-_]+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid e-mail address.";
                            break;
                        case ValidationRule.Number:
                            this.Regex = "([0-9]+)";
                            this.MaxLength = 50;
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid number.";
                            break;
                        case ValidationRule.Phone:
                            this.MaxLength = 20;
                            this.Regex = "(\\+[0-9]{10,20})";
                            this.InvalidMsg = "$FIELD_NAME$ has an invalid format. +XXXXXXXXXXX.";
                            break;
                        case ValidationRule.Text:
                            this.MaxLength = 2048;
                            this.Regex = ".*";
                            this.InvalidMsg = "$FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Zip:
                            this.MaxLength = 15;
                            this.Regex = "[0-9A-Za-z]+";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid ZIP code.";
                            break;
                        case ValidationRule.Website:
                            this.MaxLength = 512;
                            this.Regex = "(((http(s)?)(://+))(www\.)?[a-zA-Z0-9\-\._]+\.+([\.a-zA-Z0-9\-]+)?(:[0-9]+)?)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid website.";
                            break;
                        case ValidationRule.Guid:
                            this.MaxLength = 40;
                            this.Regex = "(([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12})";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid GUID.";
                            break;
                        case ValidationRule.DeezerURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?deezer.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Deezer URL";
                            break;
                        case ValidationRule.SpotifyURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?spotify.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid spotify URL";
                            break;
                        case ValidationRule.PinterestURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?pinterest.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Pinterest URL";
                            break;
                        case ValidationRule.SoundcloudURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?soundcloud.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Soundcloud URL";
                            break;
                        case ValidationRule.MySpaceURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?myspace.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid MySpace URL";
                            break;
                        case ValidationRule.YoutubeURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?youtube.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Youtube URL";
                            break;
                        case ValidationRule.FacebookURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?facebook.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Facebook URL";
                            break;
                        case ValidationRule.InstagramURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?instagram.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Instagram URL";
                            break;
                        case ValidationRule.FlickrURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?flickr.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid FlickR URL";
                            break;
                        case ValidationRule.LinkedInURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?linkedin.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid LinkedIn URL";
                            break;
                        case ValidationRule.GoogleURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?google.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Google URL";
                            break;
                        case ValidationRule.TwitterURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?twitter.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Twitter URL";
                            break;
                        case ValidationRule.Word:
                            this.MaxLength = 255;
                            this.Regex = "\w+";
                            this.InvalidMsg = "$FIELD_NAME$ is not in a valid format.";
                            break;
                        case ValidationRule.Sentence:
                            this.MaxLength = 1024;
                            this.Regex = "([0-9A-Z]+[a-zA-Z0-9\s\,\-\'\(\)\%\+\-\=\;\:\[\]\{\}\*\#\!\\\|\?]+?(\.|\?|\!))";
                            break;
                        default:
                            debugger;
                            this.Rule = ValidationRule.Any;
                            this.Regex = ".*";
                            this.MaxLength = 2048;
                            this.InvalidMsg = "The input of $FIELD_NAME$ exceeds the max. character limit of 2048";
                            break;
                    }
                };
                return Validation;
            }());
            Validation_1.Validation = Validation;
        })(Validation = Core.Validation || (Core.Validation = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=Validation.js.map
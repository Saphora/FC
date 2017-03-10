var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var Services;
            (function (Services) {
                var RatingService = (function (_super) {
                    __extends(RatingService, _super);
                    function RatingService(http, q) {
                        _super.call(this, http, q);
                    }
                    RatingService.prototype.GetList = function () {
                        throw new Error("Rating service GetList is not available");
                    };
                    RatingService.prototype.GetRate = function (ContentItemID, ContentItemType) {
                        return this.Get('/API/Rating/GetRating?&contentItemID=' + ContentItemID + '&type=' + ContentItemType);
                    };
                    RatingService.prototype.Rate = function (ContentItemID, ContentItemType, CreditAmmount) {
                        var msg = new FC.Shared.ServiceMessages.RatingMsg();
                        if (CreditAmmount <= 5) {
                            msg.CreditAmmount = CreditAmmount;
                            msg.ContentType = ContentItemType;
                            msg.ContentItemID = ContentItemID;
                            return this.Post('/API/Rating/Rate', new FC.Shared.Models.ServiceMessage(msg));
                        }
                        else {
                            return null;
                        }
                    };
                    RatingService.$inject = ['$http', '$q'];
                    return RatingService;
                }(FC.Core.ServiceBase));
                Services.RatingService = RatingService;
            })(Services = Rating.Services || (Rating.Services = {}));
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
RatingModule.GetApplication().app.service('FC.Modules.Rating.Services.RatingService', FC.Modules.Rating.Services.RatingService);
//# sourceMappingURL=RatingService.js.map
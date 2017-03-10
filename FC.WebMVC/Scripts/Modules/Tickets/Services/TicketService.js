var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../Ticket.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Ticket;
        (function (Ticket_1) {
            var Services;
            (function (Services) {
                var TicketService = (function (_super) {
                    __extends(TicketService, _super);
                    function TicketService(http, q) {
                        _super.call(this, http, q);
                    }
                    TicketService.prototype.GetList = function () {
                        return this.Get('/API/Ticket/GetList');
                    };
                    TicketService.prototype.GetTicket = function (TicketId) {
                        return this.Get('/API/Ticket/GetByID?&id=' + TicketId);
                    };
                    TicketService.prototype.GetByFestival = function (festivalID) {
                        return this.Get('/API/Ticket/GetByFestival?&festivalID=' + festivalID);
                    };
                    TicketService.prototype.Create = function (Ticket) {
                        return this.Post('/API/Ticket/Create', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.prototype.Update = function (Ticket) {
                        return this.Post('/API/Ticket/Update', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.prototype.Delete = function (Ticket) {
                        return this.Post('/API/Ticket/Delete', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.prototype.ForceDelete = function (Ticket) {
                        return this.Post('/API/Ticket/ForceDelete', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.$inject = ['$http', '$q'];
                    return TicketService;
                }(FC.Core.ServiceBase));
                Services.TicketService = TicketService;
            })(Services = Ticket_1.Services || (Ticket_1.Services = {}));
        })(Ticket = Modules.Ticket || (Modules.Ticket = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
TicketModule.GetApplication().app.service('FC.Modules.Ticket.Services.TicketService', FC.Modules.Ticket.Services.TicketService);
//# sourceMappingURL=TicketService.js.map
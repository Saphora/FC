///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Ticket;
        (function (Ticket_1) {
            var Ticket = (function () {
                function Ticket(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Ticket.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Ticket.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Ticket;
            }());
            Ticket_1.Ticket = Ticket;
        })(Ticket = Modules.Ticket || (Modules.Ticket = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var TicketModule = new FC.Modules.Ticket.Ticket(angular.module('FC.Modules.Ticket', ApplicationDependencies), Application);
//# sourceMappingURL=Ticket.js.map
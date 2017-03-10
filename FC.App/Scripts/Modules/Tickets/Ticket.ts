///<reference path="../Core/FC.ts"/>
module FC.Modules.Ticket {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class Ticket {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        static $inject = ['$location', 'FC.Core.Services.AuthService'];
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var TicketModule = new FC.Modules.Ticket.Ticket(angular.module('FC.Modules.Ticket', ApplicationDependencies), Application);


///<reference path="../Ticket.ts"/>
module FC.Modules.Ticket.Services {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class TicketService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Ticket>>> {
            return this.Get<IList<MODELS.Ticket>>('/API/Ticket/GetList');
        }

        GetTicket(TicketId: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.Ticket>> {
            return this.Get<FC.Shared.Models.Ticket>('/API/Ticket/GetByID?&id=' + TicketId);
        }

        GetByFestival(festivalID: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.Ticket>> {
            return this.Get<FC.Shared.Models.Ticket>('/API/Ticket/GetByFestival?&festivalID=' + festivalID);
        }

        Create(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Ticket>('/API/Ticket/Create', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Ticket>(Ticket));
        }

        Update(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Ticket>('/API/Ticket/Update', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Ticket>(Ticket));
        }

        Delete(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Ticket>('/API/Ticket/Delete', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Ticket>(Ticket));
        }

        ForceDelete(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Ticket>('/API/Ticket/ForceDelete', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Ticket>(Ticket));
        }
    }
}

TicketModule.GetApplication().app.service('FC.Modules.Ticket.Services.TicketService', FC.Modules.Ticket.Services.TicketService);
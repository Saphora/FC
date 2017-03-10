module FC.Shared.Models {
    export class Ticket {
        
        public TicketID :string;
        public AuthorID :string;
        public Price : number;
        public Author :FC.Shared.Models.ApplicationUser;
        public TicketName :string;
        public TicketDescription :string;
        public IsAvailable :boolean;
        public IsEarlyBird: boolean;
        public IsVipTicket: boolean;
        public IsDiscount: boolean;
        public IsCombiDeal: boolean;
        public IsAllinclusive: boolean;
        public ExternalTicketURL :string;
        public InternalURL :string;
        public Created :string;
        public Modified :string;
        public ArchiveDate :string;
        public Deleted: boolean;
        public CurrencyBase :string;
    }
}
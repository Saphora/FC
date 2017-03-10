module FC.Shared.Models {
    export class FestivalTicket  {
        public IsAllinclusive: boolean;
        public IsCombiDeal: boolean;
        public IsDiscount: boolean;
        public CurrencyBase: string;

        public constructor(currencyBase: string) {
            this.IsAllinclusive = false;
            this.IsCombiDeal = false;
            this.IsDiscount = false;
            this.CurrencyBase = FC.Shared.Enum.CurrencyBase.EUR;
        }
    }
}
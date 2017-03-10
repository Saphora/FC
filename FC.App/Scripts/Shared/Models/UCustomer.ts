module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UCustomer  implements INT.IUCustomer
    {
        public constructor() {
        }

        public CustomerID: string;
        public CompanyName : string;
               
               
        public ContactName : string;
               
               
        public CompanyWebsite : string;
               
               
        public CompanyEmail : string;
               
               
        public CompanyPhone : string;


        public ContactPhone: string;

        public ContactEmail: string;
               
        public CompanyAddress : string;
               
               
        public CompanyPostalCode : string;
               
               
        public CompanyFacebookURL : string;
               
               
        public CompanyLinkedInURL : string;
               
               
        public CompanyTwitterURL : string;
               
               
        public CompanyBankName : string;
               
               
        public CompanyBankBIC : string;
               
               
        public CompanyTaxNr : string;
               
               
        public CompanyVat : string;
               
               
        public CompanyIBAN : string;
               
               
        public CompanyBankAccountName: string;

        public Enabled: boolean;
    }
}

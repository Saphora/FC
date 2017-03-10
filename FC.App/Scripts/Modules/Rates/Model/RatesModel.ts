
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
module FC.Modules.Rates.Model {
    import CM = FC.Core.CoreModel;
    export class Rates {
        constructor(data: Rates) {
            this.Base = data.Base || data["base"];
            this.Date = data.Date || data["date"];
            this.Rates = new CM.Dictionary<string,number>(data.Rates || data["rates"]);
        }
        Base: string;
        Date: Date;
        Rates: CM.Dictionary<string, number>;
    }
}
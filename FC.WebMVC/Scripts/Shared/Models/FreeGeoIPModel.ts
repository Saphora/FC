module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class FreeGeoIPModel implements INT.IFreeGeoIPModel {
        public ip:string;
        public country_code:string;
        public country_name:string;
        public region_code:string;
        public region_name:string;
        public city:string;
        public zip_code:string;
        public time_zone:string;
        public latitude:string;
        public longitude:string;
        public metro_code:string;
    }
}
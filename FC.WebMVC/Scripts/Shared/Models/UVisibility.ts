module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UVisibility extends FC.Shared.Models.BaseModel implements INT.IUVisibility {
        public Desktop: boolean;
        public SmDesktop: boolean;
        public Mobile: boolean;
        public SmMobile: boolean;
        public ColLGCls: string;
        public ColMDCls: string;
        public ColSMCls: string;
        public ColXSCls: string;
    }
}
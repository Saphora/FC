module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import UTIL = FC.Shared.Util;
    export class BaseModel implements INT.IBaseModel {
        protected _validationRegister: FC.Shared.Util._VALIDATOR_REGITEM[];
        protected validator: UTIL.Validator;
    }
}
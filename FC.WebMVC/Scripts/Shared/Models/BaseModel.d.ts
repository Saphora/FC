declare module FC.Shared.Models {
    class BaseModel implements FC.Shared.Interfaces.IBaseModel {
        constructor(Child: FC.Shared.Interfaces.IBaseModel);
        IsoName: string;
        Localization: UserLocalization;
        UmbracoID: Number;
    }
}

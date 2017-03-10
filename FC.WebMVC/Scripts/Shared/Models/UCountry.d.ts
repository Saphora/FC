declare module FC.Shared.Models {
    class UCountry extends BaseModel implements FC.Shared.Interfaces.IUCountry {
        constructor(c: FC.Shared.Interfaces.IUCountry);
        Name: string;
        CultureIsoName: string;
        LanguageName: string;
        Currency: string;
    }
}

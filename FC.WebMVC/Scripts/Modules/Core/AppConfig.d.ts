declare module FC.Core {
    enum EnvironmentType {
        Local = 0,
        Remote = 1,
    }
    class Environment {
        static LocalBaseURL: string;
        static RemoteBaseURL: string;
        static GetBaseURL(et: EnvironmentType): string;
    }
    interface IAppClient {
        Location: string;
        ScreenWidth: Number;
        ScreenHeight: Number;
        ViewportWidth: Number;
        ViewportHeight: Number;
        Browser: string;
        SafeConnection: boolean;
        UserCulture: string;
        CurrentTicks: Number;
    }
    class AppClient {
        constructor(client: IAppClient);
        CurrentTicks: number;
        UserCulture: string;
        Location: string;
        ScreenWidth: Number;
        ScreenHeight: Number;
        ViewportWidth: Number;
        ViewportHeight: Number;
        Browser: string;
        SafeConnection: boolean;
    }
    class AppConfig {
        static CurrentEnvironment: EnvironmentType;
        static URLRoot: string;
        static Environment: Environment;
        static UserDateTime: Date;
        static UserName: string;
        static UserID: number;
        static AnonUser: boolean;
        static IsSignedInWithSpotify: boolean;
        static IsSignedInWithFacebook: boolean;
        static IsSignedInWithTwitter: boolean;
        static IsSignedInLocal: boolean;
        static Localization: {};
        static Client: AppClient;
        static ServiceHeaders: {
            'Culture': string;
            'UserDateTime': number;
            'Content-Type': string;
            'Accept': string;
        };
    }
}

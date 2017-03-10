module FC.Shared.Models {
    export class AppUserSession {
        public SessionID: string;
        public UserID: string;
        public User: ApplicationUser;
        public Token: string;
        public Active: boolean;
        public IPAddress: string;
        public IPv6Address: string;
        public LoginCount: number;
        public HostName: string;
        public HostAddress: string;
        public Country: string;
        public Expires: string;
        public Created: Date;
        public Modified: Date;
        public Culture: string;
        public UserAgent: string;
        public ScreenWidth: string;
        public ScreenHeight: string;
        public Authorized: boolean;
        public Authenticated: boolean;
        public IsMobileDevice: boolean;
        public BrowserName: string;
        public Platform: string;
        public MobileDeviceName: string;
        public MobileDeviceVersion: string;
        public Mode: FC.Shared.Enum.AuthMode;
        public Controller: string;
        public Action: string;
        public URI: string;
        public Payload: string;
    }
}
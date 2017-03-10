module FC.Shared.ServiceMessages {
    export class IsAuthMsg {
        public SessionID: string;
        public Token: string;
        public Roles: Array<string>;
    } 
}
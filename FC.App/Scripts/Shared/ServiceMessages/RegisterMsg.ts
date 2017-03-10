module FC.Shared.ServiceMessages {
    export class RegisterMsg {
        public Password: string;
        public AcceptTerms: boolean;
        public UserEmailAddress: string;
    }
}
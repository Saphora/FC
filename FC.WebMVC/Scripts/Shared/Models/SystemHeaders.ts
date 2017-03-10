module FC.Shared.Models {
    export class SystemHeaders {
        public Token: string;
        public UserDateTime: number;
        public Culture: string;
        public Accept: string;
        public ContentType: string;
        public constructor(headers?: SystemHeaders) {
            if (headers) {
                if (headers.UserDateTime) {
                    this.UserDateTime = headers.UserDateTime;
                }
                if (headers.Culture) {
                    this.Culture = headers.Culture;
                }
                if (headers.Accept) {
                    this.Accept = headers.Accept;
                }
                if (headers.ContentType) {
                    this.ContentType = headers.ContentType;
                }
                if (headers.Token) {
                    this.Token = headers.Token;
                }
            }
        }
    }
}
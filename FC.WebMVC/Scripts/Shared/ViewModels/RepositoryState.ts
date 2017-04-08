module FC.Shared.ViewModels {
    export class RepositoryState {
        public SUCCESS: boolean;
        public EXISTS: boolean;
        public INVALID:boolean;
        public DBERROR: boolean;
        public ERROR: boolean;
        public MSG: string;
        public NOT_AUTHORIZED: boolean;
        public ValidationErrors: Array<FC.Shared.ViewModels.ValidationError>;
        public AffectedID: string;
        public Data: Object;
    }
}
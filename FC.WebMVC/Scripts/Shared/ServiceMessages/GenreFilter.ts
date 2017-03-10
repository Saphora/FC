module FC.Shared.ServiceMessages {
    export class GenreFilter {
        constructor(filter?: GenreFilter) {
            if (filter) {
                this.GenreID = filter.GenreID;
                this.ParentID = filter.ParentID;
                this.Name = filter.Name;
            }
        }
        public GenreID: string;
        public ParentID: string;
        public Name: string;
    }
}
module FC.Shared.Models {        
    export class MenuSection {
        public SectionID: string;
        public Name: string;
        public FAIcon: string;
        public SortOrder: string;
        public PageKey: string;
        public MenuItems: MenuItem[];
        public Deleted: boolean;
        public IsPublished: boolean;
    }
}
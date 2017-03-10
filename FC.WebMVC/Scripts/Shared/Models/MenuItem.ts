module FC.Shared.Models {
    export class MenuItem {
        public MenuItemID:string;
        public ParentID:string;
        public OpositeID:string;
        public SortOrder:number;
        public FAIcon:string;
        public Title:string;
        public URL:string;
        public OnClick:string;
        public IsSpecific:boolean;
        public SectionID:string;
        public Name:string;
        public Deleted:boolean;
        public IsPublished:boolean;
    }
}
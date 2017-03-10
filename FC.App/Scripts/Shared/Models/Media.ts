module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class Media  {
        public MediaID :       string;           
        public DirectoryID :   string;          
        public FileName: string;    
        public Name: string;      
        public FileMimeType :  string;          
        public Ext :           string;          
        public Author: ApplicationUser;          
        public Width: number;
        public Height: number;
        public MediaType: MediaType;
        public ExternalURL: string;
        public Directory: MediaDirectory;
    }
}
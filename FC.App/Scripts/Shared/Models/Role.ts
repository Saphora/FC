module FC.Shared.Models {
    export class Role {
        public RoleID: string;
        public Name: string;
        public Permissions: FC.Shared.Models.Permission[];
    }
}
module FC.Shared.ServiceMessages {
    export class SocialProfileMsg {
        public SocialProfile: FC.Shared.Models.SocialProfile;
        public GenericID: string;
        public ContentType: FC.Shared.Enum.SocialMediaBindable;
    }
}
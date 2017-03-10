module FC.Shared.Models {
    export class SocialProfile  {
        public SocialProfileID: string;
        public URL: string;
        public ProfileType: SocialProfileType;
        public ProfileTypeID: string;
        public GenericID: string;
        public ContentType: FC.Shared.Enum.SocialMediaBindable;
    }
}
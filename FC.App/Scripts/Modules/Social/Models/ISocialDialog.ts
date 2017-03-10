module FC.Modules.Social.Models {
    export interface ISocialDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.SocialProfile> {
        ProfileTypes: FC.Shared.Models.SocialProfileType[]; 
        SelectedTypeID: string;
        SocialProfiles: FC.Shared.Models.SocialProfile[];
        WizardCreateStep: number;
        CreateModel: FC.Shared.Models.SocialProfile;
        GenericID: string;
        ContentType: FC.Shared.Enum.SocialMediaBindable;
    }
}
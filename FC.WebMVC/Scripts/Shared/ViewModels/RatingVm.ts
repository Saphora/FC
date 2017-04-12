module FC.Shared.ViewModels {
    export interface RatingVm extends FC.Shared.ViewModels.IFormVMBase<any>  {
        Counter: number;
        StarCount: number;
        Star1Active: boolean;
        Star2Active:boolean;
        Star3Active:boolean;
        Star4Active:boolean;
        Star5Active: boolean;
        DisplayCount: string;
    }
}
module FC.Modules.Filtering {
    export class FilterChangedEvent {
        public constructor(detail: Models.FilterBarVM|Models.IFilterBarVM) {
            window.dispatchEvent(new CustomEvent("FilterChanged", { detail: detail }));
        }   
    }
}
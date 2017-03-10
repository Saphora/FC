var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var FilterChangedEvent = (function () {
                function FilterChangedEvent(detail) {
                    window.dispatchEvent(new CustomEvent("FilterChanged", { detail: detail }));
                }
                return FilterChangedEvent;
            }());
            Filtering.FilterChangedEvent = FilterChangedEvent;
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FilterChangedEvent.js.map
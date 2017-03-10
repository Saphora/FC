var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var GenreFilter = (function () {
                function GenreFilter(filter) {
                    if (filter) {
                        this.GenreID = filter.GenreID;
                        this.ParentID = filter.ParentID;
                        this.Name = filter.Name;
                    }
                }
                return GenreFilter;
            }());
            ServiceMessages.GenreFilter = GenreFilter;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));

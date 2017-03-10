var _CacheManagerInstance;

var CacheMode = {
    Cookie: 1,
    LocalStorage: 2,
    Server: 3
};

var CacheManager = function () {
    if (arguments[0] != "manager") {
        console.error("You cannot create a new instance of the cachemanager use CacheManager.GetInstance instead.");
    }
    var vm = this;
    vm.HasErrors = false;
    vm.Errors = [];
    vm.WriteCache = WriteCache;
    vm.Get = Get;
    vm.DeleteFromCache = DeleteFromCache;
    vm.Contains = Contains;
    vm.Expires = 60;
    init();
    //Write to cache
    function WriteCache(cacheMode, key, obj, path, seconds) {
        var currentDate = new Date();
        if (seconds) {
            vm.Expires = seconds
        }
        var expires = new Date().setSeconds(currentDate.getSeconds()+vm.Expires);
        var data = {
            expires: expires,
            data : obj
        };
        var str = JSON.stringify(data);
        if (cacheMode == CacheMode.Cookie) {
            var newDate = new Date(new Date().getUTCFullYear() + 1, new Date().getMonth(), new Date().getDate());
            if (expDate) {
                newDate = expDate;
            }
            if (!IsNullOrEmpty(path)) {
                var cookieStr = key + '=' + str + ';expires=' + newDate.toUTCString() + ';path=' + path;
                document.cookie = key + '=' + str + ';expires=' + newDate.toUTCString() + ';path=' + path;
            } else {
                var cookieStr = key + '=' + str + ';expires=' + newDate.toUTCString() + ';path=/';
                document.cookie = key + '=' + str + ';expires=' + newDate.toUTCString() + ';path=/';
            }
        }
        if (cacheMode == CacheMode.LocalStorage) {
            if (data.data) {
                if (data.data != "") {
                    localStorage.setItem(key, str);
                    console.info('Setting ' + key + ' to localstorage')
                }
            }
        }
    }
    function Get(cacheMode, key) {
        if (cacheMode == CacheMode.Cookie) {
            var name = key + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return JSON.parse(c.substring(name.length, c.length));
                }
            }
        }
        if (cacheMode == CacheMode.LocalStorage) {
            console.info('Getting ' + key + ' from localstorage');
            var data = JSON.parse(localStorage[key]);
            if (data.expires > new Date().getMilliseconds()) {
                return data;
            } else {

                console.info('Data expired ' + key + ' from localstorage')
                DeleteFromCache(CacheMode.LocalStorage, key);
                return null;
            }
        }
    }
    function DeleteFromCache(cacheMode, key,path) {
        if (cacheMode == CacheMode.Cookie) {
            if (path) {
                document.cookie = key + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=' + path;
            } else {
                document.cookie = key + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/' + path;
            }
        }
        if (cacheMode == CacheMode.LocalStorage) {
            localStorage.removeItem(key);
        }
    }

    function Contains(cacheMode, key) {
        if (cacheMode == CacheMode.Cookie) {
            var r = GetFromCache(CacheMode.Cookie, key);
            if (IsNullOrEmpty(r)) {
                return false;
            } else {
                return true;
            }
        }
        if (cacheMode == CacheMode.LocalStorage) {
            if (IsNullOrEmpty(localStorage[key])==false) {
                var data = JSON.parse(localStorage[key]);
                
                if (data.expires > new Date().getTime()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    function init() {
    }


}
CacheManager.GetInstance = function () {
    if (_CacheManagerInstance == null) {
        _CacheManagerInstance = new CacheManager("manager");
        return _CacheManagerInstance;
    } else {
        return _CacheManagerInstance;
    }
}
window.Cache = CacheManager.GetInstance();
var FCClient = function () {
    var vm = this;
    vm.UserCulture = "nl-NL";
    //vm.BaseURL = "http://192.168.0.11:8888"
    vm.BaseURL = "http://localhost:8888";
    //vm.BaseURL = "http://h2510024.stratoserver.net:8888"
    vm.UserDateTime = new Date();
    vm.UserName = "";
    vm.UserID = 0;
    vm.AnonUser = true;
    vm.IsSignedInWithSpotify = false;
    vm.IsSignedInWithFacebook = false;
    vm.IsSignedInWithTwitter = false;
    vm.IsSignedInLocal = false;
    vm.Localization = {};
    vm.Client = {
        Geo: window.navigator.geolocation,
        Device: null,
        Location: window.location,
        ScreenWidth: window.outerWidth,
        ScreenHeight: window.outerHeight,
        ViewportWidth: window.innerWidth,
        ViewportHeight: window.innerHeight, 
        Browser: "",
        SafeConnection:false,
        IsTopUser:false,
        AddBlockerDetected:false,
        Cookies: {},
        PersonalMessages: {},
        FriendList: {},  
        Platform: window.navigator.platform
    }
    vm.init = init;

    function init() {
        setSafeConnection();
        if (window.navigator.languages != null && window.navigator.languages.length > 0) {
            setUserCulture(window.navigator.languages[0]);
            //setUserCulture("pl-PL");
        }
        return vm;
    }
    function setSafeConnection() {
        if (window.location.protocol == "https") {
            vm.Client.SafeConnection = true; 
        } else {
            vm.Client.SafeConnection = true;
        }
    }

    function setUserCulture(culture) {
        vm.UserCulture = culture;
    }
    return vm.init();
};

FCClient.GetInstance = function () {
    var vm = this;
    vm._instance = null;
    if (vm._instance == null) {
        vm._instance = new FCClient();
        return vm._instance;
    } else {
        return vm._Instance;
    }
}
FCClient.CurrentTheme = null;
FCClient.URLRoot = "/App/";

(function () {
    'use strict';
    angular.module('FC', [
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'FC.Main',
        'FC.Calendar',
        'FC.Tiles',
        'FC.FlexSelect',
        'FC.Reel',
        'FC.Festival',
        'FC.News'
    ]);


    angular.module('FC').config(function ($routeProvider, $locationProvider) {
        var FCL = FCClient.GetInstance();
        var templateUrl ="";
        templateUrl = "App/templates/WeekCalendarDesktop.html";
        
        $routeProvider.when('/calendar/:year/:month/:genre', {
            templateUrl: templateUrl,
            controller: 'CalendarController',
            controllerAs: 'CCtr'
        });
        $routeProvider.when('/calendar/:genre', {
            templateUrl: templateUrl,
            controller: 'CalendarController',
            controllerAs: 'CCtr'
        });
        $routeProvider.when('/festival/:festivalId/:genre', {
            templateUrl: 'App/Templates/FestivalDetail.html',
            controller: 'FestivalController',
            controllerAs: 'FCtr'
        });
        $routeProvider.when('/home', {
            templateUrl: 'App/templates/Tiles.html',
            controller: 'TilesController',
            controllerAs: 'Ctr'
        });
        $routeProvider.when('/', {
            templateUrl: 'App/templates/Tiles.html',
            controller: 'TilesController',
            controllerAs: 'Ctr'
        });
        $locationProvider.html5Mode(false);
    });


    //YES life can be easy:)
    window.IsNullOrEmpty = function (obj) {
        if (obj == null) {
            return true;
        } else if(obj.length == 0) {
            return true;
        }else if (obj == undefined) {
            return true;
        } else if(obj.lenght == 0) {
            return true;
        }else if (typeof(obj) == "string" && obj == "") {
            return true;
        }
        return false;
    }

    window.StrFormat = function (template) {
        if (!IsNullOrEmpty(template)) {
            var params = [];
            var tpl = template;
            var returnStr = "";
            if (arguments.length > 1) {
                $.each(arguments, function (k, v) {
                    if (k > 0) {
                        var readKey = k - 1;
                        tpl = tpl.replace("{" + readKey + "}", v)
                    }
                });
                return tpl;
            } else {
                console.error("StrFormat function called whitout any formatting arguments.");
            }
        } else {
            console.error("No string template was specified for the StrFormat function");
        }
    }
})();

var URLManagerInstance = null;
var URLManager = function () {
    if (IsNullOrEmpty(arguments) || arguments[0] != "manager") {
        console.error("You cannot create a new instance of the URL manager, use window.URLManager.GetInstance()");
    }
    var vm = this;
    vm.URLCollection = {};
    vm.AddURL = AddURL;
    vm.Html5Mode = false;
    vm.UrlHash = "#"
    vm.GetURL = GetURL;
    function AddURL(scope, key, url) {
        if (!IsNullOrEmpty(vm) && !IsNullOrEmpty(vm.URLCollection) && !IsNullOrEmpty(vm.URLCollection[scope]) && IsNullOrEmpty(vm.URLCollection[scope][key])) {
            var index = vm.URLCollection.length;
            vm.URLCollection[scope][key] = url;
        } else {
            if (vm.URLCollection) {
                if (IsNullOrEmpty(vm.URLCollection[scope])) {
                    vm.URLCollection[scope] = {};
                    vm.URLCollection[scope][key] = url;
                } else if (IsNullOrEmpty(vm.URLCollection[scope][key])) {
                    vm.URLCollection[scope][key] = url;
                }
            }
        }
    }
    function GetURL(scope, key) {
        if (!IsNullOrEmpty(vm.URLCollection[scope]) && !IsNullOrEmpty(vm.URLCollection[scope][key])) {
            var url = vm.URLCollection[scope][key];
            $.each(arguments, function (k, v) {
                if (k >= 2) {
                    var readKey = k - 2;
                    url = url.replace('{' + readKey + '}', v);
                }
            });
            if (vm.Html5Mode == false) {
                url = '/' + vm.UrlHash + '/' + url;
            }
            return url;
        }
    }
};
URLManager.GetInstance = function () {
    if (URLManagerInstance == null) {
        URLManagerInstance = new URLManager("manager");
        return URLManagerInstance;
    } else {
        return URLManagerInstance;
    }
};
var FC = angular.module('FC');
FC.Genres = {};

angular.module('FC').directive('currenturl', ['$location','$route', CurrentURL]);
function CurrentURL($location,$route) {
    return function (scope, element, attrs) {
        element.attr('ng-href', '/#/'+$location.path());
    }
}
angular.module('FC').directive('apiImg', apiImg);

angular.module('FC').directive('backimg', backImg);

angular.module('FC').directive('collapsible', collapsible)
angular.module('FC').directive('theme', ['$location','$routeParams', '$route', theme])
angular.module('FC').directive('desktoponly', desktopOnly);
angular.module('FC').ActiveTheme = {};
var FCL = FCClient.GetInstance();
function desktopOnly() {
    return function (scope, element, attrs) {
        if (parseInt(FCL.Client.ScreenWidth) <= 1024 || parseInt(FCL.Client.ViewportWidth) <= 1024) {
            $(element).hide();
        }
    }
}

function backImg() {
    return function (scope, element, attrs) {
        var imgSrc = "";
        scope.$watch(attrs.watch, function (img) {
            if (img) {
                imgSrc = img;
                var url = FCL.BaseURL + '/' + attrs.backimg.replace("$0$", imgSrc);
                element.css({
                    'background-image': 'url(' + url + ')',
                    'background-size': 'cover'
                });
            }
        });
    };
};

function color(color) {
    return "#" + color;
};
var RouteParams = null;
var Route = {};
function theme($location,$routeParams, $route) {
    Route = $route;
    RouteParams = $routeParams;
    return function (scope, element, attrs) {
        scope.theme = {};
        scope.route = $route;
        scope.routeParams = $routeParams;
        scope.genreId = $routeParams.genre;
        var index = $location.path().split('/').length - 1;
        if (index >= 0) {
            scope.genreId = $location.path().split('/')[index];
            if (!isNaN(parseInt(scope.genreId))) {
                scope.theme = ThemeData[scope.genreId];
                theme = scope.theme;
            }
        } else {
            scope.theme = ThemeData[4492];
            theme = scope.theme;
        }
        if (theme != null && theme != {} && theme != [] && theme != undefined) {
            angular.module('FC').ActiveTheme = theme;
            ActiveTheme = theme;
            if (ActiveTheme) {
                $.each(attrs.theme.split(','), function (key, themeProperty) {
                    themeProperty = themeProperty.replace(' ', "").toLowerCase();
                    switch (themeProperty) {
                        case "rating":
                            element.css({
                                'border': '1px solid ' + color(ActiveTheme.ThemeColor)
                            });
                            break;
                        case "text-themecolor":
                            element.css({
                                'color': color(ActiveTheme.ThemeColor)
                            });
                            break;
                        case "text-default":
                            element.css({
                                'color': color(ActiveTheme.DefaultTextColor)
                            });
                            break;
                        case "theme-bg-color":
                            element.css({
                                'background-color': color(ActiveTheme.ThemeColor)
                            });
                            break;
                        case "background":
                            if (attrs.for) {
                                element = $(attrs.for);
                                var url = FCL.BaseURL + '/';
                                var width = FCL.Client.ScreenWidth;
                                var height = FCL.Client.ScreenHeight;
                                url += theme.BackgroundImage + ".img?";
                                if (height > width) {
                                    url += "&height=" + height;
                                } else if (height == width) {
                                    url += "&width=" + width + "&height=" + height;
                                } else {
                                    url += "&width=" + width;
                                }
                                element.css({
                                    'background-image': 'url(' + url + ')',
                                    'background-repeat': 'no-repeat',
                                    'background-color': color(theme.BackgroundColor)
                                });
                            }
                            break;
                        case "button":
                            element.css({
                                'background-color': color(ActiveTheme.ThemeColor),
                                'color': color(ActiveTheme.ButtonTextColor)
                            });
                            break;
                        case "header":
                            element.css({
                                'background-color': color(ActiveTheme.ThemeColor),
                                'color': color(ActiveTheme.ButtonTextColor)
                            });
                            break;
                        case "link":
                            break;
                        case "count":
                            element.css({
                                'background-color': color(ActiveTheme.ThemeColor),
                                'color': color(ActiveTheme.ButtonTextColor)
                            });
                            break;

                        case "list-item":

                            var cls = element.attr('class');
                            var r = $(element.parent()[0]);
                            //var p = r.find('.ListItem').last();
                            element.css({
                                'border-bottom':'2px solid '+color(ActiveTheme.ThemeColor)
                            });
                            //p.css({
                            //    'border-bottom': '0'
                            //});
                            break;
                    }
                });

            }
        } else {
            throw new Error("Theme is undefined.");
        }
    }
}
function collapsible() {
    return function (scope, element, attrs, $location) {
        var htmltext;
        if (attrs.htmltext) {
            htmltext = (attrs.plaintext == "true" ? true : false);
        } else {
            htmltext = false;
        }
        scope.$watch(attrs.collapsible, function (value, attrs) {
            var originHtml = value;
            var showMoreBtn = element.next().find('div.btn')[0];
            var text = "";
            if (htmltext) {
                text = $(value).text();
            } else {
                text = value;
            }
            text = text.replace('<p>', '').replace('</p>', '');
            var toggleText = $(showMoreBtn).attr('toggle-text');
            originHtml = originHtml.replace('<p>', '').replace('</p>', '');
            var btnText = $(showMoreBtn).text();
            if (originHtml) {
                originHtml = originHtml.replace('<p>', '').replace('</p>', '');
                $(showMoreBtn).click(function (e) {
                    toggleText = $(showMoreBtn).attr('toggle-text');
                    btnText = $(showMoreBtn).text();
                    if (element.attr('toggle-state') == "closed") {
                        element.css({
                            'height': '100%',
                            'max-height': '100%',
                            'overflow': 'auto'
                        });
                        element.find('p').html(originHtml);
                        $(this).text("show less");
                        element.attr('toggle-state', 'opened');
                    } else {
                        element.css({
                            'max-height': 'auto',
                            'height': 'auto',
                        }, attrs);
                        if (text) {
                            element.find('p').html(text.substr(0, 160) + '...');

                            $(this).text("show more");
                            
                            $(this).attr('toggle-text', btnText);
                        }
                        element.attr('toggle-state', 'closed');
                    }
                });
                if (element.attr('toggle-state') == 'closed') {
                    element.css({
                        'height': 'auto',
                        'max-height': 'auto',
                    }, attrs);
                    if (text) {
                        element.find('p').html(text.substr(0, 160) + '...');
                        $(this).text("show more");
                    }
                } else {
                    element.css({
                        'height': '100%',
                        'max-height': '100%',
                    });
                    element.find('p').html(originHtml);
                    $(this).text("show less");
                    element.attr('toggle-state', 'opened');
                }
            }

        });
    }
}

function apiImg() {
    console.log("INFO FROM DIRECTIVE");
    return function (scope, element, attrs) {
        console.info(arguments);
    };
};
(function () {
    'use strict';
     
    angular.module('FC.Calendar', []);

})();
angular
    .module('FC')
    .factory('CalendarService', CalendarService);

CalendarService.$inject = ['$http','$q'];

function CalendarService($http,$q) {
    vm = this;
    var client = FCClient.GetInstance();
    
    return {
        //SearchResult: [],
        //FestivalYears: [],
        SearchFestivals: SearchFestivals,
        GetFestivalYears: GetFestivalYears,
        GetMonthsByCulture: GetMonthsByCulture,
        GetWeeks: GetWeeks,
        GetCurrentWeek: GetCurrentWeek,
        GetCurrentWeekNum: GetCurrentWeekNum,
        GetActiveDateByWeekNum: GetActiveDateByWeekNum,
        GetFestivalsByMonthAndYear: GetFestivalsByMonthAndYear
    };
    function GetActiveDateByWeekNum(weekNum, routeYear) {
        if (routeYear) {
            return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Calendar/GetActiveDateByWeekNumAndYear?weekNum=' + weekNum + '&year=' + routeYear,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);
        } else {
            return $http(
                {
                    url: client.BaseURL + '/Umbraco/API/Calendar/GetActiveDateByWeekNum?weekNum=' + weekNum,
                    method: 'GET',
                    headers: {
                        'Culture': client.UserCulture,
                        'UserDateTime': client.UserDateTime.getTime(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' 
                    }
                })
                .then(FilteredResult)
                .catch(FailureResult);
        }
        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetActiveDateByWeekNum");
        }
    }
    function GetCurrentWeek(date) {
        var d = client.UserDateTime.getTime();
        if (date != null) {
            d = date;
        }
        return $http(
            {
                url: client.BaseURL +'/Umbraco/API/Calendar/GetCurrentWeek?dateTime=' + d,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetCurrentWeek");
        }
    }
    function GetCurrentWeekNum(date) {
        var d = client.UserDateTime.getTime();
        if (date != null) {
            d = date;
        }
        return $http(
            {
                url: client.BaseURL +'/Umbraco/API/Calendar/GetCurrentWeekNum?dateTime=' + d,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetCurrentWeekNum");
        }
    }

    function GetWeeks(date) {
        var d = client.UserDateTime.getTime();
        if (date!=null) {
            d = date;
        }
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Calendar/GetWeeks?dateTime=' + d,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetWeeks");
        }
    }
    function GetMonthsByCulture(culture) {
        var c = client.UserCulture;
        if (culture) {
            c = culture;
        }
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Calendar/GetMonths',
                method: 'GET',
                headers: {
                    'Culture': c,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetMonthsByCulture");
        }
    }
    function GetFestivalYears(date) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetYears?&date=' + date,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.toLocaleString(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetFestivalYears");
        }
    }
    function GetFestivalsByWeekAndYear(week, year) {
        return $http(
        {
            url: client.BaseURL + '/Umbraco/API/Festival/Get?&week=' + week + '&year=' + year,
            method: 'GET',
            headers: {
                'Culture': client.UserCulture,
                'UserDateTime': client.UserDateTime.toLocaleString(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(FilteredResult)
        .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetFestivalsByWeekAndYear");
        }
    }
    function GetFestivalsByMonthAndYear(genre,month,year) {
        return $http(
        {
            url: client.BaseURL + '/Umbraco/API/Festival/GetByMonth?&genre='+genre+'&month=' + month + '&year=' + year,
            method: 'GET',
            headers: {
                'Culture': client.UserCulture,
                'UserDateTime': client.UserDateTime.getTime(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(FilteredResult)
        .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise CalendarService.GetFestivalsByMonthAndYear");
        }
    }
    function SearchFestivals(key) {
        if (key != null && key != "") {
            return $http(
                {
                    url: client.BaseURL + '/Umbraco/API/Festival/Search?&key=' + key,
                    method: 'GET',
                    headers: {
                        'Culture': client.UserCulture,
                        'UserDateTime': client.UserDateTime.getTime(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(FilteredResult)
                .catch(FailureResult);

            function FilteredResult(r) {
                return r.data;
            }
            function FailureResult() {
                console.error("Read error on promise CalendarService.SearchFestivals");
            }
        }
    }
}
(function () {
    'use strict';
    angular
        .module('FC.Calendar') 
        .controller('CalendarController', ['$routeParams','$routeParams', '$location','CalendarService','TilesService','FestivalService', CalendarController ]); 

    /* @ngInject */
    CalendarController.$inject = ['CalendarService','TilesService','FestivalService'];
    function CalendarController($route, $routeParams, $location, CalendarService, TilesService, FestivalService) {
        /*jshint validthis: true */

        var FCL = FCClient.GetInstance();
        var urlManager = URLManager.GetInstance();

        //injection
        //privates.
        this.$route = $route;
        this.$location = $location;
        this.$routeParams = $routeParams;
        var vm = this; 
        
        var currentYear = parseInt(FCL.UserDateTime.getFullYear().toString());
        var routeYear = this.$routeParams.year;
        var routeGenre = this.$routeParams.genre;
        var routeMonth = this.$routeParams.month;

        //{0} - genre
        //{1] - year
        //{2} - month (-1 is placeholder).
        //DateEntry
        urlManager.AddURL("calendar", "DateURL", "calendar/{1}/{2}/{0}");
        //DefaultEntry - Date is default client date.
        urlManager.AddURL("calendar", "DefaultURL", "calendar/{0}");
        //0 - festivalId
        //1 - genreIds
        urlManager.AddURL("calendar", "FestivalURL", "festival/{0}/{1}")

        /**
        * Properties
        */
        vm.BaseURL = FCL.BaseURL;
        //Specify which viewtype shall be active (weekView = default (true), monthView = false).
        vm.MonthViewActive = false;
        //Dropdown - YearCollection
        vm.YearCollection = [];

        //Show loading mask?
        vm.IsLoading = true;

        //Active month name (Setted by GetMonthsByCulture)
        vm.ActiveMonthName = "";

        //default logo height for the festival list items.
        vm.FestivalLogoHeight = 100;

        //The current date
        vm.ActiveDate = FCL.UserDateTime;

        //The first day of the first month of the previous year.
        vm.PrevYearDate = FCL.UserDateTime;

        //The first day of the first month of the next year.
        vm.NextYearDate = FCL.UserDateTime;

        //Default the active month client date time.
        vm.ActiveMonth = FCL.UserDateTime.getMonth();

        //Public array of festival years.
        vm.FestivalYears = [];

        //Public array of festival genres.
        vm.FestivalGenres = [];

        //Public array of specified genres by url.
        vm.RouteGenre = 0;
        vm.RouteMonth = new Date().getMonth() + 1;
        vm.RouteYear = new Date().getUTCFullYear();
        


        //The festivals in the active month
        vm.MonthFestivals = [];

        //Active year can be overwritten by route.
        vm.CurrentYear = currentYear;
        vm.NextYearValue = (parseInt(currentYear) + 1);
        vm.PrevYearValue = (parseInt(currentYear) - 1);
        vm.CurrentWeekDayCount = 0;
        /**
        * Methods
        */
        vm.IsActiveMonth = IsActiveMonth;
        vm.GetCurrentDay = GetCurrentDay;
        vm.DayIsActive = DayIsActive;
        vm.GetYearURL = GetYearURL;
        vm.GetMonthURL = GetMonthURL;
        vm.CurrentTheme = {};
        vm.BestDays = [];
        vm.LeastDays = [];
        vm.ActiveGenre = {};
        vm.FestivalOnDay = FestivalOnDay;
        vm.GetFestivalURL = GetFestivalURL;

        function FestivalOnDay(Festival, Day) {
            vm.FestivalDayVisible = true;
            var dayDate = new Date(Day.BaseDate);
            dayDate.setHours(1, 1, 1, 1);
            var festEndDate = new Date(Festival.EndDate);
            var festStartDate = new Date(Festival.StartDate);
            festStartDate.setHours(1, 1, 1, 1);
            festEndDate.setHours(1, 1, 1, 1);
            if (festStartDate.getTime() == dayDate.getTime()) {
                return true;
            } else {
                return false;
            }
        }
        function ShowDay(Festival) {
            var parseDate = new Date(Festival.StartDate);
            parseDate.setHours(0, 0, 0, 0, 0);
            var r = $('#Day_' + parseDate.getDate());
            r.removeClass('hidden');
        }
        function GetAllGenres() {
            TilesService.GetTiles().then(function (r) {
                vm.FestivalGenres = r;
                $.each(vm.FestivalGenres, function (key, genre) {
                    if (vm.RouteGenre == genre.UmbracoID.toString()) {
                        vm.ActiveGenre = genre;
                            
                    }
                });
            }).finally(function () {
                vm.IsLoading = false;
            });
        }
        /**
        * Initializer
        */
        function init() {
            //Enter by Weeknum (month and year, shall be overwrited).
            window.onresize = function() {
                SetFestivalLogoHeight();
            }
            _SetYears();
            vm.RouteGenre = $routeParams.genre;
            vm.RouteMonth = $routeParams.month;
            vm.RouteYear = $routeParams.year;

            GetAllGenres();
            if (vm.RouteMonth) {
                vm.ActiveMonth = vm.RouteMonth;
                GetMonthFestivals(vm.RouteGenre, vm.RouteMonth, vm.ActiveDate.getUTCFullYear());
            } else {
                GetMonthFestivals(vm.RouteGenre, vm.ActiveDate.getMonth() + 1, vm.ActiveDate.getUTCFullYear());

            }
            GetMonthsByCulture();
        }
        init();

        function GetMonthFestivals(genre, month, year) {
            CalendarService.GetFestivalsByMonthAndYear(genre, month, year).then(function (r) {
                vm.MonthFestivals = r;
                vm.IsLoading = false;
            }).finally(function () {
                vm.IsLoading = false;
            });
        }

        /**
        * Check if the day is active or not for a day in a week (not month see GetCurrentDay for checking days in a month).
        */
        function DayIsActive(day) {
            if (new Date(day).toLocaleDateString() == FCL.UserDateTime.toLocaleDateString()) {
                return true;
            } else {
                return false;
            }
        } 

        function GetFestivalURL(festival) {
            var retUrl = urlManager.GetURL("calendar", "FestivalURL", festival.UmbracoID, vm.RouteGenre);
            return retUrl;
        }

        /**
        * Get the URLs for the months dropdown.
        */
        function GetMonthURL(monthKey) {
            var genreIds = "";
            var routeYear = $routeParams.year;
            if (!IsNullOrEmpty(routeYear)) {
                vm.CurrentYear = routeYear;
            }
            //strip last comma/whitespace etc.
            var retUrl = urlManager.GetURL("calendar", "DateURL", vm.RouteGenre, vm.CurrentYear, monthKey+1);
            return retUrl;
        }

        /**
        * Get the URLs for the year dropdown.
        */
        function GetYearURL(year) {
            var genreIds = "";
            var routeGenre = $routeParams.genre;
            var routeMonth = $routeParams.month;
            if (routeMonth > -1) {
                vm.ActiveMonth = routeMonth;
            }
            var retUrl = urlManager.GetURL("calendar", "DateURL", routeGenre, year, vm.ActiveMonth,"-1");
            return retUrl;
        }
        /**
        * Get the months in a year based by the user culture, this also gets the activeMonth name
        */
        function GetMonthsByCulture() {
            CalendarService.GetMonthsByCulture().then(function (r) {
                vm.YearMonths = r;
                vm.ActiveMonthName = vm.YearMonths[vm.ActiveMonth];
                if (vm.ActiveMonth >= 1) {
                    vm.ActiveMonthName = vm.YearMonths[vm.ActiveMonth - 1];
                } else {
                    vm.ActiveMonthName = vm.YearMonths[0];
                }
            }).finally(function () {
                vm.IsLoading = false;
            });
        }
        
        /**
        * Set years for drop down collection
        */
        function _SetYears() {
            vm.YearCollection[0] = FCL.UserDateTime.getFullYear();
            vm.YearCollection[1] = FCL.UserDateTime.getFullYear() + 1;
        }

        /**
        * Get the the current date.
        */
        function GetCurrentDay() {
            var day = FCL.UserDateTime.getUTCDate();
            return day;
        }
        /**
        * Check of the month is active (0-11).
        */
        function IsActiveMonth(p_iMonth) {
            var month = 0;
            if (vm.ActiveMonth != -1) {
                month = vm.ActiveMonth;
            } else {
                month = FCL.UserDateTime.getMonth();
            }
            if (routeMonth>-1) {
                if (routeMonth >= 12) {
                    vm.CurrentYear++;
                    routeMonth = 0;
                    window.location = '/calendar/' + vm.GenreID + '/' + vm.NextYearValue + '/' + routeMonth;
                } else if (routeMonth < -1) {
                    vm.CurrentYear--;
                    routeMonth = 11;
                    window.location = '/calendar/' + vm.GenreID + '/' + vm.PrevYearValue + '/' + routeMonth;
                }
                month = routeMonth;
            }
            if (p_iMonth == month) {
                vm.ActiveMonth = month;
                return true;
            } else {
                return false;
            }
        }
        /**
        * Set the previous month active
        */
        function SetPrevMonth(index) {
            
            if (vm.ActiveMonth == 0) {
                vm.CurrentYear--;
                vm.ActiveMonth = 11;
            } else {
                vm.ActiveMonth--;
            }
        }
        /**
        * Set the next month active
        */
        function SetNextMonth(index) {
            if (vm.ActiveMonth == 11) {
                vm.CurrentYear++;
                vm.ActiveMonth = 0;
            } else {
                vm.ActiveMonth++;
            }
        }
        return vm;

        function SetFestivalLogoHeight() {
            if (FCClient.GetInstance().Client.ViewportWidth > 500) {
                vm.FestivalLogoHeight = 150;
            } else {
                vm.FestivalLogoHeight = 150;
            }
        }
    }
})(); 

(function () {
    'use strict';

    angular.module('FC.Festival', []);

})();
angular
    .module('FC')
    .factory('FestivalService', FestivalService);

FestivalService.$inject = ['$http', '$q'];

function FestivalService($http, $q) {
    vm = this;
    var client = FCClient.GetInstance();
    return {
        TilesResult: [],
        GetFestivalsByMonth: GetFestivalsByMonth,
        GetFestivalsByWeek: GetFestivalsByWeek,
        GetFestival: GetFestival

    };
    function GetFestival(id) {
        return $http(
        {
            url: client.BaseURL + '/Umbraco/API/Festival/GetById?&id=' +id,
            method: 'GET',
            headers: {
                'Culture': client.UserCulture,
                'UserDateTime': client.UserDateTime.getTime(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    .then(FilteredResult)
    .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise FestivalService.GetFestival");
        }
    }
    function GetFestivalsByWeek(week, year, genre) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetByWeek?&week=' + week + '&year=' + year + '&genre=' + genre,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise FestivalService.GetFestivalsByWeek");
        }
    }
    function GetFestivalsByMonth(month,year, genre) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetFestivalsByMonth?&month' + month + '&year=' + year + 'genre=' + genreId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise FestivalService.GetFestivalsByMonth");
        }
    }
}
(function () {
    'use strict';
    angular
        .module('FC.Festival')
        .controller('FestivalController', ['$routeParams', '$routeParams', '$location', '$sanitize', 'CalendarService', 'TilesService', 'FestivalService', 'MainService', 'RatesService','NewsService', FestivalController]);

    FestivalController.$inject = ['CalendarService', 'TilesService', 'FestivalService', 'MainService','RatesService','NewsService'];
    function FestivalController($route, $routeParams, $location, $sanitize, CalendarService, TilesService, FestivalService, MainService, RatesService,NewsService) {
        var vm = this;
        var FCL = FCClient.GetInstance();
        vm.init = init;
        vm.ActiveFestival = {};
        vm.ActiveFestivalId = $route.festivalId;
        vm.ActiveGenreIds = $route.genre;
        vm.ActiveGenre = {};
        vm.ActiveTheme = {};
        vm.IsLoading = true;
        vm.BaseURL = FCL.BaseURL;
        vm.HasTravelInfo = _HasTravelInfo;
        vm.ShowTravelInfo = false;

        vm.ArtistsLeft = [];
        vm.ArtistsRight = [];

        vm.News = [];

        function _HasTravelInfo(festival) {
            if (festival.TrainInfo != null && festival.TrainInfo != undefined && festival.TrainInfo.length > 0) {
                vm.ShowTravelInfo = true;
            }
            else if (festival.BikeInfo != null && festival.BikeInfo != undefined && festival.BikeInfo.length > 0) {
                vm.ShowTravelInfo = true;
            }
            else if (festival.BusInfo != null && festival.BusInfo != undefined && festival.BusInfo.length > 0) {
                vm.ShowTravelInfo = true;
            }
            else if (festival.TaxiInfo != null && festival.TaxiInfo != undefined && festival.TaxiInfo.length > 0) {
                vm.ShowTravelInfo = true;
            }
            else if (festival.AirPlaneInfo != null && festival.AirPlaneInfo != undefined && festival.AirPlaneInfo.length > 0) {
                vm.ShowTravelInfo = true;
            }
            else if (festival.Car != null && festival.AirPlaneInfo != undefined && festival.AirPlaneInfo.length > 0) {
                vm.ShowTravelInfo = true;
            }
            else {
                vm.ShowTravelInfo = false;
            }
        }
        function _SplitArtists(Artists) {
            var countLeft = 0;
            var countRight = 0;
            
            var count = 9;
            if (Artists.length - 1 < 9) {
                count = Artists.length - 1;
            }
            var i = 0;
            while (i <= count) {
                if (i % 2 != 0) {
                    vm.ArtistsRight[countRight] = Artists[i];
                    countRight++;
                } else {
                    vm.ArtistsLeft[countLeft] = Artists[i];
                    countLeft++;
                }
                i++;
            }
        }
        function init() {
            NewsService.GetNews(vm.ActiveGenreIds).then(function (r) {
                vm.News = r;
            });
            MainService.GetGenre(vm.ActiveGenreIds).then(function (g) {
                vm.ActiveGenre = g;
                FestivalService.GetFestival(vm.ActiveFestivalId).then(function (f) {
                    vm.ActiveFestival = f;
                    _SplitArtists(vm.ActiveFestival.Artists);
                    vm.IsLoading = false;
                    if (vm.ActiveFestival.DailyTicketPrice > 0) {
                        RatesService.EurToUc(vm.ActiveFestival.DailyTicketPrice, vm.ActiveFestival.Localization).then(function (result) {
                            vm.ActiveFestival.CalcDailyPrice = result;
                        });
                    }
                    if (vm.ActiveFestival.TicketPrice > 0) {
                        RatesService.EurToUc(vm.ActiveFestival.TicketPrice, vm.ActiveFestival.Localization).then(function (result) {
                            vm.ActiveFestival.CalcPrice = result;
                        });
                    }
                    vm.HasTravelInfo(f);
                    
                });
            });
            
        }
        vm.init();
    }
})();
(function () {
    'use strict';

    angular.module('FC.FlexSelect', []); 

})();   
(function () {
	'use strict';
	angular
        .module('FC.FlexSelect') 
        .controller('FlexSelectController', ['$routeParams', '$routeParams', '$location', '$window', 'CalendarService', 'TilesService', FlexSelectController]);

	/* @ngInject */
	FlexSelectController.$inject = ['CalendarService', 'TilesService'];
        //	<div class="list-group">
        //       <a href="#" class="list-group-item active">
        //         Cras justo odio
        //       </a>
        //      <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
        //      <a href="#" class="list-group-item">Morbi leo risus</a>
        //      <a href="#" class="list-group-item">Porta ac consectetur ac</a>
        //      <a href="#" class="list-group-item">Vestibulum at eros</a>
        //</div>

	function FlexSelectController($route, $routeParams, $location, $window, CalendarService, TilesService) {
	    var vm = this;
	    var FCL = FCClient.GetInstance();
	    vm.CurrentTheme = {};
	    vm.SelectedValueWrapper = '<div class="values">{{value}}</div>';
	    vm.SelectedValueTemplate = '<div class="value" style="{{style}}" data-value="{{datavalue}}">{{value}}<span class="icon glyphicon glyphicon-remove" style="{{iconColor}}" aria-hidden="true"></span></div>';
	    vm.OptionWrapperTemplate = '<div class="list-group options">{{options}}</div>';
	    vm.OptionTemplate = '<a class="list-group-item option {{oddeven}}" data-value="{{value}}">{{name}}</a>';
	    vm.Activate = Activate;
        vm.AllValuesText = 'All'
        vm.RouteGenres = [];
        vm.FSCOptionsClass = '.FlexSelectOptions';
        vm.FSCValueClass = '.FlexSelectValues';
        vm.SetOptions = _renderOptions;
	    //vm.Close =_ShowOptions;
        vm.FilterURL = "/calendar/";
	    if ($routeParams.genreid) {
	        vm.RouteGenres = $routeParams.genreid.split(',');
	    }
	    vm.ActivatedGenres = [];
	    var GeneratedHTML = "";
	    vm.SetFlexSelectOptions = SetFlexSelectOptions;
	    vm.Save = Save;
	    function Activate(option) {
	        $(option).toggleClass('active');
	        var value = $(option).attr('data-value');
	        if ($.inArray(value,vm.RouteGenres) == -1) {
	            var index = vm.ActivatedGenres.length;
	            vm.ActivatedGenres[index] = value;
	        } else {
	            $(option).hide();
	        }
	    }
	    function Cancel() {
	    }
	    function Save() {
	        var url = 'calendar/{{genre}}';
	        var newUrl = "";
	        var routeGenre = $routeParams.genreid;
	        var routeYear = $routeParams.year;
	        var routeMonth = $routeParams.month;
	        var routeWeek = $routeParams.week;
	        $.each(vm.RouteGenres, function (key, value) {
	            newUrl += value + ",";
	        })
	        $.each(vm.ActivatedGenres, function (key, value) {
	            newUrl += value + ",";
	        });
	        newUrl = newUrl.replace(/,\s*$/, "");
	        vm.FilterURL = url.replace("{{genre}}", newUrl);
	        if (routeYear && routeMonth && routeWeek) {
	            vm.FilterURL += '/' + routeYear + '/' + routeMonth + '/' + routeWeek;
	        } else if (routeYear && routeMonth) {
	            vm.FilterURL += '/' + routeYear + '/' + routeMonth + '/';
	        }
	        $window.location.href=vm.FilterURL;
	    }
	    function _renderSelectedValues(values) {
	        debugger;
	        var selectedValues = '';
	        $.each(vm.RouteGenres, function (key, value) {
	            if (values[value]) {
	                var data = Cache.Get(CacheMode.LocalStorage, "CurrentTheme");
	                var theme = data.data;
	                if (theme) {
	                    var iconColor = "";// "color:#" + theme.ButtonTextColor;
	                    var style = "";//"border-color: #"+theme.ThemeColor+";background-color: #" + theme.ThemeColor + ';color:#' + theme.ButtonTextColor + ';';
	                    selectedValues += vm.SelectedValueTemplate.replace("{{style}}", style).replace("{{value}}", values[value]).replace("{{datavalue}}", value).replace("{{iconColor}}", iconColor);
	                }

	            } 
	        });
	        $('.FlexSelectedValue').html();
	        $('.FlexSelectedValue').append(vm.SelectedValueWrapper.replace('{{value}}', selectedValues));
	        $('.value[data-value]').click(function () {
	            var value = $(this).attr('data-value');
	            DeleteSelectedValue(value);
	        });
	    }
	    function DeleteSelectedValue(value) {
	        var indexRg = vm.RouteGenres.indexOf(value);
	        var indexActive = vm.ActivatedGenres.indexOf(value);
	        vm.ActivatedGenres[indexActive] = null;
	        vm.RouteGenres[indexRg] = null;
	        var url = 'calendar/{{genre}}';
	        var newUrl = "";
	        var routeGenre = $routeParams.genreid;
	        var routeYear = $routeParams.year;
	        var routeMonth = $routeParams.month;
	        var routeWeek = $routeParams.week;
	        $.each(vm.RouteGenres, function (key, value) {
	            if (value != null) {
	                newUrl += value + ",";
	            }
	        })
	        $.each(vm.ActivatedGenres, function (key, value) {
	            if (value != null) {
	                newUrl += value + ",";
	            }
	        });
	        newUrl = newUrl.replace(/,\s*$/, "");
	        vm.FilterURL = url.replace("{{genre}}", newUrl);
	        if (routeYear && routeMonth && routeWeek) {
	            vm.FilterURL += '/' + routeYear + '/' + routeMonth + '/' + routeWeek;
	        } else if (routeYear && routeMonth) {
	            vm.FilterURL += '/' + routeYear + '/' + routeMonth + '/';
	        }
	        $window.location.href = vm.FilterURL;
            
	    }
	    function _renderOptions(data, type) {
	        if (type.toLowerCase() == 'genres') {
	            _renderGenreOptions(data);
	        }
	        $('a.list-group-item').click(function () {
	            vm.Activate(this);
	        });
	        $("#save").click(function () {
	            vm.Save();
	        });
	    }

	    function _renderGenreOptions(data) {

	        var routeGenre = $routeParams.genreid;
	        var routeYear = $routeParams.year;
	        var routeMonth = $routeParams.month;
	        var url = 'calendar/{{genre}}';
	        if (routeYear && routeMonth) {
	            url += '/' + routeYear + '/' + routeMonth;
	        }
	        var newUrl = "";
	        var to = $('.FlexSelectOptions');
	        if (data) {
	            var options = '';
	            var newUrl = '';
	            /**
                * looks like a bit of buggy code...
                */
	            if (routeGenre) { 
	                newUrl += url.replace("{{genre}}", routeGenre + ",{{n}}");
	            }
	            var index = 1;
	            var oddEven = "odd";
	            $.each(data, function (value, name) {
	                if ($.inArray(value, vm.RouteGenres) == -1) {
	                    if (index % 2 == 0) {
	                        options += vm.OptionTemplate.replace('{{value}}', value).replace('{{name}}', name).replace('{{oddeven}}', 'even');
	                    } else {
	                        options += vm.OptionTemplate.replace('{{value}}', value).replace('{{name}}', name).replace('{{oddeven}}', 'odd');
	                    }
	                }
	                index++;
	            });
	            GeneratedHTML = vm.OptionWrapperTemplate.replace('{{options}}', options);
	            if (to) {
	                to.html(GeneratedHTML);
	            }
	        }
	    }
	    function SetFlexSelectOptions(type) {
	        var options = '';
	        var data = null;
	        if (type) {
	            if (type.toLowerCase() == 'genres') {
	                TilesService.GetFlexSelectOptions().then(function (r) {
	                    _renderOptions(r, type);
	                    _renderSelectedValues(r);
	                });
	            }
	        }
	    }
	}
})();   

(function () {
    'use strict';

    angular.module('FC.Main', []);

})(); 
(function () {
    'use strict';
    angular
        .module('FC.Main')
        .controller('MainController', MainController);

    MainController.$inject = ['CalendarService']; 
    /* @ngInject */
    function MainController(CalendarService) { 
        /*jshint validthis: true */  
        var vm = this;
        var FCL = FCClient.GetInstance();
        vm.c = CalendarService; 
        vm.APIBaseURL = FCL.BaseURL;
        vm.ClientScreenWidth = FCL.Client.ScreenWidth;
        vm.ClientScreenHeight = FCL.Client.ScreenHeight;
        //properties
        vm.FestivalHints = [];
        vm.HintsVisible = false;
        vm.SearchKey = "Artist, genre, year, festival name";
        vm.ToggleOverlay = ToggleOverlay;
        vm.ModalComponents = [];
        vm.ActiveComponents = [];
        vm.HiddenComponents = [];
        vm.VisibleComponents = [];
        vm.DefaultBackground = "";
        vm.screen = screen;
        //methods
        vm.filter = filter;
        //vm.showMenu = showMenu;
        vm.resetSearchKey = resetSearchKey;
        function init() {
        }
        init(); 
        function resetSearchKey() {
            if(vm.SearchKey == "Artiest, genre, jaar, naam festival" ) {
                vm.SearchKey = "";
            }
        }

        function filter() {
            if (vm.SearchKey != null && vm.SearchKey != "") {
                vm.c.SearchFestivals(this.SearchKey).then(function (responseData) {
                    vm.FestivalHints = responseData;
                    if (vm.FestivalHints.length > 0) {
                        vm.HintsVisible = true;
                    }
                });
            }
        }
        //{VisibleClass: 'FC-visible', HiddenClass: 'FC-hidden', Selector: '#GenreSelectControl > .FlexSelectOptions'})"
        function ToggleOverlay(component, toggleToolbar) {
            var ToggleToolbar = true;
            if (toggleToolbar == false) {
                ToggleToolbar = false;
            }
            var VisibleClass = '';
            var HiddenClass = '';
            var Selector = null;
            vm.ModalComponents = $('[data-modal="true"]');
            vm.HiddenComponents = $('[data-modal-hidden="true"]');
            vm.VisibleComponents = $('[data-modal-hidden="false"]');

            var Overlay = $("#overlay");
            var OverlayToolbar = $('#overlay-toolbar');
            if (component && component.VisibleClass && component.HiddenClass && component.Selector) {

                //show component
                VisibleClass = component.VisibleClass;
                HiddenClass = component.HiddenClass;
                Selector = $(component.Selector);
                if (Selector) {
                    if (Selector.hasClass(VisibleClass)) {
                        Selector.removeClass(VisibleClass);
                        Selector.addClass(HiddenClass);
                        Selector.attr('data-modal-hidden', 'true');
                        if (Overlay.hasClass('maxHeight')) {
                            Overlay.removeClass('maxHeight');
                            Overlay.addClass('minHeight');
                            if (ToggleToolbar == true) {
                                OverlayToolbar.removeClass('maxHeight');
                                OverlayToolbar.addClass('minHeight');
                            }
                            return;
                        };
                    } else {
                        Selector.attr('data-modal-hidden', 'false');
                        Selector.addClass(VisibleClass);
                        Selector.removeClass(HiddenClass);
                    }
                    if (Overlay.hasClass('minHeight')) {
                        if (ToggleToolbar == true) {
                            OverlayToolbar.addClass('maxHeight');
                            OverlayToolbar.removeClass('minHeight');
                        }
                        Overlay.addClass('maxHeight');
                        Overlay.removeClass('minHeight');
                    };
                    if ($.inArray(component, vm.ActiveComponents) == -1) {
                        var index = vm.ActiveComponents.length;
                        vm.ActiveComponents[index] = component;
                    }
                } else {
                    if (vm.ActiveComponents.length > 0) {
                        $.each(vm.ActiveComponents, function (k, comp) {
                            Selector = $(comp.Selector);
                            if (Selector) {
                                if (Selector.attr('data-modal-hidden') == 'false') {
                                    Selector.addClass(comp.HiddenClass);
                                    Selector.removeClass(comp.VisibleClass);
                                    Selector.attr('data-modal-hidden', 'true');
                                }
                            }
                        });
                    }
                    if (Overlay.hasClass('maxHeight')) {
                        Overlay.removeClass('maxHeight');
                        Overlay.addClass('minHeight');
                        if (ToggleToolbar == true) {
                            OverlayToolbar.removeClass('maxHeight');
                            OverlayToolbar.addClass('minHeight');
                        }
                    };
                }
            }
        } 
        function _hideComponent(component) {

        }
        function _showComponent(component) {

        }
    }
})();  
angular
    .module('FC')
    .factory('MainService', MainService);

MainService.$inject = ['$http', '$q'];

function MainService($http, $q) {
    
    vm = this;
    var client = FCClient.GetInstance();
    return {
        TilesResult: [],
        GetTiles: GetTiles,
        GetFlexSelectOptions: GetFlexSelectOptions,
        GetGenre: GetGenre
    };
    function GetActiveTheme(genreId) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetTheme/' + genreId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise MainService.GetActiveTheme");
        }
    }
    function GetGenre(genreId) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetGenre/' + genreId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise MainService.GetGenre");
        }
    }
    function GetFlexSelectOptions(genreId) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Themes/GetThemeByGenre' + genreId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise MainService.GetFlexSelectOptions");
        }
    }
    function GetTiles() {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetTiles',
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise MainService.GetTiles");
        }
    }
}
(function () {
    'use strict';     
    angular.module('FC.News', []);
})();
angular
    .module('FC')
    .factory('NewsService', NewsService);

NewsService.$inject = ['$http', '$q', '$location'];

function NewsService($http, $q, $location) { 
    vm = this;
    var client = FCClient.GetInstance();
    return {
        GetNews: GetNews
    };

    function GetNews(genreId) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/News/GetNews/?&genreId=' + genreId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult(r) {
            console.error("Read error on promise NewsService.GetNews(genreid)");
        }
    };
}

(function () {
    'use strict';

    angular.module('FC.Reel', []);

})();
angular
    .module('FC')
    .factory('ReelService', ReelService);

ReelService.$inject = ['$http', '$q'];

function ReelService($http, $q) {
    vm = this;
    var client = FCClient.GetInstance();
    debugger;

    return {
        //SearchResult: [],
        //FestivalYears: [],
    };
    function GetActiveDateByWeekNum(weekNum, routeYear) {
        if (routeYear) {
            return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Calendar/GetActiveDateByWeekNumAndYear?weekNum=' + weekNum + '&year=' + routeYear,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.toLocaleString(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult) 
            .catch(FailureResult);
        } else {
            return $http(
                {
                    url: client.BaseURL + '/Umbraco/API/Calendar/GetActiveDateByWeekNum?weekNum=' + weekNum,
                    method: 'GET',
                    headers: {
                        'Culture': client.UserCulture,
                        'UserDateTime': client.UserDateTime.toLocaleString(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(FilteredResult)
                .catch(FailureResult);
        }
        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise ReelService.GetActiveDateByWeekNum");
        }
    }
}
(function () {
    'use strict';
    angular
        .module('FC.Reel')
        .controller('ReelController', ReelController);

    ReelController.$inject = ['ReelService'];
    /* @ngInject */
    function ReelController(ReelService) {
        /*jshint validthis: true */
        var vm = this;
        var FCL = FCClient.GetInstance();
        var ReelItems;
        var ActiveReelItem;
        var ReelItemCount;
        var ActiveIndex = 0;
        function init() {
            ReelItems = $('div.reel-item');
            ReelItemCount = ReelItems.length-1;
            ActiveReelItem = $('div.reel-item.active');
            animate();
        }
        function animate() {            
        }
        init();
    } 
})();
//http://api.fixer.io/latest?callback=?

angular
    .module('FC')
    .factory('RatesService', RatesService);

RatesService.$inject = ['$http', '$q'];
// Settings object that controls default parameters for library methods:


function RatesService($http, $q) {
    vm = this;
    vm.client = FCClient.GetInstance();
    vm.Euro = 0;
    vm.Localization = {};
    return {
        EurToUc: EurToUc
    };
    function EurToUc(eur, localization) {
        vm.Euro = eur;
        if (localization == null) {
            throw new Error("Localization parameter is null");
        } else {
            vm.Localization = localization;
        }
        return $http(
            {
                url: 'http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK',
                method: 'JSONP',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            r.data.rates["EUR"] = 1;
            fx.rates = r.data.rates;
            accounting.settings = {
	            currency: {
	                symbol: vm.Localization.CultureMoneySign,   // default currency symbol is '$'
	                format: {
	                    pos: '<span class="money"><span class="format">%s</span><span class="money-value">%v</span></span>',   // for positive values, eg. "$ 1.00" (required)
	                    neg: '<span class="money"><span class="format">%s</span><span class="money-value">(%v)</span></span>', // for negative values, eg. "$ (1.00)" [optional]
	                    zero: '<span class="money"><span class="format">%s</span><span class="money-value">--</span></span>'  // for zero values, eg. "$  --" [optional]
	                },
	                decimal: vm.Localization.CultureCurrencySeparator,  // decimal point separator
		            thousand: ",",  // thousands separator
		            precision: vm.Localization.CurrencyCultureDecimalDigits   // decimal places
	            },
	            number: {
		            precision : vm.Localization.NumberDecimalDigits,  // default precision on numbers is 0
		            thousand: '.',
		            decimal : vm.Localization.NumberDecimalSeparator
	            }
            }
            var result = accounting.formatMoney(fx.convert(vm.Euro, { from: "EUR", to: vm.Localization.ISOCurrencySymbol }));
            return result
        }
        function FailureResult() {
            console.error("Error encountered when fetching rates from api.fixer.io");
        }
    }
}

(function () {
    'use strict';

    angular.module('FC.Theming', []);

})();
angular
    .module('FC')
    .factory('ThemingService', ThemingService);

MainService.$inject = ['$http', '$q', '$location'];

function ThemingService($http, $q,$location) {
    vm = this;
    var activeTheme = {};
    var client = FCClient.GetInstance();
    return {
        ActiveTheme: activeTheme,
        GetActiveTheme: GetActiveTheme,
        GetTheme: GetTheme
    };
    
    function GetTheme(themeId) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Theme/GetTheme/?&themeId=' + themeId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.toLocaleString(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise ThemeService.GetTheme(genreid)");
        }
    };

    function GetActiveTheme(genreId) {
        return $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetTheme/?&genreId=' + genreId,
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise ThemeService.GetActiveTheme(genreid)");
        }
    };
}

(function () {
    'use strict';

    angular.module('FC.Tiles', []);

})();
angular
    .module('FC')
    .factory('TilesService', TilesService);

TilesService.$inject = ['$http', '$q'];

function TilesService($http, $q) {
    vm = this;
    var client = FCClient.GetInstance();
    return {
        CurrentTheme: {},
        TilesResult: [],
        GetTiles: GetTiles,
        GetFlexSelectOptions: GetFlexSelectOptions
    };
    function SetCurrentTheme(t) {
        vm.CurrentTheme = t;
    }
    
    function GetFlexSelectOptions() {
        var req = $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetFlexSelectOptions?&type=genres',
                method: 'GET',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.toString(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);
        return req;

        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.error("Read error on promise TilesService.GetFlexSelectOptions");
        }
    }
    function GetTiles() {
        var req = $http(
            {
                url: client.BaseURL + '/Umbraco/API/Festival/GetTiles',
                method: 'POST',
                headers: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {
                    'Culture': client.UserCulture,
                    'UserDateTime': client.UserDateTime.getTime(),
                }
            })
            .then(FilteredResult)
            .catch(FailureResult);
        return req;
        function FilteredResult(r) {
            return r.data;
        }
        function FailureResult() {
            console.info(arguments);
            console.error("Read error on promise TilesService.GetTiles");
        }
    }
}
(function () {
    'use strict';
    angular
        .module('FC.Tiles')
        .controller('TilesController', TilesController);

    TilesController.$inject = ['$location','$route','TilesService'];

    /* @ngInject */

    function TilesController($location, $route,TilesService) {
        var vm = this;
        var FCL = FCClient.GetInstance();
        vm.CurrentURL = $location.absUrl();
        vm.Tiles = [];
        getTiles();
        vm.ClientScreenWidth = FCL.Client.ScreenWidth;
        vm.ClientScreenHeight = FCL.Client.ScreenHeight;
        function getTiles() {
            TilesService.GetTiles().then(function (r) {
                vm.Tiles = r;
            });
        }
    }
})();
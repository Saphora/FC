var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            var CurrencyBase = (function () {
                function CurrencyBase() {
                }
                CurrencyBase.ToArray = function () {
                    return ["AED",
                        "AFN",
                        "ALL",
                        "AMD",
                        "ANG",
                        "AOA",
                        "ARS",
                        "AUD",
                        "AWG",
                        "AZN",
                        "BAM",
                        "BBD",
                        "BDT",
                        "BGN",
                        "BHD",
                        "BIF",
                        "BMD",
                        "BND",
                        "BOB",
                        "BRL",
                        "BSD",
                        "BTN",
                        "BWP",
                        "BYN",
                        "BZD",
                        "CAD",
                        "CDF",
                        "CHF",
                        "CLP",
                        "CNY",
                        "COP",
                        "CRC",
                        "CUC",
                        "CUP",
                        "CVE",
                        "CZK",
                        "DJF",
                        "DKK",
                        "DOP",
                        "DZD",
                        "EGP",
                        "ERN",
                        "ETB",
                        "EUR",
                        "FJD",
                        "FKP",
                        "GBP",
                        "GEL",
                        "GGP",
                        "GHS",
                        "GIP",
                        "GMD",
                        "GNF",
                        "GTQ",
                        "GYD",
                        "HKD",
                        "HNL",
                        "HRK",
                        "HTG",
                        "HUF",
                        "IDR",
                        "ILS",
                        "IMP",
                        "INR",
                        "IQD",
                        "IRR",
                        "ISK",
                        "JEP",
                        "JMD",
                        "JOD",
                        "JPY",
                        "KES",
                        "KGS",
                        "KHR",
                        "KMF",
                        "KPW",
                        "KRW",
                        "KWD",
                        "KYD",
                        "KZT",
                        "LAK",
                        "LBP",
                        "LKR",
                        "LRD",
                        "LSL",
                        "LYD",
                        "MAD",
                        "MDL",
                        "MGA",
                        "MKD",
                        "MMK",
                        "MNT",
                        "MOP",
                        "MRO",
                        "MUR",
                        "MVR",
                        "MWK",
                        "MXN",
                        "MYR",
                        "MZN",
                        "NAD",
                        "NGN",
                        "NIO",
                        "NOK",
                        "NPR",
                        "NZD",
                        "OMR",
                        "PAB",
                        "PEN",
                        "PGK",
                        "PHP",
                        "PKR",
                        "PLN",
                        "PYG",
                        "QAR",
                        "RON",
                        "RSD",
                        "RUB",
                        "RWF",
                        "SAR",
                        "SBD",
                        "SCR",
                        "SDG",
                        "SEK",
                        "SGD",
                        "SHP",
                        "SLL",
                        "SOS",
                        "SPL",
                        "SRD",
                        "STD",
                        "SVC",
                        "SYP",
                        "SZL",
                        "THB",
                        "TJS",
                        "TMT",
                        "TND",
                        "TOP",
                        "TRY",
                        "TTD",
                        "TVD",
                        "TWD",
                        "TZS",
                        "UAH",
                        "UGX",
                        "USD",
                        "UYU",
                        "UZS",
                        "VEF",
                        "VND",
                        "VUV",
                        "WST",
                        "XAF",
                        "XCD",
                        "XDR",
                        "XOF",
                        "XPF",
                        "YER",
                        "ZAR",
                        "ZMW",
                        "ZWD"
                    ];
                };
                CurrencyBase.AED = "AED"; /* United Arab Emirates Dirham*/
                CurrencyBase.AFN = "AFN"; /* Afghanistan Afghani*/
                CurrencyBase.ALL = "ALL"; /* Albania Lek*/
                CurrencyBase.AMD = "AMD"; /* Armenia Dram*/
                CurrencyBase.ANG = "ANG"; /* Netherlands Antilles Guilder*/
                CurrencyBase.AOA = "AOA"; /* Angola Kwanza*/
                CurrencyBase.ARS = "ARS"; /* Argentina Peso*/
                CurrencyBase.AUD = "AUD"; /* Australia Dollar*/
                CurrencyBase.AWG = "AWG"; /* Aruba Guilder*/
                CurrencyBase.AZN = "AZN"; /* Azerbaijan New Manat*/
                CurrencyBase.BAM = "BAM"; /* Bosnia and Herzegovina Convertible Marka*/
                CurrencyBase.BBD = "BBD"; /* Barbados Dollar*/
                CurrencyBase.BDT = "BDT"; /* Bangladesh Taka*/
                CurrencyBase.BGN = "BGN"; /* Bulgaria Lev*/
                CurrencyBase.BHD = "BHD"; /* Bahrain Dinar*/
                CurrencyBase.BIF = "BIF"; /* Burundi Franc*/
                CurrencyBase.BMD = "BMD"; /* Bermuda Dollar*/
                CurrencyBase.BND = "BND"; /* Brunei Darussalam Dollar*/
                CurrencyBase.BOB = "BOB"; /* Bolivia Bolíviano*/
                CurrencyBase.BRL = "BRL"; /* Brazil Real*/
                CurrencyBase.BSD = "BSD"; /* Bahamas Dollar*/
                CurrencyBase.BTN = "BTN"; /* Bhutan Ngultrum*/
                CurrencyBase.BWP = "BWP"; /* Botswana Pula*/
                CurrencyBase.BYN = "BYN"; /* Belarus Ruble*/
                CurrencyBase.BZD = "BZD"; /* Belize Dollar*/
                CurrencyBase.CAD = "CAD"; /* Canada Dollar*/
                CurrencyBase.CDF = "CDF"; /* Congo/Kinshasa Franc*/
                CurrencyBase.CHF = "CHF"; /* Switzerland Franc*/
                CurrencyBase.CLP = "CLP"; /* Chile Peso*/
                CurrencyBase.CNY = "CNY"; /* China Yuan Renminbi*/
                CurrencyBase.COP = "COP"; /* Colombia Peso*/
                CurrencyBase.CRC = "CRC"; /* Costa Rica Colon*/
                CurrencyBase.CUC = "CUC"; /* Cuba Convertible Peso*/
                CurrencyBase.CUP = "CUP"; /* Cuba Peso*/
                CurrencyBase.CVE = "CVE"; /* Cape Verde Escudo*/
                CurrencyBase.CZK = "CZK"; /* Czech Republic Koruna*/
                CurrencyBase.DJF = "DJF"; /* Djibouti Franc*/
                CurrencyBase.DKK = "DKK"; /* Denmark Krone*/
                CurrencyBase.DOP = "DOP"; /* Dominican Republic Peso*/
                CurrencyBase.DZD = "DZD"; /* Algeria Dinar*/
                CurrencyBase.EGP = "EGP"; /* Egypt Pound*/
                CurrencyBase.ERN = "ERN"; /* Eritrea Nakfa*/
                CurrencyBase.ETB = "ETB"; /* Ethiopia Birr*/
                CurrencyBase.EUR = "EUR"; /* Euro Member Countries*/
                CurrencyBase.FJD = "FJD"; /* Fiji Dollar*/
                CurrencyBase.FKP = "FKP"; /* Falkland Islands (Malvinas) Pound*/
                CurrencyBase.GBP = "GBP"; /* United Kingdom Pound*/
                CurrencyBase.GEL = "GEL"; /* Georgia Lari*/
                CurrencyBase.GGP = "GGP"; /* Guernsey Pound*/
                CurrencyBase.GHS = "GHS"; /* Ghana Cedi*/
                CurrencyBase.GIP = "GIP"; /* Gibraltar Pound*/
                CurrencyBase.GMD = "GMD"; /* Gambia Dalasi*/
                CurrencyBase.GNF = "GNF"; /* Guinea Franc*/
                CurrencyBase.GTQ = "GTQ"; /* Guatemala Quetzal*/
                CurrencyBase.GYD = "GYD"; /* Guyana Dollar*/
                CurrencyBase.HKD = "HKD"; /* Hong Kong Dollar*/
                CurrencyBase.HNL = "HNL"; /* Honduras Lempira*/
                CurrencyBase.HRK = "HRK"; /* Croatia Kuna*/
                CurrencyBase.HTG = "HTG"; /* Haiti Gourde*/
                CurrencyBase.HUF = "HUF"; /* Hungary Forint*/
                CurrencyBase.IDR = "IDR"; /* Indonesia Rupiah*/
                CurrencyBase.ILS = "ILS"; /* Israel Shekel*/
                CurrencyBase.IMP = "IMP"; /* Isle of Man Pound*/
                CurrencyBase.INR = "INR"; /* India Rupee*/
                CurrencyBase.IQD = "IQD"; /* Iraq Dinar*/
                CurrencyBase.IRR = "IRR"; /* Iran Rial*/
                CurrencyBase.ISK = "ISK"; /* Iceland Krona*/
                CurrencyBase.JEP = "JEP"; /* Jersey Pound*/
                CurrencyBase.JMD = "JMD"; /* Jamaica Dollar*/
                CurrencyBase.JOD = "JOD"; /* Jordan Dinar*/
                CurrencyBase.JPY = "JPY"; /* Japan Yen*/
                CurrencyBase.KES = "KES"; /* Kenya Shilling*/
                CurrencyBase.KGS = "KGS"; /* Kyrgyzstan Som*/
                CurrencyBase.KHR = "KHR"; /* Cambodia Riel*/
                CurrencyBase.KMF = "KMF"; /* Comoros Franc*/
                CurrencyBase.KPW = "KPW"; /* Korea (North) Won*/
                CurrencyBase.KRW = "KRW"; /* Korea (South) Won*/
                CurrencyBase.KWD = "KWD"; /* Kuwait Dinar*/
                CurrencyBase.KYD = "KYD"; /* Cayman Islands Dollar*/
                CurrencyBase.KZT = "KZT"; /* Kazakhstan Tenge*/
                CurrencyBase.LAK = "LAK"; /* Laos Kip*/
                CurrencyBase.LBP = "LBP"; /* Lebanon Pound*/
                CurrencyBase.LKR = "LKR"; /* Sri Lanka Rupee*/
                CurrencyBase.LRD = "LRD"; /* Liberia Dollar*/
                CurrencyBase.LSL = "LSL"; /* Lesotho Loti*/
                CurrencyBase.LYD = "LYD"; /* Libya Dinar*/
                CurrencyBase.MAD = "MAD"; /* Morocco Dirham*/
                CurrencyBase.MDL = "MDL"; /* Moldova Leu*/
                CurrencyBase.MGA = "MGA"; /* Madagascar Ariary*/
                CurrencyBase.MKD = "MKD"; /* Macedonia Denar*/
                CurrencyBase.MMK = "MMK"; /* Myanmar (Burma) Kyat*/
                CurrencyBase.MNT = "MNT"; /* Mongolia Tughrik*/
                CurrencyBase.MOP = "MOP"; /* Macau Pataca*/
                CurrencyBase.MRO = "MRO"; /* Mauritania Ouguiya*/
                CurrencyBase.MUR = "MUR"; /* Mauritius Rupee*/
                CurrencyBase.MVR = "MVR"; /* Maldives (Maldive Islands) Rufiyaa*/
                CurrencyBase.MWK = "MWK"; /* Malawi Kwacha*/
                CurrencyBase.MXN = "MXN"; /* Mexico Peso*/
                CurrencyBase.MYR = "MYR"; /* Malaysia Ringgit*/
                CurrencyBase.MZN = "MZN"; /* Mozambique Metical*/
                CurrencyBase.NAD = "NAD"; /* Namibia Dollar*/
                CurrencyBase.NGN = "NGN"; /* Nigeria Naira*/
                CurrencyBase.NIO = "NIO"; /* Nicaragua Cordoba*/
                CurrencyBase.NOK = "NOK"; /* Norway Krone*/
                CurrencyBase.NPR = "NPR"; /* Nepal Rupee*/
                CurrencyBase.NZD = "NZD"; /* New Zealand Dollar*/
                CurrencyBase.OMR = "OMR"; /* Oman Rial*/
                CurrencyBase.PAB = "PAB"; /* Panama Balboa*/
                CurrencyBase.PEN = "PEN"; /* Peru Sol*/
                CurrencyBase.PGK = "PGK"; /* Papua New Guinea Kina*/
                CurrencyBase.PHP = "PHP"; /* Philippines Peso*/
                CurrencyBase.PKR = "PKR"; /* Pakistan Rupee*/
                CurrencyBase.PLN = "PLN"; /* Poland Zloty*/
                CurrencyBase.PYG = "PYG"; /* Paraguay Guarani*/
                CurrencyBase.QAR = "QAR"; /* Qatar Riyal*/
                CurrencyBase.RON = "RON"; /* Romania New Leu*/
                CurrencyBase.RSD = "RSD"; /* Serbia Dinar*/
                CurrencyBase.RUB = "RUB"; /* Russia Ruble*/
                CurrencyBase.RWF = "RWF"; /* Rwanda Franc*/
                CurrencyBase.SAR = "SAR"; /* Saudi Arabia Riyal*/
                CurrencyBase.SBD = "SBD"; /* Solomon Islands Dollar*/
                CurrencyBase.SCR = "SCR"; /* Seychelles Rupee*/
                CurrencyBase.SDG = "SDG"; /* Sudan Pound*/
                CurrencyBase.SEK = "SEK"; /* Sweden Krona*/
                CurrencyBase.SGD = "SGD"; /* Singapore Dollar*/
                CurrencyBase.SHP = "SHP"; /* Saint Helena Pound*/
                CurrencyBase.SLL = "SLL"; /* Sierra Leone Leone*/
                CurrencyBase.SOS = "SOS"; /* Somalia Shilling*/
                CurrencyBase.SPL = "SPL"; /**	Seborga Luigino*/
                CurrencyBase.SRD = "SRD"; /* Suriname Dollar*/
                CurrencyBase.STD = "STD"; /* São Tomé and Príncipe Dobra*/
                CurrencyBase.SVC = "SVC"; /* El Salvador Colon*/
                CurrencyBase.SYP = "SYP"; /* Syria Pound*/
                CurrencyBase.SZL = "SZL"; /* Swaziland Lilangeni*/
                CurrencyBase.THB = "THB"; /* Thailand Baht*/
                CurrencyBase.TJS = "TJS"; /* Tajikistan Somoni*/
                CurrencyBase.TMT = "TMT"; /* Turkmenistan Manat*/
                CurrencyBase.TND = "TND"; /* Tunisia Dinar*/
                CurrencyBase.TOP = "TOP"; /* Tonga Pa'anga*/
                CurrencyBase.TRY = "TRY"; /* Turkey Lira*/
                CurrencyBase.TTD = "TTD"; /* Trinidad and Tobago Dollar*/
                CurrencyBase.TVD = "TVD"; /* Tuvalu Dollar*/
                CurrencyBase.TWD = "TWD"; /* Taiwan New Dollar*/
                CurrencyBase.TZS = "TZS"; /* Tanzania Shilling*/
                CurrencyBase.UAH = "UAH"; /* Ukraine Hryvnia*/
                CurrencyBase.UGX = "UGX"; /* Uganda Shilling*/
                CurrencyBase.USD = "USD"; /* United States Dollar*/
                CurrencyBase.UYU = "UYU"; /* Uruguay Peso*/
                CurrencyBase.UZS = "UZS"; /* Uzbekistan Som*/
                CurrencyBase.VEF = "VEF"; /* Venezuela Bolivar*/
                CurrencyBase.VND = "VND"; /* Viet Nam Dong*/
                CurrencyBase.VUV = "VUV"; /* Vanuatu Vatu*/
                CurrencyBase.WST = "WST"; /* Samoa Tala*/
                CurrencyBase.XAF = "XAF"; /* Communauté Financière Africaine (BEAC) CFA Franc BEAC*/
                CurrencyBase.XCD = "XCD"; /* East Caribbean Dollar*/
                CurrencyBase.XDR = "XDR"; /* International Monetary Fund (IMF) Special Drawing Rights*/
                CurrencyBase.XOF = "XOF"; /* Communauté Financière Africaine (BCEAO) Franc*/
                CurrencyBase.XPF = "XPF"; /* Comptoirs Français du Pacifique (CFP) Franc*/
                CurrencyBase.YER = "YER"; /* Yemen Rial*/
                CurrencyBase.ZAR = "ZAR"; /* South Africa Rand*/
                CurrencyBase.ZMW = "ZMW"; /* Zambia Kwacha*/
                CurrencyBase.ZWD = "ZWD"; /* Zimbabwe Dollar*/
                return CurrencyBase;
            }());
            Enum.CurrencyBase = CurrencyBase;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=CurrencyBase.js.map
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.MSDAL;


namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedCountries : SeedBase
    {
        #region country dictionary
        public Dictionary<string, string> CDictionary = new Dictionary<string, string>();

        public SeedCountries(string SeedVersion, ContentModel db) : base(SeedVersion, db)
        {

        }

        public void InitCountryDict()
        {
            CDictionary["af-ZA"] = "South Africa";
            CDictionary["sq-AL"] = "Albania";
            CDictionary["ar-DZ"] = "Algeria";
            CDictionary["ar-BH"] = "Bahrain";
            CDictionary["ar-EG"] = "Egypt";
            CDictionary["ar-IQ"] = "Iraq";
            CDictionary["ar-JO"] = "Jordan";
            CDictionary["ar-KW"] = "Kuwait";
            CDictionary["ar-LB"] = "Lebanon";
            CDictionary["ar-LY"] = "Libya";
            CDictionary["ar-MA"] = "Morocco";
            CDictionary["ar-OM"] = "Oman";
            CDictionary["ar-QA"] = "Qatar";
            CDictionary["ar-SA"] = "Saudi Arabia";
            CDictionary["ar-SY"] = "Syria";
            CDictionary["ar-TN"] = "Tunisia";
            CDictionary["ar-AE"] = "United Arab Emirates";
            CDictionary["ar-YE"] = "Yemen";
            CDictionary["hy-AM"] = "Armenia";
            CDictionary["Cy-az-AZ"] = "Azerbaijan";
            CDictionary["eu-ES"] = "Basque";
            CDictionary["be-BY"] = "Belarus";
            CDictionary["bg-BG"] = "Bulgaria";
            CDictionary["ca-ES"] = "Catalan";
            CDictionary["zh-CN"] = "China";
            CDictionary["zh-SG"] = "Singapore";
            CDictionary["zh-TW"] = "Taiwan";
            CDictionary["hr-HR"] = "Croatia";
            CDictionary["cs-CZ"] = "Czech Republic";
            CDictionary["da-DK"] = "Denmark";
            CDictionary["div-MV"] = "Maldives";
            CDictionary["nl-BE"] = "Belgium";
            CDictionary["nl-NL"] = "The Netherlands";
            CDictionary["en-AU"] = "Australia";
            CDictionary["en-BZ"] = "Belize";
            CDictionary["en-CA"] = "Canada";
            CDictionary["en-CB"] = "Caribbean";
            CDictionary["en-IE"] = "Ireland";
            CDictionary["en-JM"] = "Jamaica";
            CDictionary["en-NZ"] = "New Zealand";
            CDictionary["en-PH"] = "Philippines";
            CDictionary["en-ZA"] = "South Africa";
            CDictionary["en-TT"] = "Trinidad";
            CDictionary["en-GB"] = "United Kingdom";
            CDictionary["en-US"] = "United States";
            CDictionary["en-ZW"] = "Zimbabwe";
            CDictionary["et-EE"] = "Estonia";
            CDictionary["fo-FO"] = "Faroe Islands";
            CDictionary["fa-IR"] = "Iran";
            CDictionary["fi-FI"] = "Finland";
            CDictionary["fr-BE"] = "Belgium";
            CDictionary["fr-CA"] = "Canada";
            CDictionary["fr-FR"] = "France";
            CDictionary["fr-LU"] = "Luxembourg";
            CDictionary["fr-MC"] = "Monaco";
            CDictionary["fr-CH"] = "Switzerland";
            CDictionary["ka-GE"] = "Georgia";
            CDictionary["de-AT"] = "Austria";
            CDictionary["de-DE"] = "Germany";
            CDictionary["de-LI"] = "Liechtenstein";
            CDictionary["de-LU"] = "Luxembourg";
            CDictionary["de-CH"] = "Switzerland";
            CDictionary["el-GR"] = "Greece";
            CDictionary["he-IL"] = "Israel";
            CDictionary["hu-HU"] = "Hungary";
            CDictionary["is-IS"] = "Iceland";
            CDictionary["id-ID"] = "Indonesia";
            CDictionary["it-IT"] = "Italy";
            CDictionary["it-CH"] = "Switzerland";
            CDictionary["ja-JP"] = "Japan";
            CDictionary["kk-KZ"] = "Kazakhstan";
            CDictionary["ko-KR"] = "Korea";
            CDictionary["ky-KZ"] = "Kazakhstan";
            CDictionary["lv-LV"] = "Latvia";
            CDictionary["lt-LT"] = "Lithuania";
            CDictionary["mk-MK"] = "Macedonia";
            CDictionary["ms-BN"] = "Brunei";
            CDictionary["ms-MY"] = "Malaysia";
            CDictionary["mn-MN"] = "Mongolia";
            CDictionary["nb-NO"] = "Norway";
            CDictionary["pl-PL"] = "Poland";
            CDictionary["pt-BR"] = "Brazil";
            CDictionary["pt-PT"] = "Portugal";
            CDictionary["ro-RO"] = "Romania";
            CDictionary["ru-RU"] = "Russia";
            CDictionary["sr-RS"] = "Serbia";
            CDictionary["sk-SK"] = "Slovakia";
            CDictionary["sl-SI"] = "Slovenia";
            CDictionary["es-AR"] = "Argentina";
            CDictionary["es-BO"] = "Bolivia";
            CDictionary["es-CL"] = "Chile";
            CDictionary["es-CO"] = "Colombia";
            CDictionary["es-CR"] = "Costa Rica";
            CDictionary["es-DO"] = "Dominican Republic";
            CDictionary["es-EC"] = "Ecuador";
            CDictionary["es-SV"] = "El Salvador";
            CDictionary["es-GT"] = "Guatemala";
            CDictionary["es-HN"] = "Honduras";
            CDictionary["es-MX"] = "Mexico";
            CDictionary["es-NI"] = "Nicaragua";
            CDictionary["es-PA"] = "Panama";
            CDictionary["es-PY"] = "Paraguay";
            CDictionary["es-PE"] = "Peru";
            CDictionary["es-PR"] = "Puerto Rico";
            CDictionary["es-ES"] = "Spain";
            CDictionary["es-UY"] = "Uruguay";
            CDictionary["es-VE"] = "Venezuela";
            CDictionary["sw-KE"] = "Kenya";
            CDictionary["sv-FI"] = "Finland";
            CDictionary["sv-SE"] = "Sweden";
            CDictionary["syr-SY"] = "Syria";
            CDictionary["ta-IN"] = "India";
            CDictionary["tt-RU"] = "Russia";
            CDictionary["te-IN"] = "India";
            CDictionary["th-TH"] = "Thailand";
            CDictionary["tr-TR"] = "Turkey";
            CDictionary["uk-UA"] = "Ukraine";
            CDictionary["ur-PK"] = "Pakistan";
            CDictionary["Cy-uz-UZ"] = "Uzbekistan";
            CDictionary["vi-VN"] = "Vietnam";
        }
        #endregion
        public List<UCountry> getNotInDict(List<UCountry> countries)
        {
            List<UCountry> result = new List<UCountry>();
            foreach(UCountry c in countries)
            {
                if (!CDictionary.ContainsValue(c.Name))
                {
                    result.Add(c);
                }
            }
            return result;
        }
    }
}

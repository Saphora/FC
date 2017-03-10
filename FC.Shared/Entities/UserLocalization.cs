using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UserLocalization
    {
        public UserLocalization(CultureInfo culture, RegionInfo region)
        {
            CultureIsoName = culture.TwoLetterISOLanguageName + "-"+region.TwoLetterISORegionName;
            CultureMoneySign = region.CurrencySymbol;
            RegionName = region.DisplayName;
            RegionEnglishName = region.EnglishName;
            CurrencyNativeName = region.CurrencyNativeName;
            CultureCountryName = region.DisplayName;
            CultureDateSeparator = culture.DateTimeFormat.DateSeparator;
            TimeSeparator = culture.DateTimeFormat.TimeSeparator;
            CultureCurrencySeparator = culture.NumberFormat.CurrencyDecimalSeparator;
            NumberDecimalSeparator = culture.NumberFormat.NumberDecimalSeparator;
            CurrencyCultureDecimalDigits = culture.NumberFormat.CurrencyDecimalDigits;
            NumberDecimalDigits = culture.NumberFormat.NumberDecimalDigits;
            PositiveSign = culture.NumberFormat.PositiveSign;
            NegativeSign = culture.NumberFormat.NegativeSign;
            ISOCurrencySymbol = region.ISOCurrencySymbol;
            TwoLetterCountryName = region.TwoLetterISORegionName;
            ThreeLetterCountryName = region.ThreeLetterISORegionName;
                
        }
        public string TwoLetterCountryName { get; set; }
        public string ThreeLetterCountryName { get; set; }

        public string ISOCurrencySymbol { get; set; }
        public string NegativeSign { get; set; }
        public string PositiveSign { get; set; }
        public string TimeSeparator { get; set; }
        public string CurrencyNativeName { get; set; }
        public string RegionEnglishName { get; set; }
        public string RegionName { get; set; }
        public string CultureIsoName { get; set; }
        public string CultureCountryName { get; set;}
        public string CultureMoneySign { get; set; }
        public string CultureDateSeparator { get; set; }
        public string CultureCurrencySeparator { get; set; }
        public int CurrencyCultureDecimalDigits { get; set; }
        public int NumberDecimalDigits { get; set; }
        public string NumberDecimalSeparator { get; set; }

    }
}

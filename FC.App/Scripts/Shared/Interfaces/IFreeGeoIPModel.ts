module FC.Shared.Interfaces {
    export interface IFreeGeoIPModel {
        ip: string;
        country_code: string;
        country_name: string;
        region_code: string;
        region_name: string;
        city: string;
        zip_code: string;
        time_zone: string;
        latitude: string;
        longitude: string;
        metro_code: string;
    }
}
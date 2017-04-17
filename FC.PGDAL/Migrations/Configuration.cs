namespace FC.PGDAL.Migrations
{
    using Seeds;
    using Shared.EntityMapper;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<FC.MSDAL.ContentModel>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            
        }

        protected override void Seed(FC.MSDAL.ContentModel context)
        {
            //new SeedTruncate("CCC61E73-2FDA-4551-A4D9-C5A81E910A7B", context);
            //new SeedThemes("4E9E95DB-3F39-45DF-82D4-DDF71F5AA4F1", context);
            //new SeedGenres("FB6FC308-FB5A-45A5-BC86-22DE54516D76", context);
            //new SeedCountries("494F7ACB-DC5E-4441-BD2F-8F1A08008FAA", context);
            //new SeedArtists("154B6532-AAB4-4DAA-9AA5-A4A5723D309E", context);
            //new SeedCustomers("CF5C3ED2-F322-4E92-A25B-B8E9506CD25B", context);
            //new SeedVisibility("F66CD5DB-800E-4768-9910-9767525C395A", context);
            //new SeedBanners("8272B4ED-958F-4BA7-81C0-2B950AB6924F", context);
            //new SeedFestivals("79E715D5-140B-482D-AF40-9B75ECEBA160", context);
            //new SeedNews("6B27AA04-0C81-4837-8F46-6B28B767121E", context);
            //new SeedAnnouncements("529DF3E0-8EA1-44E3-B6E3-F925F869DC01", context);
            //new SeedMedia("4241F6B8-9FDD-4344-BC29-06D4EBFB0E80", context);
            //new SeedApplicationUsers("7381DFB7-B268-4D4A-8F23-EDF5F0223657", context);
            new SeedRoles("D51068A7-457B-417A-841B-9162BA71F9AD", context);
            //new SeedRefactorGenres("A10E4656-B636-418D-90DE-603948EF491D", context);
            //new SeedLanguage("0E2E8086-B957-4C76-987A-A69A45C0365A", context);
            //new SeedAddIsoCulture("A255C9BA-8213-47CE-921F-0C8F390F6EA0", context);
            //new SeedAlbumIDs("4ED6C2F6-9E08-4FBC-911E-0F19A7AE47F5", context);
            //new SeedMediaTypes("4AD6C2F6-9E98-4ABD-911E-0F14A7AE47F8", context);
            //new SeedResellerTypes("9B66606F-A8AA-484C-BA6D-8B586CE5CC39", context);
            new SeedApplicationUsersV2("F5ABF7D6-58C7-4FCA-B068-2AD6510E31EC", context);
            new SeedUsersDirectory("9FFC33FC-28B4-4883-A6E0-949D2E6FAEBA", context);
        }
    }
}
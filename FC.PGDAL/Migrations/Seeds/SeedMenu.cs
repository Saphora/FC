using FC.MSDAL;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedMenu : SeedBase
    {
        public SeedMenu(string versionID, ContentModel db) : base(versionID, db)
        {
            if (SeedCanRun)
            {
                Guid developerID = Guid.Parse("40ed3682-0ceb-409e-b632-4ee22f13a11b");
                Guid anonID = Guid.Parse("525cdb04-60ec-4c4c-bb78-ba65a1eb2ff7");
                Guid adminID = Guid.Parse("2d070031-5737-44ba-8c6c-082ee997c3be");
                Guid ownerID = Guid.Parse("cfcfddfe-19eb-474b-8fdd-3d26f4d282b4");
                Guid endUsrID = Guid.Parse("e04cf318-7669-40a3-8411-3b2b8b974877");
                Guid newsAdmin = Guid.Parse("eff31461-e511-4a13-904a-97d2b7afb229");
                Guid userAdmin = Guid.Parse("0da599fe-5f00-4595-8c1f-a4eb2914a418");
                Guid reporterID = Guid.Parse("17836421-2289-494a-a06b-196340ad6534");
                Guid festivalAdminID = Guid.Parse("8ae492c6-8d73-437f-93f2-872a44fc3fa9");
                Guid artistAdminID = Guid.Parse("4979bbb2-6473-4789-86b6-e9724aa18771");
                Guid genreAdminID = Guid.Parse("6fa6536e-3d45-4539-8dac-21a9554da9c7");
                SeedStart();
                MenuSection general = new MenuSection
                {
                    SectionID = Guid.Parse("531DFCD9-E9BA-4937-B921-146D695D2E8A"),
                    Name = "GENERAL",
                    PageKey = null,
                    IsPublished = true,
                    SortOrder = 1,
                    IsDeleted = false
                };
                Db.MenuSections.Add(general);
                foreach (Role r in Db.Roles)
                {
                    Db.MS2R.Add(new MenuSection2Roles { MS2RID = Guid.NewGuid(), RoleID = r.RoleID, MenuSectionID=general.SectionID });
                }
                Db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-arrow-left",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = general.SectionID,
                    MenuItemID = Guid.Parse("B88E6CD2-6C9B-4EE8-BF61-5FE68DDBA9DF"),
                    Name = "GO BACK",
                    OnClick = "$event.preventDefault();vm.GoNativeBack();",
                    URL = "#",
                    SortOrder = 1,
                    Title = "Go back to previous screen."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-music",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = general.SectionID,
                    MenuItemID = Guid.Parse("74039F14-153C-4A54-ACCB-E97F292FACD6"),
                    Name = "ARTISTS",
                    
                    URL = "/artists",
                    SortOrder = 2,
                    Title = "Go to artists overview."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-headphones",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = general.SectionID,
                    MenuItemID = Guid.Parse("11D83724-0E66-45E4-8C91-C1D9AE833585"),
                    Name = "FESTIVALS",
                    
                    URL = "/festivals",
                    SortOrder = 3,
                    Title = "Go to festival overview."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-heart",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = general.SectionID,
                    MenuItemID = Guid.Parse("F8B5B139-22F1-4D8F-8FFC-2F46E8726D68"),
                    Name = "GENRES",
                    
                    URL = "/genres",
                    SortOrder = 4,
                    Title = "Go to genres overview."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-map-marker",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = general.SectionID,
                    MenuItemID = Guid.Parse("DD794A5D-7F1D-451D-8B8E-2E1A94B38619"),
                    Name = "LOCATIONS",
                    
                    URL = "/locations",
                    SortOrder = 5,
                    Title = "Go to locations overview."
                });
                Db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-newspaper-o",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = general.SectionID,
                    MenuItemID = Guid.Parse("11D252CE-A62E-4D0E-B052-1FBD05DADF38"),
                    Name = "HEADLINES",
                    
                    URL = "/news",
                    SortOrder = 5,
                    Title = "Go to headlines."
                });

                MenuSection festivalSettings = new MenuSection
                {
                    SectionID = Guid.Parse("4857BD30-08ED-44B6-B7EB-B1652EA197EE"),
                    Name = "FESTIVAL SETTINGS",
                    PageKey = "festival",
                    IsPublished = true,
                    SortOrder = 2,
                    IsDeleted = false
                };
                Db.MenuSections.Add(festivalSettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("F0EA1C5D-5C16-4A25-9883-75D83729488E"),
                        RoleID = adminID,
                        MenuSectionID = festivalSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("D5801B37-8924-43A5-900A-0DE65D9ED449"),
                        RoleID = festivalAdminID,
                        MenuSectionID = festivalSettings.SectionID

                    }
                );

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = festivalSettings.SectionID,
                    MenuItemID = Guid.Parse("7BC15303-5740-4E75-846C-59C8454C83F4"),
                    Name = "CREATE FESTIVAL",
                    
                    URL = "/festivals/create/1",
                    SortOrder = 1,
                    Title = "Create a new festival."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = festivalSettings.SectionID,
                    MenuItemID = Guid.Parse("497543EC-E447-45E5-87BB-862BD8E26E7D"),
                    Name = "REMOVE FESTIVAL",
                    IsSpecific = true,
                    
                    URL = "/festivals/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this festival."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = festivalSettings.SectionID,
                    MenuItemID = Guid.Parse("6F4C63C5-D8FA-4FAB-9458-166D6704F095"),
                    OpositeID = Guid.Parse("8388D10B-49D1-4A6B-B47E-1E7C189033EB"),
                    Name = "PUBLISH FESTIVAL",
                    IsSpecific = true,
                    
                    URL = "/festivals/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this festival."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = festivalSettings.SectionID,
                    MenuItemID = Guid.Parse("8388D10B-49D1-4A6B-B47E-1E7C189033EB"),
                    OpositeID = Guid.Parse("6F4C63C5-D8FA-4FAB-9458-166D6704F095"),
                    Name = "UNPUBLISH FESTIVAL",
                    IsSpecific = true,
                    
                    URL = "/festivals/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this festival."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-clock-o",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = festivalSettings.SectionID,
                    MenuItemID = Guid.Parse("753271EE-95A2-4D14-AE10-23A52A40BCE0"),
                    Name = "MANAGE LINE-UP",
                    IsSpecific = true,
                    
                    URL = "/festivals/lineup/$ID$",
                    SortOrder = 4,
                    Title = "Manage line-up for this festival."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-clock-o",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = festivalSettings.SectionID,
                    MenuItemID = Guid.Parse("583B6D73-2A48-4B95-9282-D98F8EE772BB"),
                    Name = "MANAGE STAGES",
                    IsSpecific = true,
                    
                    URL = "/festivals/stages/$ID$",
                    SortOrder = 5,
                    Title = "Manage stages for this festival."
                });
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("AAB53FAF-1DEB-4ADB-BBAC-E1E2B86C1495"),
                        RoleID = developerID,
                        MenuSectionID = festivalSettings.SectionID

                    }
                );
                MenuSection locationSettings = new MenuSection
                {
                    SectionID = Guid.Parse("BF047EBC-BC02-419D-9518-DAE3244509F3"),
                    Name = "LOCATION SETTINGS",
                    PageKey = "location",
                    IsPublished = true,
                    SortOrder = 2,
                    IsDeleted = false
                };
                db.MenuSections.Add(locationSettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("E97812DF-68C2-49D1-A19B-575A21B751DB"),
                        RoleID = developerID,
                        MenuSectionID = locationSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("9AE39788-7A80-4620-AB98-8A70CF49F9A8"),
                        RoleID = adminID,
                        MenuSectionID = locationSettings.SectionID

                    }
                );


                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = locationSettings.SectionID,
                    MenuItemID = Guid.Parse("4C1F6C00-F65C-42E9-A333-AFAA353E16B8"),
                    Name = "CREATE LOCATION",
                    
                    URL = "/locations/create/1",
                    SortOrder = 1,
                    Title = "Create a new location."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = locationSettings.SectionID,
                    MenuItemID = Guid.Parse("483F8784-8861-4477-A8AC-A2CC6D521E66"),
                    Name = "REMOVE LOCATION",
                    IsSpecific = true,
                    
                    URL = "/locations/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this location."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = locationSettings.SectionID,
                    MenuItemID = Guid.Parse("EE540580-6525-419F-8676-64BAA77EF8B4"),
                    OpositeID = Guid.Parse("CBCEA0FF-B9BA-477C-AAE4-AFCA7EEA772E"),
                    Name = "PUBLISH LOCATION",
                    IsSpecific = true,
                    
                    URL = "/locations/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this location."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = locationSettings.SectionID,
                    MenuItemID = Guid.Parse("CBCEA0FF-B9BA-477C-AAE4-AFCA7EEA772E"),
                    OpositeID = Guid.Parse("EE540580-6525-419F-8676-64BAA77EF8B4"),
                    Name = "UNPUBLISH LOCATION",
                    IsSpecific = true,
                    
                    URL = "/locations/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this location."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-heart",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = locationSettings.SectionID,
                    MenuItemID = Guid.Parse("A598B55F-58A9-4A6B-82EA-A658589EC145"),
                    Name = "MANAGE ARTIST GENRES",
                    IsSpecific = true,
                    
                    URL = "/artist/genres/$ID$",
                    SortOrder = 4,
                    Title = "Manage the genres for this artist."
                });

                MenuSection artistSettings = new MenuSection
                {
                    SectionID = Guid.Parse("3AE9ECC1-98F5-4450-AC2E-488BB8C523A7"),
                    Name = "ARTIST SETTINGS",
                    PageKey = "artist",
                    IsPublished = true,
                    SortOrder = 2,
                    IsDeleted = false
                };
                db.MenuSections.Add(artistSettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("8895ADE0-B009-46AA-900B-46DADA6B27C4"),
                        RoleID = developerID,
                        MenuSectionID = artistSettings.SectionID

                    }
                );

                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("754299F7-2B75-4BA3-B41E-E037E230C12A"),
                        RoleID = adminID,
                        MenuSectionID = artistSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("242DAB24-B2F3-4313-95C4-C8B49ED93F5D"),
                        RoleID = artistAdminID,
                        MenuSectionID = artistSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("95A3DD65-34A7-4688-BB00-BE348E85340F"),
                        RoleID = festivalAdminID,
                        MenuSectionID = artistSettings.SectionID

                    }
                );


                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = artistSettings.SectionID,
                    MenuItemID = Guid.Parse("5FA98DB3-2E27-48E5-AB77-A5AB666CD556"),
                    Name = "CREATE ARTIST",
                    
                    URL = "/artists/create/1",
                    SortOrder = 1,
                    Title = "Create a new artist."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = artistSettings.SectionID,
                    MenuItemID = Guid.Parse("9FBDBCF8-96E2-44C1-B8AD-E31247B08A68"),
                    Name = "REMOVE ARTIST",
                    IsSpecific = true,
                    
                    URL = "/artists/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this artist."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = artistSettings.SectionID,
                    MenuItemID = Guid.Parse("ECA61A17-96FA-43B0-9128-8E1F4A593751"),
                    OpositeID = Guid.Parse("9F6E74C3-4991-4C0F-BFEB-81F9001B842B"),
                    Name = "PUBLISH ARTIST",
                    IsSpecific = true,
                    
                    URL = "/artists/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this artist."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = artistSettings.SectionID,
                    MenuItemID = Guid.Parse("9F6E74C3-4991-4C0F-BFEB-81F9001B842B"),
                    OpositeID = Guid.Parse("ECA61A17-96FA-43B0-9128-8E1F4A593751"),
                    Name = "UNPUBLISH ARTIST",
                    IsSpecific = true,
                    
                    URL = "/artists/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this artist."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-heart",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = artistSettings.SectionID,
                    MenuItemID = Guid.Parse("E6CC93AF-3C60-4587-B5F6-540FF3E799BB"),
                    Name = "MANAGE ARTIST GENRES",
                    IsSpecific = true,
                    
                    URL = "/artist/genres/$ID$",
                    SortOrder = 4,
                    Title = "Manage the genres for this artist."
                });

                MenuSection countrySettings = new MenuSection
                {
                    SectionID = Guid.Parse("5FC580A0-4CD5-4D13-A3C8-D8BA7EC99C8B"),
                    Name = "COUNTRY SETTINGS",
                    PageKey = "country",
                    SortOrder = 2,
                    IsPublished = true,
                    IsDeleted = false
                };
                Db.MenuSections.Add(countrySettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("4979bbb2-6473-4789-86b6-e9724aa18771"),
                        RoleID = developerID,
                        MenuSectionID = countrySettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("99FEDB07-F5C8-43C0-BE6D-ECA376FF7377"),
                        RoleID = adminID,
                        MenuSectionID = countrySettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("8281C024-0940-400E-80CA-22D9E2EB70BC"),
                        RoleID = festivalAdminID,
                        MenuSectionID = countrySettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("EE0DC77B-7986-4D91-A951-D093B73616E4"),
                        RoleID = artistAdminID,
                        MenuSectionID = countrySettings.SectionID

                    }
                );


                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = countrySettings.SectionID,
                    MenuItemID = Guid.Parse("74DE87FD-44FE-4EC2-B566-9A4E61CA8018"),
                    Name = "CREATE COUNTRY",
                    
                    URL = "/countries/create",
                    SortOrder = 1,
                    Title = "Create a new country."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = countrySettings.SectionID,
                    MenuItemID = Guid.Parse("469249B9-A50F-4C62-B687-B0446B56E9D4"),
                    Name = "REMOVE COUNTRY",
                    IsSpecific = true,
                    
                    URL = "/countries/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this country."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = countrySettings.SectionID,
                    MenuItemID = Guid.Parse("0558EA3B-31BD-4DBB-AFFB-B1F8146F0DD4"),
                    OpositeID = Guid.Parse("4741B018-3600-47F5-B329-84EDF0229E27"),
                    Name = "PUBLISH COUNTRY",
                    IsSpecific = true,
                    
                    URL = "/countries/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this country."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = countrySettings.SectionID,
                    MenuItemID = Guid.Parse("4741B018-3600-47F5-B329-84EDF0229E27"),
                    OpositeID = Guid.Parse("0558EA3B-31BD-4DBB-AFFB-B1F8146F0DD4"),
                    Name = "UNPUBLISH COUNTRY",
                    IsSpecific = true,
                    
                    URL = "/countries/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this country."
                });

                MenuSection genreSettings = new MenuSection
                {
                    SectionID = Guid.Parse("06C25DF5-076D-417F-86CF-5299E121D2B2"),
                    Name = "GENRE SETTINGS",
                    SortOrder = 2,
                    PageKey = "genre",
                    IsPublished = true,
                    IsDeleted = false
                };
                Db.MenuSections.Add(genreSettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("C76D1569-43A3-4A7C-AE99-BC591F35E724"),
                        RoleID = developerID,
                        MenuSectionID = genreSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("16C9CF29-1DE9-412C-9F86-CF7D7150DD96"),
                        RoleID = adminID,
                        MenuSectionID = genreSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("A9F48AB7-C5E8-408B-A0FB-0E8691FDBDC1"),
                        RoleID = festivalAdminID,
                        MenuSectionID = genreSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("8904F78B-77EA-465C-A124-7D18B423D4D3"),
                        RoleID = artistAdminID,
                        MenuSectionID = genreSettings.SectionID

                    }
                );

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = genreSettings.SectionID,
                    MenuItemID = Guid.Parse("B20886A0-2481-43F6-8794-29304C3A3820"),
                    Name = "CREATE GENRE",
                    
                    URL = "/genres/create",
                    SortOrder = 1,
                    Title = "Create a new genre."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = genreSettings.SectionID,
                    MenuItemID = Guid.Parse("D76FDC28-ECB1-4273-A14F-0FA15FB210A3"),
                    Name = "REMOVE GENRE",
                    IsSpecific = true,
                    
                    URL = "/genres/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this genre."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = genreSettings.SectionID,
                    MenuItemID = Guid.Parse("DD716597-15E8-4077-A2FE-0329805E99B1"),
                    OpositeID = Guid.Parse("D1B8684E-2140-4168-94C0-8E58976008D5"),
                    Name = "PUBLISH GENRE",
                    IsSpecific = true,
                    
                    URL = "/genres/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this genre."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = genreSettings.SectionID,
                    MenuItemID = Guid.Parse("D1B8684E-2140-4168-94C0-8E58976008D5"),
                    OpositeID = Guid.Parse("DD716597-15E8-4077-A2FE-0329805E99B1"),
                    Name = "UNPUBLISH GENRE",
                    IsSpecific = true,
                    
                    URL = "/genres/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this genre."
                });
                MenuSection resellerSettings = new MenuSection
                {
                    SectionID = Guid.Parse("BF5C11C6-26D3-47EA-999E-9695C92A355E"),
                    Name = "RESELLER SETTINGS",
                    PageKey = "reseller",
                    IsPublished = true,
                    SortOrder = 2,
                    IsDeleted = false
                };

                Db.MenuSections.Add(resellerSettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("F60B6CAC-8482-493A-B223-C47D0CEA7DCF"),
                        RoleID = developerID,
                        MenuSectionID = resellerSettings.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("BF5D2677-84BC-4421-AF8E-790C5065DD6E"),
                        RoleID = adminID,
                        MenuSectionID = resellerSettings.SectionID

                    }
                );


                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("23FD3362-3618-4504-A563-AF09E07F087C"),
                    Name = "CREATE RESELLER",
                    
                    URL = "/resllers/create/1",
                    SortOrder = 1,
                    Title = "Create a new reseller."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("86853F02-C7CA-4BD7-BDA6-3A9BD8C0F0CC"),
                    Name = "REMOVE RESELLER",
                    IsSpecific = true,
                    
                    URL = "/resellers/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this reseller."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("DD4EBBA4-842C-47ED-B3DC-BCE64A370C79"),
                    OpositeID = Guid.Parse("1466E503-CBE4-4CCC-B6A2-D045FE4D06EE"),
                    Name = "PUBLISH RESELLER",
                    IsSpecific = true,
                    
                    URL = "/resellers/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this reseller."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("1466E503-CBE4-4CCC-B6A2-D045FE4D06EE"),
                    OpositeID = Guid.Parse("DD4EBBA4-842C-47ED-B3DC-BCE64A370C79"),
                    Name = "UNPUBLISH RESELLER",
                    IsSpecific = true,
                    
                    URL = "/resellers/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this reseller."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-cube",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("176B81C3-825F-49EE-A8CF-6846031B9736"),
                    Name = "MANAGE PRODUCTS",
                    IsSpecific = true,
                    
                    URL = "/resellers/products/$ID$",
                    SortOrder = 3,
                    Title = "Manage reseller products."
                });

                MenuSection userSettings = new MenuSection
                {
                    SectionID = Guid.Parse("6290BA41-1411-4DB7-BE46-64C52194A107"),
                    Name = "USER SETTINGS",
                    SortOrder = 2,
                    PageKey = "user",
                    IsPublished = true,
                    IsDeleted = false
                };
                Db.MenuSections.Add(userSettings);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("30F9D222-6F58-4008-B71F-6C47C72354BE"),
                        RoleID = developerID,
                        MenuSectionID = userSettings.SectionID

                    }
                );

                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("A940DFD4-A452-4588-8E9F-4E8193B6B6C0"),
                        RoleID = adminID,
                        MenuSectionID = userSettings.SectionID

                    }
                );

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = userSettings.SectionID,
                    MenuItemID = Guid.Parse("19EC157C-AA1A-4170-B051-B7226BF3DF86"),
                    Name = "CREATE USER",
                    
                    URL = "/users/create/1",
                    SortOrder = 1,
                    Title = "Create a new user."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = userSettings.SectionID,
                    MenuItemID = Guid.Parse("972016F3-6604-4427-BF04-C8753A386433"),
                    Name = "REMOVE USER",
                    IsSpecific = true,
                    
                    URL = "/users/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this reseller."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-lock",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = userSettings.SectionID,
                    MenuItemID = Guid.Parse("B1F592DC-856E-41A1-9D67-6DBD99174C1E"),
                    OpositeID = Guid.Parse("4B50D0EC-B0AA-4C2D-BBB3-85930229A8CF"),
                    Name = "LOCK ACCOUNT",
                    IsSpecific = true,
                    
                    URL = "/users/lock/$ID$",
                    SortOrder = 3,
                    Title = "Lock this account."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-lock",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = userSettings.SectionID,
                    MenuItemID = Guid.Parse("4B50D0EC-B0AA-4C2D-BBB3-85930229A8CF"),
                    Name = "UNLOCK ACCOUNT",
                    OpositeID = Guid.Parse("B1F592DC-856E-41A1-9D67-6DBD99174C1E"),
                    IsSpecific = true,
                    
                    URL = "/users/unlock/$ID$",
                    SortOrder = 3,
                    Title = "Unlock this account."
                });

                MenuSection advertisement = new MenuSection
                {
                    SectionID = Guid.Parse("24B8CA1C-5838-42B9-AF7F-24BC482FE4FC"),
                    Name = "ADVERTISEMENT",
                    SortOrder = 3,
                    IsPublished = true,
                    IsDeleted = false,
                    PageKey = "advertisement"
                    
                };
                Db.MenuSections.Add(advertisement);
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("A2EE1B2E-B049-4920-A247-E587E7CB0064"),
                        RoleID = developerID,
                        MenuSectionID = advertisement.SectionID

                    }
                );
                Db.MS2R.Add(
                    new MenuSection2Roles
                    {
                        MS2RID = Guid.Parse("7CCD91BC-39F0-484B-96C8-9CA17793C17D"),
                        RoleID = adminID,
                        MenuSectionID = advertisement.SectionID

                    }
                );

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = advertisement.SectionID,
                    MenuItemID = Guid.Parse("90933315-DF64-48D9-BFBC-942808E0E6C9"),
                    Name = "CREATE ADVERTISEMENT",
                    
                    URL = "/advertisement/create/1",
                    SortOrder = 1,
                    Title = "Create a new advertisement."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = advertisement.SectionID,
                    MenuItemID = Guid.Parse("365DA851-E281-46CC-962C-74C3E523DBB9"),
                    Name = "REMOVE ADVERTISEMENT",
                    IsSpecific = true,
                    
                    URL = "/advertisement/delete/$ID$",
                    SortOrder = 2,
                    Title = "Remove this advertisement."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = advertisement.SectionID,
                    MenuItemID = Guid.Parse("657DC2FD-5192-4017-9488-25ECF2356DFB"),
                    OpositeID = Guid.Parse("91E47BDD-DC2E-42A3-984E-76E741AFD357"),
                    Name = "PUBLISH ADVERTISEMENT",
                    IsSpecific = true,
                    
                    URL = "/advertisement/publish/$ID$",
                    SortOrder = 3,
                    Title = "Publish this advertisement."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-globe",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = advertisement.SectionID,
                    MenuItemID = Guid.Parse("91E47BDD-DC2E-42A3-984E-76E741AFD357"),
                    OpositeID = Guid.Parse("657DC2FD-5192-4017-9488-25ECF2356DFB"),
                    Name = "UNPUBLISH ADVERTISEMENT",
                    IsSpecific = true,
                    
                    URL = "/advertisement/unpublish/$ID$",
                    SortOrder = 3,
                    Title = "Unpublish this advertisement."
                });

                MenuSection account = new MenuSection
                {
                    SectionID = Guid.Parse("17DAB00F-08AA-47BA-A276-AD692DFE9A1E"),
                    Name = "MY FC",
                    SortOrder = 4,
                   
                    IsPublished = true,
                    IsDeleted = false
                };

                MenuSection public_account = new MenuSection
                {
                    SectionID = Guid.Parse("B67A0136-9D18-4B67-9506-0E3040AF6076"),
                    Name = "JOIN US!",
                    SortOrder = 4,
                   
                    IsPublished = true,
                    IsDeleted = false
                };

                Db.MenuSections.Add(account);
                Db.MenuSections.Add(public_account);
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-id-card-o",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = account.SectionID,
                    MenuItemID = Guid.Parse("9EBA9A0F-D82A-4127-AF51-2EF8D7E47AEE"),
                    Name = "MY PROFILE",
                    IsSpecific = false,
                    
                    URL = "/resellers/products/$ID$",
                    SortOrder = 3,
                    Title = "Manage my profile."
                });


                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-headphones",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = public_account.SectionID,
                    MenuItemID = Guid.Parse("10E42ADB-2A30-4AC8-9297-EBAFA4A43D84"),
                    Name = "REGISTER AS FESTIVAL",
                    IsSpecific = false,
                    
                    URL = "/account/register/festival/1",
                    SortOrder = 2,
                    Title = "Join Festival Calendar!"
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-music",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = public_account.SectionID,
                    MenuItemID = Guid.Parse("68677326-6CB4-4BEA-BD2D-2FEFB0536840"),
                    Name = "REGISTER AS ARTIST",
                    IsSpecific = false,
                    
                    URL = "/account/register/artist/1",
                    SortOrder = 1,
                    Title = "Join Festival Calendar as artist!"
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-map-marker",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = public_account.SectionID,
                    MenuItemID = Guid.Parse("ACAF61BE-7C9F-43EB-A474-9FF271480963"),
                    Name = "REGISTER AS LOCATION",
                    IsSpecific = false,
                    
                    URL = "/account/register/location/1",
                    SortOrder = 3,
                    Title = "Join Festival Calendar as location!"
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-shopping-cart",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = public_account.SectionID,
                    MenuItemID = Guid.Parse("9233C11A-73BD-4E9F-B69D-7BA3B094EC5B"),
                    Name = "REGISTER AS RESELLER",
                    IsSpecific = false,
                    
                    URL = "/account/register/reseller/1",
                    SortOrder = 4,
                    Title = "Join Festival Calendar as reseller!"
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-headphones",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = account.SectionID,
                    MenuItemID = Guid.Parse("F5BA61B3-8228-4F81-A945-C48C06E4F91E"),
                    Name = "MY FESTIVALS",
                    
                    URL = "/account/festivals/$ID$",
                    SortOrder = 3,
                    Title = "Manage my festivals."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-map-marker",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = account.SectionID,
                    MenuItemID = Guid.Parse("02AEDD77-58F5-4E3D-9077-EC489D3DF204"),
                    Name = "MY LOCATIONS",
                    
                    URL = "/account/locations/$ID$",
                    SortOrder = 3,
                    Title = "Manage my locations."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-bullhorn",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = account.SectionID,
                    MenuItemID = Guid.Parse("F15E20DA-48D4-40AE-B357-B2143F13C965"),
                    Name = "MY ADVERTISEMENT",
                    
                    URL = "/account/advertisement/$ID$",
                    SortOrder = 3,
                    Title = "Manage my profile."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-gears",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = account.SectionID,
                    MenuItemID = Guid.Parse("79704022-A8D8-4024-9E4A-149D7804DA14"),
                    Name = "PERSONAL SETTINGS",
                    IsSpecific = false,
                    
                    URL = "/account/settings/$ID$",
                    SortOrder = 3,
                    Title = "Configure your personal settings."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-sign-in",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = public_account.SectionID,
                    MenuItemID = Guid.Parse("FF3E210E-458A-4F53-BFEE-1F9FAF54C9F1"),
                    OpositeID = Guid.Parse("670F494F-FBEC-46A5-B1B1-D73648EE44C1"),
                    Name = "LOGIN",
                    OnClick = "ShowLoginModal",
                    URL = "#",
                    SortOrder = 3,
                    Title = "Sign in to Festival-Calendar.nl."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-sign-out",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = account.SectionID,
                    MenuItemID = Guid.Parse("670F494F-FBEC-46A5-B1B1-D73648EE44C1"),
                    OpositeID = Guid.Parse("BD1A878E-F041-4DB1-85E4-952571353968"),
                    Name = "LOGOUT",
                    OnClick = "ShowLogoutModal",
                    URL = "/account/logout$",
                    SortOrder = 3,
                    Title = "Sign out of Festival-Calendar.nl."
                });
                foreach (Guid g in Db.Roles.Where(w => w.RoleID != anonID).Select(s => s.RoleID))
                {

                    Db.MS2R.Add(
                        new MenuSection2Roles
                        {
                            MS2RID = Guid.NewGuid(),
                            RoleID = g,
                            MenuSectionID = account.SectionID

                        }
                    );
                }
                
                Db.MS2R.Add(new MenuSection2Roles
                {
                    MS2RID = Guid.NewGuid(),
                    RoleID = anonID,
                    MenuSectionID = public_account.SectionID
                });


                MenuSection menu_detail = new MenuSection
                {
                    SectionID = Guid.Parse("CC10C9D4-0246-4B55-A0DC-404E6BD47D66"),
                    Name = "MANAGE MENUS",
                    SortOrder = 5,
                    PageKey =  "MenuDetail",
                    IsPublished = true,
                    IsDeleted = false
                };
                MenuSection menuOverview = new MenuSection
                {
                    SectionID = Guid.Parse("56B413A7-598B-41FE-8773-8591E67DAA43"),
                    Name = "MANAGE MENUS",
                    SortOrder = 5,
                    IsPublished = true,
                    IsDeleted = false
                };
                Db.MenuSections.Add(menu_detail);
                Db.MenuSections.Add(menuOverview);
                Db.MS2R.Add(new MenuSection2Roles
                {
                    MS2RID = Guid.NewGuid(),
                    RoleID = developerID,
                    MenuSectionID = menu_detail.SectionID
                });

                Db.MS2R.Add(new MenuSection2Roles
                {
                    MS2RID = Guid.NewGuid(),
                    RoleID = adminID,
                    MenuSectionID = menu_detail.SectionID
                });
                Db.MS2R.Add(new MenuSection2Roles
                {
                    MS2RID = Guid.NewGuid(),
                    RoleID = developerID,
                    MenuSectionID = menuOverview.SectionID
                });

                Db.MS2R.Add(new MenuSection2Roles
                {
                    MS2RID = Guid.NewGuid(),
                    RoleID = adminID,
                    MenuSectionID = menuOverview.SectionID
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    IsSpecific = true,
                    ParentID = null,
                    SectionID = menuOverview.SectionID,
                    MenuItemID = Guid.Parse("CA760C4C-E5B8-4D31-AE58-5A6B1AE3F3A2"),
                    Name = "CREATE MENU SECTION",
                    URL = "/menus/menusections/create/1",
                    SortOrder = 1,
                    Title = "Create a new menu section."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-plus",
                    IsPublished = true,
                    IsSpecific = true,
                    ParentID = null,
                    SectionID = menuOverview.SectionID,
                    MenuItemID = Guid.Parse("FD0C7482-2CDE-4AF6-AC84-54F09439D632"),
                    Name = "CREATE MENU ITEM",
                    URL = "/menus/menuitems/create/1",
                    SortOrder = 1,
                    Title = "Create a new menu item."
                });

                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("0844B654-0843-4A41-AE0D-50F7D4719096"),
                    Name = "REMOVE MENU SECTION",
                    IsSpecific = true,

                    URL = "/menus/menusections/remove/$ID$",
                    SortOrder = 2,
                    Title = "Remove this menu section."
                });
                db.MenuItems.Add(new MenuItem()
                {
                    IsDeleted = false,
                    FAIcon = "fa-trash",
                    IsPublished = true,
                    ParentID = null,
                    SectionID = resellerSettings.SectionID,
                    MenuItemID = Guid.Parse("9239DCF3-05A9-493D-B128-9FEEC362BFFD"),
                    Name = "REMOVE MENU ITEM",
                    IsSpecific = true,
                    URL = "/menus/menusections/remove/$ID$",
                    SortOrder = 2,
                    Title = "Remove this menu section."
                });

                Db.SaveChanges();
                SeedFinished(true);
            }
        }
    }
}

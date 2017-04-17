
using FC.MSDAL;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedLanguage : SeedBase
    {
        public SeedLanguage(string versionID, ContentModel db) : base(versionID, db)
        {
            SeedName = "SeedLanguage";
            SeedStart();
            if (SeedCanRun)
            {
                Language l1 = new Language
                {
                    LangName = "English",
                    LanguageID = Guid.NewGuid(),
                    TwoLetterLangName = "en",
                    CodePage = 850
                };

                Language l2 = new Language
                {
                    LangName = "Deutsch",
                    LanguageID = Guid.NewGuid(),
                    TwoLetterLangName = "de",
                    CodePage = 850
                };

                Language l3 = new Language
                {
                    LangName = "Français",
                    LanguageID = Guid.NewGuid(),
                    TwoLetterLangName = "fr",
                    CodePage = 850
                };

                Language l4 = new Language
                {
                    LangName = "Nederlands",
                    LanguageID = Guid.NewGuid(),
                    TwoLetterLangName = "nl",
                    CodePage = 850
                };

                Language l5 = new Language
                {
                    LangName = "Español",
                    LanguageID = Guid.NewGuid(),
                    TwoLetterLangName = "es",
                    CodePage = 850
                };
                Db.Languages.Add(l1);
                Db.Languages.Add(l2);
                Db.Languages.Add(l3);
                Db.Languages.Add(l4);
                Db.Languages.Add(l5);
                Db.SaveChanges();

                this.SeedDETranslations();
                this.SeedNLTranslations();
                this.SeedENTranslations();
                this.SeedESTranslations();
                this.SeedFRTranslations();
                Db.SaveChanges();
                SeedFinished(true);
            }
            else
            {
                SeedFinished(true);
            }
        }
        //ENGLISH
        public void SeedENTranslations()
        {
            //FESTIVAL CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_CREATED",
                Value = "Festival $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_MODIFIED",
                Value = "Festival $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_DELETE",
                Value = "Festival $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_FORCE_DELETE",
                Value = "Festival $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_EXISTS",
                Value = "Festival $NAME already exists on the same start date and country."
            });

            //ARTIST CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_CREATED",
                Value = "Performer $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_MODIFIED",
                Value = "Performer $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_DELETE",
                Value = "Performer $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_FORCE_DELETE",
                Value = "Performer $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_EXISTS",
                Value = "Performer $NAME already exists."
            });

            //GENRE CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "GENRE_CREATED",
                Value = "Genre $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "GENRE_MODIFIED",
                Value = "Genre $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "GENRE_DELETE",
                Value = "Genre $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "GENRE_FORCE_DELETE",
                Value = "Genre $NAME successfully removed with force."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "GENRE_EXISTS",
                Value = "Genre $NAME already exists."
            });

            //NEWS CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "NEWS_CREATED",
                Value = "News $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "NEWS_MODIFIED",
                Value = "News $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "NEWS_DELETE",
                Value = "News $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "NEWS_FORCE_DELETE",
                Value = "News $NAME successfully removed with force."
            });
            //MEDIA CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_CREATED",
                Value = "Directory $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_CREATED",
                Value = "Media $NAME successfully uploaded."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_DELETED",
                Value = "Directory $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_DELETED",
                Value = "Media $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_EDITED",
                Value = "Directory $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_EDITED",
                Value = "Media $NAME successfully modified."
            });
            //MODELS

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRE",
                Value = "Genre"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVAL",
                Value = "Festival"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTIST",
                Value = "Performer"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_NEWS",
                Value = "News"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRES",
                Value = "Genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVALs",
                Value = "Festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTISTS",
                Value = "Performers"
            });


            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORT",
                Value = "Report"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORTS",
                Value = "Reports"
            });
            //REPORT CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REPORT_CREATED",
                Value = "Report $NAME successfully created."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REPORT_MODIFIED",
                Value = "Report $NAME successfully modified."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REPORT_DELETE",
                Value = "Report $NAME successfully removed."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REPORT_FORCE_DELETE",
                Value = "Report $NAME successfully removed with force."
            });

            //MENU
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MENU_MY_ACCOUNT",
                Value = "My account"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MENU_SETTINGS",
                Value = "Settings"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MENU_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MENU_ARTISTS",
                Value = "Performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MENU_FESTIVALS",
                Value = "Festivals"
            });

            //BUTTONS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_CREATE",
                Value = "Create"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_ADD",
                Value = "Add new"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_EDIT",
                Value = "Edit"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_DELETE",
                Value = "Remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_FORCE_DELETE",
                Value = "Force remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_SAVE",
                Value = "Save"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_CANCEL",
                Value = "Cancel"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_PUBLISH",
                Value = "Publish"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "BTN_UNPUBLISH",
                Value = "Unpublish"
            });

            //MODAL
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKGENRES",
                Value = "Select genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKARTISTS",
                Value = "Select performers"
            });

            //FIELDS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_STARTDATE",
                Value = "Start date"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_ENDDATE",
                Value = "End date"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_COUNTRY",
                Value = "Country"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_NAME",
                Value = "Name"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_ZIP",
                Value = "Postal code"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_ADDRESS",
                Value = "Address & address number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_CITY",
                Value = "City"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_EMAIL",
                Value = "E-mail"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_PHONE",
                Value = "Phone number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_ARTISTS",
                Value = "Select performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES_LABEL",
                Value = "Select genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_DESCRIPTION",
                Value = "Description"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_INDOOROUTDOOR",
                Value = "Indoor / outdoor"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_STAGES",
                Value = "How many stages?"
            });

            //AUTH

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGIN",
                Value = "Sign in"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGOUT",
                Value = "Sign out"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOAUTH",
                Value = "You are not authorized to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOPERMISSION",
                Value = "You do not have the correct permissions to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "AUTH_TXT_ACTIVATE",
                Value = "An email has been sended to the address used by the registration. Please click on the activation link in the email to activate your account."
            });

            //ERRORS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is empty but required."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is not a valid $PATTERN_NAME."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "INTERNAL_ERROR",
                Value = "An internal server error has occured. Please try again later."
            });

            //REGISTRATION
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER",
                Value = "Register"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER_SUCCESS",
                Value = "Your registration was successfully received. An activation mail has been sended to the mail address used by the registration. Please click on the activation link to activate your account."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_USERNAME_EXISTS",
                Value = "The username you have chosen is not available."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "The email you have entered already exists."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "Your account has been blocked. Please check your mailbox for further information."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "UPLOAD",
                Value = "Upload"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_GENRES",
                Value = "Most popular genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_ARTISTS",
                Value = "Most popular performers"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_FESTIVALS",
                Value = "Most popular festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "OTHER",
                Value = "Other"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "RATING",
                Value = "Rating"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MY_GENRES",
                Value = "My genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MY_ARTISTS",
                Value = "My artists"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "MY_FESTIVALS",
                Value = "My festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH",
                Value = "Search"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_SUCCESS",
                Value = "$COUNT Festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_FAILURE",
                Value = "No festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_SUCCESS",
                Value = "$COUNT performers where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_FAILURE",
                Value = "No performers where found."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_SUCCESS",
                Value = "$COUNT genres where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "en").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_FAILURE",
                Value = "No genres where found."
            });
        }

        //FRENCH
        public void SeedFRTranslations()
        {
            //FESTIVAL CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_CREATED",
                Value = "Festival $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_MODIFIED",
                Value = "Festival $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_DELETE",
                Value = "Festival $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_FORCE_DELETE",
                Value = "Festival $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_EXISTS",
                Value = "Festival $NAME already exists on the same start date and country."
            });

            //ARTIST CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_CREATED",
                Value = "Performer $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_MODIFIED",
                Value = "Performer $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_DELETE",
                Value = "Performer $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_FORCE_DELETE",
                Value = "Performer $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_EXISTS",
                Value = "Performer $NAME already exists."
            });

            //GENRE CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "GENRE_CREATED",
                Value = "Genre $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "GENRE_MODIFIED",
                Value = "Genre $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "GENRE_DELETE",
                Value = "Genre $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "GENRE_FORCE_DELETE",
                Value = "Genre $NAME successfully removed with force."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "GENRE_EXISTS",
                Value = "Genre $NAME already exists."
            });

            //NEWS CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "NEWS_CREATED",
                Value = "News $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "NEWS_MODIFIED",
                Value = "News $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "NEWS_DELETE",
                Value = "News $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "NEWS_FORCE_DELETE",
                Value = "News $NAME successfully removed with force."
            });
            //MEDIA CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_CREATED",
                Value = "Directory $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_CREATED",
                Value = "Media $NAME successfully uploaded."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_DELETED",
                Value = "Directory $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_DELETED",
                Value = "Media $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_EDITED",
                Value = "Directory $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_EDITED",
                Value = "Media $NAME successfully modified."
            });
            //MODELS

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRE",
                Value = "Genre"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVAL",
                Value = "Festival"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTIST",
                Value = "Performer"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_NEWS",
                Value = "News"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRES",
                Value = "Genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVALs",
                Value = "Festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTISTS",
                Value = "Performers"
            });


            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORT",
                Value = "Report"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORTS",
                Value = "Reports"
            });
            //REPORT CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REPORT_CREATED",
                Value = "Report $NAME successfully created."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REPORT_MODIFIED",
                Value = "Report $NAME successfully modified."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REPORT_DELETE",
                Value = "Report $NAME successfully removed."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REPORT_FORCE_DELETE",
                Value = "Report $NAME successfully removed with force."
            });

            //MENU
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MENU_MY_ACCOUNT",
                Value = "My account"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MENU_SETTINGS",
                Value = "Settings"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MENU_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MENU_ARTISTS",
                Value = "Performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MENU_FESTIVALS",
                Value = "Festivals"
            });

            //BUTTONS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_CREATE",
                Value = "Create"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_ADD",
                Value = "Add new"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_EDIT",
                Value = "Edit"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_DELETE",
                Value = "Remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_FORCE_DELETE",
                Value = "Force remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_SAVE",
                Value = "Save"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_CANCEL",
                Value = "Cancel"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_PUBLISH",
                Value = "Publish"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "BTN_UNPUBLISH",
                Value = "Unpublish"
            });

            //MODAL
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKGENRES",
                Value = "Select genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKARTISTS",
                Value = "Select performers"
            });

            //FIELDS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_STARTDATE",
                Value = "Start date"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_ENDDATE",
                Value = "End date"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_COUNTRY",
                Value = "Country"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_NAME",
                Value = "Name"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_ZIP",
                Value = "Postal code"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_ADDRESS",
                Value = "Address & address number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_CITY",
                Value = "City"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_EMAIL",
                Value = "E-mail"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_PHONE",
                Value = "Phone number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_ARTISTS",
                Value = "Select performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES_LABEL",
                Value = "Select genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_DESCRIPTION",
                Value = "Description"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_INDOOROUTDOOR",
                Value = "Indoor / outdoor"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_STAGES",
                Value = "How many stages?"
            });

            //AUTH

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGIN",
                Value = "Sign in"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGOUT",
                Value = "Sign out"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOAUTH",
                Value = "You are not authorized to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOPERMISSION",
                Value = "You do not have the correct permissions to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "AUTH_TXT_ACTIVATE",
                Value = "An email has been sended to the address used by the registration. Please click on the activation link in the email to activate your account."
            });

            //ERRORS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is empty but required."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is not a valid $PATTERN_NAME."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "INTERNAL_ERROR",
                Value = "An internal server error has occured. Please try again later."
            });

            //REGISTRATION
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER",
                Value = "Register"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER_SUCCESS",
                Value = "Your registration was successfully received. An activation mail has been sended to the mail address used by the registration. Please click on the activation link to activate your account."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_USERNAME_EXISTS",
                Value = "The username you have chosen is not available."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "The email you have entered already exists."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "Your account has been blocked. Please check your mailbox for further information."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "UPLOAD",
                Value = "Upload"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_GENRES",
                Value = "Most popular genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_ARTISTS",
                Value = "Most popular performers"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_FESTIVALS",
                Value = "Most popular festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "OTHER",
                Value = "Other"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "RATING",
                Value = "Rating"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MY_GENRES",
                Value = "My genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MY_ARTISTS",
                Value = "My artists"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "MY_FESTIVALS",
                Value = "My festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH",
                Value = "Search"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_SUCCESS",
                Value = "$COUNT Festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_FAILURE",
                Value = "No festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_SUCCESS",
                Value = "$COUNT performers where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_FAILURE",
                Value = "No performers where found."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_SUCCESS",
                Value = "$COUNT genres where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "fr").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_FAILURE",
                Value = "No genres where found."
            });
        }

        //GERMAN
        public void SeedDETranslations()
        {
            //FESTIVAL CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_CREATED",
                Value = "Festival $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_MODIFIED",
                Value = "Festival $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_DELETE",
                Value = "Festival $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_FORCE_DELETE",
                Value = "Festival $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_EXISTS",
                Value = "Festival $NAME already exists on the same start date and country."
            });

            //ARTIST CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_CREATED",
                Value = "Performer $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_MODIFIED",
                Value = "Performer $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_DELETE",
                Value = "Performer $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_FORCE_DELETE",
                Value = "Performer $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_EXISTS",
                Value = "Performer $NAME already exists."
            });

            //GENRE CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "GENRE_CREATED",
                Value = "Genre $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "GENRE_MODIFIED",
                Value = "Genre $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "GENRE_DELETE",
                Value = "Genre $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "GENRE_FORCE_DELETE",
                Value = "Genre $NAME successfully removed with force."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "GENRE_EXISTS",
                Value = "Genre $NAME already exists."
            });

            //NEWS CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "NEWS_CREATED",
                Value = "News $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "NEWS_MODIFIED",
                Value = "News $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "NEWS_DELETE",
                Value = "News $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "NEWS_FORCE_DELETE",
                Value = "News $NAME successfully removed with force."
            });
            //MEDIA CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_CREATED",
                Value = "Directory $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_CREATED",
                Value = "Media $NAME successfully uploaded."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_DELETED",
                Value = "Directory $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_DELETED",
                Value = "Media $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_EDITED",
                Value = "Directory $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_EDITED",
                Value = "Media $NAME successfully modified."
            });
            //MODELS

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRE",
                Value = "Genre"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVAL",
                Value = "Festival"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTIST",
                Value = "Performer"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_NEWS",
                Value = "News"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRES",
                Value = "Genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVALs",
                Value = "Festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTISTS",
                Value = "Performers"
            });


            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORT",
                Value = "Report"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORTS",
                Value = "Reports"
            });
            //REPORT CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REPORT_CREATED",
                Value = "Report $NAME successfully created."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REPORT_MODIFIED",
                Value = "Report $NAME successfully modified."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REPORT_DELETE",
                Value = "Report $NAME successfully removed."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REPORT_FORCE_DELETE",
                Value = "Report $NAME successfully removed with force."
            });

            //MENU
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MENU_MY_ACCOUNT",
                Value = "My account"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MENU_SETTINGS",
                Value = "Settings"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MENU_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MENU_ARTISTS",
                Value = "Performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MENU_FESTIVALS",
                Value = "Festivals"
            });

            //BUTTONS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_CREATE",
                Value = "Create"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_ADD",
                Value = "Add new"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_EDIT",
                Value = "Edit"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_DELETE",
                Value = "Remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_FORCE_DELETE",
                Value = "Force remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_SAVE",
                Value = "Save"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_CANCEL",
                Value = "Cancel"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_PUBLISH",
                Value = "Publish"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "BTN_UNPUBLISH",
                Value = "Unpublish"
            });

            //MODAL
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKGENRES",
                Value = "Select genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKARTISTS",
                Value = "Select performers"
            });

            //FIELDS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_STARTDATE",
                Value = "Start date"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_ENDDATE",
                Value = "End date"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_COUNTRY",
                Value = "Country"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_NAME",
                Value = "Name"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_ZIP",
                Value = "Postal code"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_ADDRESS",
                Value = "Address & address number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_CITY",
                Value = "City"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_EMAIL",
                Value = "E-mail"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_PHONE",
                Value = "Phone number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_ARTISTS",
                Value = "Select performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES_LABEL",
                Value = "Select genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_DESCRIPTION",
                Value = "Description"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_INDOOROUTDOOR",
                Value = "Indoor / outdoor"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_STAGES",
                Value = "How many stages?"
            });

            //AUTH

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGIN",
                Value = "Sign in"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGOUT",
                Value = "Sign out"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOAUTH",
                Value = "You are not authorized to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOPERMISSION",
                Value = "You do not have the correct permissions to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "AUTH_TXT_ACTIVATE",
                Value = "An email has been sended to the address used by the registration. Please click on the activation link in the email to activate your account."
            });

            //ERRORS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is empty but required."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is not a valid $PATTERN_NAME."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "INTERNAL_ERROR",
                Value = "An internal server error has occured. Please try again later."
            });

            //REGISTRATION
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER",
                Value = "Register"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER_SUCCESS",
                Value = "Your registration was successfully received. An activation mail has been sended to the mail address used by the registration. Please click on the activation link to activate your account."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_USERNAME_EXISTS",
                Value = "The username you have chosen is not available."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "The email you have entered already exists."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "Your account has been blocked. Please check your mailbox for further information."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "UPLOAD",
                Value = "Upload"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_GENRES",
                Value = "Most popular genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_ARTISTS",
                Value = "Most popular performers"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_FESTIVALS",
                Value = "Most popular festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "OTHER",
                Value = "Other"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "RATING",
                Value = "Rating"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MY_GENRES",
                Value = "My genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MY_ARTISTS",
                Value = "My artists"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "MY_FESTIVALS",
                Value = "My festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH",
                Value = "Search"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_SUCCESS",
                Value = "$COUNT Festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_FAILURE",
                Value = "No festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_SUCCESS",
                Value = "$COUNT performers where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_FAILURE",
                Value = "No performers where found."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_SUCCESS",
                Value = "$COUNT genres where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "de").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_FAILURE",
                Value = "No genres where found."
            });
        }

        //SPANISH
        public void SeedESTranslations()
        {
            //FESTIVAL CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_CREATED",
                Value = "Festival $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_MODIFIED",
                Value = "Festival $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_DELETE",
                Value = "Festival $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_FORCE_DELETE",
                Value = "Festival $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_EXISTS",
                Value = "Festival $NAME already exists on the same start date and country."
            });

            //ARTIST CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_CREATED",
                Value = "Performer $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_MODIFIED",
                Value = "Performer $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_DELETE",
                Value = "Performer $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_FORCE_DELETE",
                Value = "Performer $NAME successfully removed with force."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_EXISTS",
                Value = "Performer $NAME already exists."
            });

            //GENRE CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "GENRE_CREATED",
                Value = "Genre $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "GENRE_MODIFIED",
                Value = "Genre $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "GENRE_DELETE",
                Value = "Genre $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "GENRE_FORCE_DELETE",
                Value = "Genre $NAME successfully removed with force."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "GENRE_EXISTS",
                Value = "Genre $NAME already exists."
            });

            //NEWS CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "NEWS_CREATED",
                Value = "News $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "NEWS_MODIFIED",
                Value = "News $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "NEWS_DELETE",
                Value = "News $NAME successfully removed."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "NEWS_FORCE_DELETE",
                Value = "News $NAME successfully removed with force."
            });
            //MEDIA CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_CREATED",
                Value = "Directory $NAME successfully created."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_CREATED",
                Value = "Media $NAME successfully uploaded."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_DELETED",
                Value = "Directory $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_DELETED",
                Value = "Media $NAME successfully deleted."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_EDITED",
                Value = "Directory $NAME successfully modified."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_EDITED",
                Value = "Media $NAME successfully modified."
            });
            //MODELS

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRE",
                Value = "Genre"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVAL",
                Value = "Festival"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTIST",
                Value = "Performer"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_NEWS",
                Value = "News"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRES",
                Value = "Genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVALs",
                Value = "Festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTISTS",
                Value = "Performers"
            });


            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORT",
                Value = "Report"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORTS",
                Value = "Reports"
            });
            //REPORT CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REPORT_CREATED",
                Value = "Report $NAME successfully created."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REPORT_MODIFIED",
                Value = "Report $NAME successfully modified."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REPORT_DELETE",
                Value = "Report $NAME successfully removed."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REPORT_FORCE_DELETE",
                Value = "Report $NAME successfully removed with force."
            });

            //MENU
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MENU_MY_ACCOUNT",
                Value = "My account"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MENU_SETTINGS",
                Value = "Settings"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MENU_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MENU_ARTISTS",
                Value = "Performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MENU_FESTIVALS",
                Value = "Festivals"
            });

            //BUTTONS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_CREATE",
                Value = "Create"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_ADD",
                Value = "Add new"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_EDIT",
                Value = "Edit"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_DELETE",
                Value = "Remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_FORCE_DELETE",
                Value = "Force remove"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_SAVE",
                Value = "Save"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_CANCEL",
                Value = "Cancel"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_PUBLISH",
                Value = "Publish"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "BTN_UNPUBLISH",
                Value = "Unpublish"
            });

            //MODAL
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKGENRES",
                Value = "Select genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKARTISTS",
                Value = "Select performers"
            });

            //FIELDS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_STARTDATE",
                Value = "Start date"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_ENDDATE",
                Value = "End date"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_COUNTRY",
                Value = "Country"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_NAME",
                Value = "Name"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_ZIP",
                Value = "Postal code"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_ADDRESS",
                Value = "Address & address number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_CITY",
                Value = "City"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_EMAIL",
                Value = "E-mail"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_PHONE",
                Value = "Phone number"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_ARTISTS",
                Value = "Select performers"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES_LABEL",
                Value = "Select genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_DESCRIPTION",
                Value = "Description"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_INDOOROUTDOOR",
                Value = "Indoor / outdoor"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_STAGES",
                Value = "How many stages?"
            });

            //AUTH

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGIN",
                Value = "Sign in"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGOUT",
                Value = "Sign out"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOAUTH",
                Value = "You are not authorized to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOPERMISSION",
                Value = "You do not have the correct permissions to perform this action."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "AUTH_TXT_ACTIVATE",
                Value = "An email has been sended to the address used by the registration. Please click on the activation link in the email to activate your account."
            });

            //ERRORS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is empty but required."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "The field $NAME is not a valid $PATTERN_NAME."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "INTERNAL_ERROR",
                Value = "An internal server error has occured. Please try again later."
            });

            //REGISTRATION
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER",
                Value = "Register"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER_SUCCESS",
                Value = "Your registration was successfully received. An activation mail has been sended to the mail address used by the registration. Please click on the activation link to activate your account."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_USERNAME_EXISTS",
                Value = "The username you have chosen is not available."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "The email you have entered already exists."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "Your account has been blocked. Please check your mailbox for further information."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "UPLOAD",
                Value = "Upload"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_GENRES",
                Value = "Most popular genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_ARTISTS",
                Value = "Most popular performers"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_FESTIVALS",
                Value = "Most popular festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "OTHER",
                Value = "Other"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "RATING",
                Value = "Rating"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MY_GENRES",
                Value = "My genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MY_ARTISTS",
                Value = "My artists"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "MY_FESTIVALS",
                Value = "My festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH",
                Value = "Search"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_SUCCESS",
                Value = "$COUNT Festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_FAILURE",
                Value = "No festivals where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_SUCCESS",
                Value = "$COUNT performers where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_FAILURE",
                Value = "No performers where found."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_SUCCESS",
                Value = "$COUNT genres where found."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "es").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_FAILURE",
                Value = "No genres where found."
            });
        }

        //DUTCH
        public void SeedNLTranslations()
        {
            //FESTIVAL CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_CREATED",
                Value = "Festival $NAME is succesvol toegevoegd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_MODIFIED",
                Value = "Festival $NAME is succesvol aangepast."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_DELETE",
                Value = "Festival $NAME is succesvol verwijderd."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_FORCE_DELETE",
                Value = "Festival $NAME is succesvol geforceerd verwijderd."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FESTIVAL_EXISTS",
                Value = "Festival $NAME bestaat al en kan niet nogmaals toegevoegd worden."
            });

            //ARTIST CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_CREATED",
                Value = "Artiest $NAME is succesvol toegevoegd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_MODIFIED",
                Value = "Artiest $NAME is succesvol aangepast."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_DELETE",
                Value = "Artiest $NAME is succesvol verwijderd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_FORCE_DELETE",
                Value = "Artiest $NAME is succesvol geforceerd verwijderd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "ARTIST_EXISTS",
                Value = "Artiest $NAME bestaat al en kan niet nogmaals toegevoegd worden."
            });

            //GENRE CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "GENRE_CREATED",
                Value = "Genre $NAME is succesvol toegevoegd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "GENRE_MODIFIED",
                Value = "Genre $NAME is succesvol aangepast."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "GENRE_DELETE",
                Value = "Genre $NAME is succesvol verwijderd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "GENRE_FORCE_DELETE",
                Value = "Genre $NAME is succesvol geforceerd verwijderd."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "GENRE_EXISTS",
                Value = "Genre $NAME bestaat al en kan niet nogmaals toegevoegd worden."
            });

            //NEWS CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "NEWS_CREATED",
                Value = "Niewsbericht $NAME is succesvol toegevoegd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "NEWS_MODIFIED",
                Value = "Niewsbericht $NAME is succesvol aangepast."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "NEWS_DELETE",
                Value = "Nieuwsbericht $NAME is succesvol verwijderd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "NEWS_FORCE_DELETE",
                Value = "Nieuwsbericht $NAME is succesvol geforceerd verwijderd."
            });
            //MEDIA CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_CREATED",
                Value = "Map $NAME is succesvol toegevoegd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_CREATED",
                Value = "Media $NAME is succesvol geplaatst."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_DELETED",
                Value = "Map $NAME is succesvol verwijderd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_DELETED",
                Value = "Media $NAME is succesvol verwijderd."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_DIR_EDITED",
                Value = "Map $NAME is succesvol aangepast."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MEDIA_ITEM_EDITED",
                Value = "Media $NAME is succesvol aangepast."
            });
            //MODELS

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRE",
                Value = "Genre"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVAL",
                Value = "Festival"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTIST",
                Value = "Artiest"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_NEWS",
                Value = "Nieuws"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_GENRES",
                Value = "Genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_FESTIVALs",
                Value = "Festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_ARTISTS",
                Value = "Artiesten"
            });


            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORT",
                Value = "Reportage"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOD_REPORTS",
                Value = "Reportages"
            });
            //REPORT CRUD
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REPORT_CREATED",
                Value = "Reportage $NAME is succesvol toegevoegd."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REPORT_MODIFIED",
                Value = "Reportage $NAME is succesvol aangepast."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REPORT_DELETE",
                Value = "Reportage $NAME is succesvol verwijderd."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REPORT_FORCE_DELETE",
                Value = "Reportage $NAME is succesvol geforceerd verwijderd."
            });

            //MENU
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MENU_MY_ACCOUNT",
                Value = "My account"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MENU_SETTINGS",
                Value = "Instellingen"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MENU_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MENU_ARTISTS",
                Value = "Artiesten"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MENU_FESTIVALS",
                Value = "Festivals"
            });

            //BUTTONS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_CREATE",
                Value = "Aanmaken"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_ADD",
                Value = "Toevoegen"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_EDIT",
                Value = "Bewerken"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_DELETE",
                Value = "Verwijderen"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_FORCE_DELETE",
                Value = "Geforceerd verwijderen"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_SAVE",
                Value = "Opslaan"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_CANCEL",
                Value = "Annuleren"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_PUBLISH",
                Value = "Publiceren"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "BTN_UNPUBLISH",
                Value = "Unpublish"
            });

            //MODAL
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKGENRES",
                Value = "Selecteer genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MODAL_PICKARTISTS",
                Value = "Selecteer artiesten"
            });

            //FIELDS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_STARTDATE",
                Value = "Startdatum"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_ENDDATE",
                Value = "Einddatum"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_COUNTRY",
                Value = "Land"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_NAME",
                Value = "Naam"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_ZIP",
                Value = "Postcode"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_ADDRESS",
                Value = "Adres en huisnummer"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_CITY",
                Value = "Plaats"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_EMAIL",
                Value = "E-mail"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_PHONE",
                Value = "Telefoon"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_ARTISTS",
                Value = "Selecteer artiesten"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES_LABEL",
                Value = "Selecteer genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_GENRES",
                Value = "Genres"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_DESCRIPTION",
                Value = "Omschrijving"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_INDOOROUTDOOR",
                Value = "Indoor / outdoor"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_STAGES",
                Value = "Hoeveel podia?"
            });

            //AUTH

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGIN",
                Value = "Aanmelden"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "AUTH_LOGOUT",
                Value = "Afmelden"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOAUTH",
                Value = "U bent niet aangemeld en daarom kunt u deze actie niet uitvoeren."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "AUTH_NOPERMISSION",
                Value = "U beschikt niet over de juiste rechten om deze actie uit te voeren."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "AUTH_TXT_ACTIVATE",
                Value = "Bedankt voor uw registratie! Er is een e-mail verzonden met een activatielink. Klik op deze link om uw account te activeren."
            });

            //ERRORS
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "Het veld $NAME is leeg maar is verplicht."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "FLD_MSG_REQUIRED",
                Value = "Het veld $NAME is geen geldig $PATTERN_NAME."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "INTERNAL_ERROR",
                Value = "Er is een interne fout opgetreden. Probeer het later nog eens."
            });

            //REGISTRATION
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER",
                Value = "Registreren"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "LBL_REGISTER_SUCCESS",
                Value = "Uw registratie is succesvol ontvangen. Er is een e-email verzonden met een activatielink. Klik op deze actievatielink om uw account te activeren."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_USERNAME_EXISTS",
                Value = "De door uw gekozen gebruikersnaam is al in gebruik."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "De door uw gekozen e-mail adres is al in gebruik."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "REG_MSG_EMAIL_EXISTS",
                Value = "Uw account is geblokkeerd. Hierover hebben wij u meer informatie per e-mail toegezonden."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "UPLOAD",
                Value = "Upload"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_GENRES",
                Value = "Meest populaire genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_ARTISTS",
                Value = "Meest populaire artiesten"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MOST_POPULAR_FESTIVALS",
                Value = "Meest populaire festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "OTHER",
                Value = "Overige"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "RATING",
                Value = "Waardering"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MY_GENRES",
                Value = "Mijn genres"
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MY_ARTISTS",
                Value = "Mijn artiesten"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "MY_FESTIVALS",
                Value = "Mijn festivals"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH",
                Value = "Zoeken"
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_SUCCESS",
                Value = "Er zijn $COUNT festivals gevonden."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_FESTIVAL_FAILURE",
                Value = "Er zijn geen festivals gevonden."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_SUCCESS",
                Value = "Er zijn $COUNT artiesten gevonden."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_ARTIST_FAILURE",
                Value = "Er zijn geen artiesten gevonden."
            });
            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_SUCCESS",
                Value = "Er zijn $COUNT genres gevonden."
            });

            Db.Translations.Add(new Translation
            {
                TranslationID = Guid.NewGuid(),
                LanguageID = Db.Languages.Where(w => w.TwoLetterLangName == "nl").FirstOrDefault().LanguageID,
                TransKey = "SEARCH_GENRES_FAILURE",
                Value = "Er zijn geen genres gevonden."
            });
        }
    }
}

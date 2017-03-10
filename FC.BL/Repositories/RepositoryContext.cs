using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class RepositoryContext
    {
        private  static RepositoryContext inst { get; set; }
        public static RepositoryContext GetInstance()
        {
            if(RepositoryContext.inst == null)
            {
                inst = new RepositoryContext();
            }
            return inst;
        }

        private ArtistRepository _artists { get; set; }
        public ArtistRepository Artists
        {
            get
            {
                if (_artists == null)
                {
                    _artists = new ArtistRepository();
                }
                return _artists;
            }
        }

        private  AdvertisementRepository _advertisement { get; set; }
        public  AdvertisementRepository Advertisement
        {
            get
            {
                if (_advertisement == null)
                {
                    _advertisement = new AdvertisementRepository();
                }
                return _advertisement;
            }
        }

        private  AuthorizationRepository _Auth { get; set; }
        public  AuthorizationRepository Auth {
            get
            {
                if (_Auth == null)
                {
                    _Auth = AuthorizationRepository.Current;
                }
                return _Auth;
            }
        }

        
        private  CountryRepository _Countries { get; set; }
        public  CountryRepository Countries {
            get {
                if(_Countries == null)
                {
                    _Countries = new CountryRepository();
                }
                return _Countries;
            }
        }
        
        private  FestivalRepository _festivals { get; set; }
        public  FestivalRepository Festivals
        {
            get
            {
                if (_festivals == null)
                {
                    _festivals = new FestivalRepository();
                    return _festivals;
                }
                else
                {
                    return _festivals;
                }
            }
        }

        private  GenericMessageRepository _gmr { get; set; }
        public  GenericMessageRepository GenericMessages {
            get
            {
                if(_gmr == null)
                {
                    _gmr = new GenericMessageRepository();
                }
                return _gmr;
            }
        }

        private  GenreRespository _gr { get; set; }
        public  GenreRespository Genres
        {
            get
            {
                if (_gr == null)
                {
                    _gr = new GenreRespository();
                    return _gr;
                }
                else
                {
                    return _gr;
                }
            }
        }

        private  LineupRepository _linupRepo { get; set; }
        public  LineupRepository LineUps
        {
            get
            {
                if (_linupRepo == null)
                {
                    _linupRepo = new LineupRepository();
                }
                return _linupRepo;
            }
        }

        private  LocationRepository _locations { get; set; }
        public  LocationRepository Locations
        {
            get
            {
                if (_locations == null)
                {
                    _locations = new LocationRepository();
                }
                return _locations;
            }
        }

        private  MediaRepository _media { get; set; }
        public  MediaRepository Media
        {
            get
            {
                if (_media == null)
                {
                    _media = new MediaRepository();
                }
                return _media;
            }
        }

        private  NewsRepository _news { get; set; }
        public  NewsRepository News
        {
            get
            {
                if (_news == null)
                {
                    _news = new NewsRepository();
                }
                return _news;
            }
        }

        private  ProductRepository _products { get; set; }
        public  ProductRepository Products
        {
            get
            {
                if (_products == null)
                {
                    _products = new ProductRepository();
                }
                return _products;
            }
        }

        private  PublishRepository _publish { get; set; }
        public  PublishRepository Publish
        {
            get
            {
                if (_publish == null)
                {
                    _publish = new PublishRepository();
                }
                return _publish;
            }
        }

        private  RatingRepository _rating { get; set; }
        public  RatingRepository Rating
        {
            get
            {
                if (_rating == null)
                {
                    _rating = new RatingRepository();
                }
                return _rating;
            }
        }

        private  ResellerGenreRepository _rg { get; set; }
        public  ResellerGenreRepository ResellerGenres
        {
            get
            {
                if (_rg == null)
                {
                    _rg = new ResellerGenreRepository();
                }
                return _rg;
            }
        }

        private  ResellerRepository _resellers { get; set; }
        public  ResellerRepository Resellers
        {
            get
            {
                if (_resellers == null)
                {
                    _resellers = new ResellerRepository();
                }
                return _resellers;
            }
        }

        private ResellerTypeRepository _rt { get; set; }
        public ResellerTypeRepository ResellerTypes
        {
            get
            {
                if (_rt == null)
                {
                    _rt = new ResellerTypeRepository();
                }
                return _rt;
            }
        }

        private RoleRepository _roles { get; set; }
        public RoleRepository Roles
        {
            get
            {
                if (_roles == null)
                {
                    _roles = new RoleRepository();
                }
                return _roles;
            }
        }

        private StageRepository _stages { get; set; }
        public  StageRepository Stages
        {
            get
            {
                if (_stages == null)
                {
                    _stages = new StageRepository();
                }
                return _stages;
            }
        }

        private  TicketRepository _tickets { get; set; }
        public  TicketRepository Tickets
        {
            get
            {
                if (_tickets == null)
                {
                    _tickets = new TicketRepository();
                }
                return _tickets;
            }
        }

        private FavoriteRepository _fav { get; set; }
        public FavoriteRepository Favorites
        {
            get
            {
                if (_fav == null)
                {
                    _fav = new FavoriteRepository();
                }
                return _fav;
            }
        }

        private MenuRepository _menu { get; set; }
        public MenuRepository Menu
        {
            get
            {
                if (_menu == null) { 
                    MenuRepository _menu = new MenuRepository();
                }
                return _menu;
            }
        }


        //private  GenreRespository _gr { get; set; }
        //public  GenreRespository Genres
        //{
        //    get
        //    {
        //        if (_gr == null)
        //        {
        //            _gr = new GenreRespository();
        //            return _gr;
        //        }
        //        else
        //        {
        //            return _gr;
        //        }
        //    }
        //}

    }
}

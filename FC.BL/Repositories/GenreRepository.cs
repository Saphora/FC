using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class GenreRepository : BaseRepository
    {
        public IQueryable<UGenre> GetAll()
        {
            return Db.Genres.OrderBy(o => o.Name);
        }
    }
}

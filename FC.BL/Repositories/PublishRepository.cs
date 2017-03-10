using FC.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace FC.BL.Repositories
{
    public class PublishRepository : BaseRepository
    {
        public bool Publish<T>(T obj) where T : class, IBaseModel
        {
            try
            {
                obj.IsPublished = true;

                Db.Entry<T>(obj).State = System.Data.Entity.EntityState.Modified;
                Db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }
    }
}

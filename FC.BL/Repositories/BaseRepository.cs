using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.PGDAL.PGModel;
using System.Data.Entity.Validation;
using FC.Shared.Entities;
using FC.BL.Validation;
using System.Data.Entity;
using Npgsql;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using FC.Interfaces.Data;

namespace FC.BL.Repositories
{
    public abstract class BaseRepository: IDisposable {

        public int PageCount { get; set; }
        
        public decimal GetPageCount<T>(string dbSetName, int size) where T: class,IBaseModel
        {
            using (Db = new ContentModel())
            {
                IQueryable<T> dbset = (IQueryable<T>)this.Db.GetType().GetProperty(dbSetName).GetValue(this.Db);
                Decimal d = new Decimal((float)dbset.Where(w => w.IsDeleted == false).Count() / (float)size);
                return Math.Ceiling(d) - 1;
            }
        }

        public virtual List<T> GetPaged<T>(int size, int page, string dbSetName) where T : class, IBaseModel
        {
            using (Db = new ContentModel())
            {
                IQueryable<T> dbset = (IQueryable<T>)this.Db.GetType().GetProperty(dbSetName).GetValue(this.Db);
                List<T> result = new List<T>();
                int from = 0;
                if (page == 1)
                {
                    from = 0;
                }
                else if (page > 1 && page <= GetPageCount<T>(dbSetName, size))
                {
                    from = size * page - 1;
                }
                result = dbset.Where(w => w.IsDeleted == false).OrderBy(o => o.Name).Skip(from).Take(size).ToList();
                return result;
            }
        }

        public virtual IQueryable<T> GetPagedQueryable<T>(int size, int page, string dbSetName) where T : class, IBaseModel
        {
            using (this.Db = new ContentModel())
            {
                this.Db = new ContentModel();
                IQueryable<T> dbset = (IQueryable<T>)this.Db.GetType().GetProperty(dbSetName).GetValue(this.Db);
                IQueryable<T> result;
                int from = 0;
                if (page == 1)
                {
                    from = 0;
                }
                else if (page > 1 && page <= GetPageCount<T>(dbSetName, size))
                {
                    from = size * page - 1;
                }
                result = dbset.Where(w => w.IsDeleted == false).OrderBy(o => o.CreatedDate).Skip(from).Take(size);
                return result;
            }
        }

        public virtual List<T> GetSorted<T>(string dbSetName, string search = "0-9", int page = 1) where T : class, IBaseModel
        {
            IQueryable<T> dbset = (IQueryable<T>)this.Db.GetType().GetProperty(dbSetName).GetValue(this.Db);
            List<T> result = new List<T>();
            if (search == "0-9")
            {
                result = dbset.Where(w => w.IsDeleted == false && ( w.Name.StartsWith("0") ||
                 w.Name.StartsWith("0") ||
                 w.Name.StartsWith("1") ||
                 w.Name.StartsWith("2") ||
                 w.Name.StartsWith("3") ||
                 w.Name.StartsWith("4") ||
                 w.Name.StartsWith("5") ||
                 w.Name.StartsWith("6") ||
                 w.Name.StartsWith("7") ||
                 w.Name.StartsWith("8") ||
                 w.Name.StartsWith("9") || w.Name.StartsWith("a") || w.Name.StartsWith("A"))).OrderBy(o => o.Name).Take(50 * page).ToList();
                return result;
            }
            else
            {
                if (search != null)
                {
                    search = search.First().ToString().ToUpper() + search.Substring(1);
                }
                else
                {
                    search = "0-9";
                }
            }
            return dbset.Where(w => w.Name.StartsWith(search) && w.IsDeleted ==false).Take(50 * page).ToList();
        }

        public int GetPagedCount<T>(string dbSetName, int page, string search) where T: class,IBaseModel
        {
            IQueryable<T> dbset = (IQueryable<T>)this.Db.GetType().GetProperty(dbSetName).GetValue(this.Db);
            int result = 0;
            if (search == "0-9")
            {
                IQueryable<T> tmp = dbset.Where(w => w.IsDeleted == false && (w.Name.StartsWith("0") ||
                 w.Name.StartsWith("0") ||
                 w.Name.StartsWith("1") ||
                 w.Name.StartsWith("2") ||
                 w.Name.StartsWith("3") ||
                 w.Name.StartsWith("4") ||
                 w.Name.StartsWith("5") ||
                 w.Name.StartsWith("6") ||
                 w.Name.StartsWith("7") ||
                 w.Name.StartsWith("8") ||
                 w.Name.StartsWith("9") || w.Name.StartsWith("a") || w.Name.StartsWith("A"))).OrderBy(o => o.Name).Take(50 * page);
                tmp = tmp.Skip((page - 1) * 50).Take(50);
                result = tmp.Count();
                return result;
            }
            else
            {
                if (search != null)
                {
                    search = search.First().ToString().ToUpper() + search.Substring(1);
                    result = dbset.Where(w =>w.IsDeleted ==false &&  w.Name.StartsWith(search)).OrderBy(o => o.Name).Skip((page - 1) * 50).Take(50).Count();
                    return result;
                }
                else
                {
                    return 0;
                }
            }
        }

        protected virtual ContentModel Db { get; set; }
       
        public RepositoryState Status { get; set; }

        public RepositoryState ExecuteCommand(string command, List<NpgsqlParameter> parameters=null, string successText = "Action successfully executed.", string failureText = "Internal server error. Please try again later.")
        {
            try
            {
                using (Npgsql.NpgsqlConnection connection = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["ContentModel"].ConnectionString))
                {

                    NpgsqlCommand cmd = new NpgsqlCommand(command);
                    if (parameters != null)
                    {
                        cmd.Parameters.AddRange(parameters.ToArray());
                    }
                    cmd.ExecuteNonQuery();
                    cmd.CommandType = CommandType.StoredProcedure;

                    return new RepositoryState { SUCCESS = true, MSG = successText };
                }
            }
            catch (NpgsqlException ex)
            {
                return this.HandleException(ex, failureText);
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, failureText);
            }
        }

        public IEnumerable<T> GetData<T>(IDataReader reader, Func<IDataRecord, T> BuildObject)
        {
            try
            {
                while (reader.Read())
                {
                    yield return BuildObject(reader);
                }
            }
            finally
            {
                reader.Dispose();
            }
        }
        
        //public List<T> ExecuteReader<T>(string command, List<NpgsqlParameter> parameters = null, string successText = "Action successfully executed.", string failureText = "Internal server error. Please try again later.") where T:IMaterialized
        //{
        //    try
        //    {
        //        T obj = Activator.CreateInstance<T>();
        //        Npgsql.NpgsqlConnection connection = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["ContentModel"].ConnectionString);
        //        //{
        //        connection.Open();
        //        NpgsqlCommand cmd = new NpgsqlCommand(command,connection);
        //        cmd.CommandType = CommandType.StoredProcedure;

        //        if (parameters != null)
        //        {
        //            cmd.Parameters.AddRange(parameters.ToArray());
        //        }

        //        NpgsqlDataReader reader = cmd.ExecuteReader();
        //        return this.GetData<T>(reader, obj.Create)
        //        connection.Close();
        //        return reader;
        //        //}
        //    }
        //    catch (NpgsqlException ex)
        //    {
        //        return this.HandleException<NpgsqlDataReader> (ex,null);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.HandleException<NpgsqlDataReader>(ex, null);
        //    }
        //}

        public BaseRepository()
        {
        }


        public RepositoryState HandleException(Exception ex)
        {
            using (Db = new ContentModel())
            {
                GenericMessage msg = new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError);
                if(AuthorizationRepository.Current.CurrentUser != null)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                Db.GenericMessages.Add(msg);
                Db.SaveChanges();
            }
            return new RepositoryState() { MSG = ex.Message};
        }

        public RepositoryState HandleException(DbEntityValidationException ex)
        {
            using (Db = new ContentModel())
            {
                GenericMessage msg = new Shared.Entities.GenericMessage(ex, GenericMessageStatus.DBError);
                if (AuthorizationRepository.Current.CurrentUser != null)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                Db.GenericMessages.Add(msg);
                Db.SaveChanges();
            }
            return new RepositoryState() { DBERROR = true };
        }

        public RepositoryState HandleException(ArgumentNullException ex)
        {
            using (Db = new ContentModel())
            {
                GenericMessage msg = new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError);
                if (AuthorizationRepository.Current.CurrentUser != null)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                Db.GenericMessages.Add(msg);
                Db.SaveChanges();
            }
            return new RepositoryState();
        }


        public RepositoryState HandleException(Exception ex, string msgTxt)
        {

            using (Db = new ContentModel())
            {
                GenericMessage msg = new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError);
                if (AuthorizationRepository.Current.CurrentUser != null)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                Db.GenericMessages.Add(msg);
                Db.SaveChanges();
            }
            return new RepositoryState() { ERROR = true, MSG = msgTxt };
        }

        public RepositoryState HandleException(DbEntityValidationException ex, string msgTxt)
        {
            using (Db = new ContentModel())
            {
                GenericMessage msg = new Shared.Entities.GenericMessage(ex, GenericMessageStatus.DBError);
                if (AuthorizationRepository.Current.CurrentUser != null)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                Db.GenericMessages.Add(msg);
                Db.SaveChanges();
            }
            return new RepositoryState() { DBERROR = true, MSG=msgTxt };
        }

        public RepositoryState HandleException(ArgumentNullException ex, string msgTxt)
        {
            using (Db = new ContentModel())
            {
                GenericMessage msg = new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError);
                if (AuthorizationRepository.Current.CurrentUser != null)
                {
                    msg.UserID = AuthorizationRepository.Current.CurrentUser.UserID;
                }
                Db.GenericMessages.Add(msg);
                Db.SaveChanges();
            }
            return new RepositoryState() { ERROR = true, MSG = msgTxt };
        }

        public List<IValidationError> Validate<T>(T model)
        {
            Validator v = new Validator();
            return v.ValidateModel<T>(model);
        }

        public RepositoryState HandleValidationErrors(List<IValidationError> errors)
        {
            RepositoryState result = new RepositoryState();
            result.INVALID = true;
            result.SUCCESS = false;
            result.MSG = "";
            result.ValidationErrors = errors;
            foreach (IValidationError error in errors)
            {
                result.MSG += string.Format("{0}",error.Message);
            }
            return result;
        }




        public T HandleException<T>(Exception ex, T result)
        {
            using (Db = new ContentModel())
            {
                Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError));
                Db.SaveChanges();
            }
            return result;
        }

        public T HandleException<T>(DbEntityValidationException ex,T result)
        {

            using (Db = new ContentModel())
            {
                Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.DBError));
                Db.SaveChanges();
                return result;
            }
        }

        public T HandleException<T>(ArgumentNullException ex, T result)
        {
            using (Db = new ContentModel())
            {
                Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError));
                Db.SaveChanges();
                return result;
            }
        }


        public T HandleException<T>(DbEntityValidationException ex, string msg, T result)
        {
            using (Db = new ContentModel())
            {
                Db = new ContentModel();
                Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.DBError));
                Db.SaveChanges();
                return result;
            }
        }

        public T HandleException<T>(ArgumentNullException ex, string msg, T result)
        {
            using (Db = new ContentModel())
            {
                Db = new ContentModel();
                Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.GenericError));
                Db.SaveChanges();
                return result;
            }
        }
        public T HandleException<T>(NpgsqlException ex, string msg, T result)
        {
            using (Db = new ContentModel())
            {
                Db = new ContentModel();
                Db.GenericMessages.Add(new Shared.Entities.GenericMessage(ex, GenericMessageStatus.DBError));
                Db.SaveChanges();
                return result;
            }
        }

        public void Dispose()
        {
            this.Db.Dispose();
        }
    }
}

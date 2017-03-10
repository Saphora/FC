using FC.BL.Validation;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace $safeprojectname%
{
    public class $itemname$Repository : BaseRepository
    {
        public $itemname$() : base()
        { }

        public List<$itemname$> GetAll()
        {
            throw new NotImplementedException();
        }

		public $itemname$ GetByID(Guid? id)
        {
            throw new NotImplementedException();
        }

        public RepositoryState Create($itemname$ model)
        {
            try
            {
                
                List<ValidationError> errors = this.Validate<$itemname$> (t);
                if (errors.Count == 0)
                {

                    throw new NotImplementedException();
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }

            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot create $itemname$ {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot create $itemname$ {model.Name}. Please try again later.");
            }
        }

        public RepositoryState Update($itemname$ model)
        {
            try
            {

                List<$itemname$> errors = this.Validate<$itemname$> (t);
                if (errors.Count == 0)
                {

                    throw new NotImplementedException();
                }
                else
                {
                    return this.HandleValidationErrors(errors);
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot modify $itemname$ {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot modify $itemname$ {model.Name}. Please try again later.");
            }
        }


        public RepositoryState Delete($itemname$ model)
        {
            try
            {
                throw new NotImplementedException();

                return new RepositoryState() { SUCCESS = true, MSG = $"$itemname$ {model.Name} successfully removed." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot remove $itemname$ {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot remove $itemname$ {model.Name}. Please try again later.");
            }
        }

        public RepositoryState ForceDelete($itemname$ model)
        {
            try
            {
                throw new NotImplementedException();
                return new RepositoryState() { SUCCESS = true, MSG = $"$itemname$ {model.Name} successfully removed with force." };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, $"Cannot force remove $itemname$ {model.Name}. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, $"Cannot force remove $itemname$ {model.Name}. Please try again later.");
            }
        }
    }
}

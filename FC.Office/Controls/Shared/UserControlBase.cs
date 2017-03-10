using FC.BL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace FC.Office.Controls.Shared
{

    /// <summary>
    /// Create new user control instance with default model type.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class UserControlBase<T> : UserControl
    {
        public abstract T Context { get; set; }
        public abstract event EventHandler<T> SaveSuccess;
        public abstract event EventHandler<T> SaveFailure;
        public abstract void Refresh();
        public RepositoryContext repositories { get; set; }

        public UserControlBase() 
        {
            Context = Activator.CreateInstance<T>();
            this.repositories = RepositoryContext.GetInstance();
        }        
    }
}

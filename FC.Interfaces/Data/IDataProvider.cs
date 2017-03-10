using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Data
{
    public interface IDataProvider
    {
        void OpenConnection();
        void CloseConnection();

        IEnumerable<T> RunReadProcedure<T>(string readProcedure, SqlParameter[] paramColl);
        IEnumerable<T> RunReadProcedure<T>(string readProcedure);

        void RunDeleteProcedure(string deleteProcedure, SqlParameter[] paramColl);
    }
}

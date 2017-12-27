using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.AdoConnection
{
    public class AdoBase
    {
        protected string _conStr;
        
        public AdoBase() { }
        public AdoBase(string connectionString)
        {
            this._conStr = connectionString;
            Connection.SetConnectionString(connectionString);
        }
        protected void SetConnectionString(string connectionString)
        {
            this._conStr = connectionString;
            Connection.SetConnectionString(connectionString);
        }

        protected SqlConnection GetConnection()
        {
            return Connection.GetConnection();
        }
    }
}

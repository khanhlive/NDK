using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.AdoConnection
{
    public class Connection
    {
        private static string conStr;
        private static SqlConnection sqlConnection;
        public static void SetConnectionString(string connectionString)
        {
            Connection.conStr = connectionString;
        }
        public static SqlConnection GetConnection()
        {
            if (string.IsNullOrEmpty(Connection.conStr)||string.IsNullOrWhiteSpace(Connection.conStr))
            {
                throw new Exception("ConnectionString is null or empty");
            }
            else
            {
                if (Connection.sqlConnection==null)
                {
                    Connection.sqlConnection = new SqlConnection(Connection.conStr);
                }
                return Connection.sqlConnection;
            }
        }
    }
}

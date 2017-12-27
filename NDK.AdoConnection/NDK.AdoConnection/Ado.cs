using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.AdoConnection
{
    public class Ado : AdoBase
    {
        //public Ado() : base() { }
        public Ado(string conStr) : base(conStr) {
            this.sqlConnection = this.GetConnection();
            this.sqlCommand = this.sqlConnection.CreateCommand();
        }
        protected SqlConnection sqlConnection;
        protected SqlCommand sqlCommand;
        public void Update()
        {
            
        }

        public void Select()
        {

        }

    }
}

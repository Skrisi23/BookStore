using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Data
{
    internal class DbConnectionFactory
    {
        private readonly string _connectionString;
        private MySqlConnection _conn;
        
        public DbConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
            _conn = new MySqlConnection(connectionString);
        }

        public void OpenConnection()
        {
            _conn.Open();
        }

        public void CloseConnection()
        {
            _conn.Close();
        }
    }
}

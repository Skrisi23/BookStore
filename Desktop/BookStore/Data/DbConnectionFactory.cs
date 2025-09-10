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
        
        public DbConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;      
        }

        public MySqlConnection CreateConnection()
        {
            return new MySqlConnection(_connectionString);
        }

        
    }
}

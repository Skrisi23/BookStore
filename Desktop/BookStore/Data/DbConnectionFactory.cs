using MySqlConnector;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Data
{
    internal class DbConnectionFactory
    {
        private readonly string _configPath = "Passwords/dbsettings.txt";
        private readonly string _connectionString;

        public DbConnectionFactory()
        {
            _connectionString = File.ReadAllText(_configPath).Trim();      
        }
       
        public MySqlConnection CreateConnection()
        {
            return new MySqlConnection(_connectionString);
        }
    }
}

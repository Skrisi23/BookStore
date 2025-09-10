using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookStore.Data;

namespace BookStore.Data.Repositories
{
    internal class BookRepository : IBookRepository
    {
        private readonly DbConnectionFactory Factory;
        
        public BookRepository(DbConnectionFactory factory)
        {
          
            Factory = factory;
        }

        public void Create()
        {
            var conn = Factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }
        public void Update()
        {
            var conn = Factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }
        public void Delete()
        {
            var conn = Factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }
        public void Read()
        {
            var conn = Factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }

    }
}

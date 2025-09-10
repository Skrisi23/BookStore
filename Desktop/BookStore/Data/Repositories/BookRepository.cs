using System;
using System.Collections.Generic;
using System.Windows.Controls;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using BookStore.Data;
using BookStore.Models;

namespace BookStore.Data.Repositories
{
    internal class BookRepository : IBookRepository
    {
        private static BookRepository _instance;
        private readonly DbConnectionFactory _factory;

        public BookRepository(DbConnectionFactory factory)
        {

            _factory = factory;
        }
        public List<Book> GetBooks()
        {
            List<Book> books = new List<Book>();
            var conn = _factory.CreateConnection();
            conn.Open();
            var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT * FROM `Books`;";
            var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                string title = reader.GetString("cim");
                string author = reader.GetString("szerzo");
                DateTime release = reader.GetDateTime("kiadasi_datum");
                string description = reader.GetString("tartalom");
                bool rented = reader.GetBoolean("kolcsonzes_alatt");
                Book newBook = new Book(id, title, author, release, description, rented);
                books.Add(newBook);
            }
            conn.Close();
            return books;
        }
        public void ShowBooks(System.Windows.Controls.Label label)
        {
            var books = GetBooks();
            foreach (var book in books)
            {
                label.Content = book.ToString();
            }
        }
        public void Create()
        {
            var conn = _factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }
        public void Update()
        {
            var conn =  _factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }
        public void Delete()
        {
            var conn = _factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }
        public void Read()
        {
            var conn = _factory.CreateConnection();
            conn.Open();
            //...
            conn.Close();
        }

    }
}

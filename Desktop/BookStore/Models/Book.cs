using BookStore.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Models
{
    internal class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime? Released { get; set; }
        public string Description { get; set; }
        public bool Rented { get; set; }

        public Book(int id, string title, string author, DateTime? released, string description, bool rented)
        {
            Id = id;
            Title = title;
            Author = author;
            Released = released;
            Description = description;
            Rented = rented;
        }

        public override string ToString()
        {
            return $"{Id}. book:\nTitle: {Title}\nAuthor: {Author}\nReleased: {Released}\n Rented: {(Rented ? "Rented" : "Available")}";
        }
    }
}

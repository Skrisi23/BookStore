using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Data.Repositories
{
    internal interface IBookRepository
    {
        void Create();
        void Read();
        void Update();
        void Delete();
    }
}

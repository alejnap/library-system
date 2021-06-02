using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Books
    {
        public int BookID { get; set; }
        public string BookName { get; set; }
        public string Detail { get; set; }

        public string Author { get; set; }
        public string Genre { get; set; }
        public string BookPhoto { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class IssueBook
    {
        public int BookID { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public int MemberID { get; set; }
        public string MemberName { get; set; }
        public string IssueDate { get; set; }
        public string DueDate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Members
    {
        public int MemberID { get; set; }
        public string MemberName { get; set; }
        public string Mobile { get; set; }

        public string Email { get; set; }
        public string BirthDate { get; set; }
        public string MemberPhoto { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.DTOs
{
    public class RegisterDto
    {
        public string UserName { get; set; }

        public string UserSurname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Address { get; set; }

        public string City { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string UserSurname { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public string Country { get; set; }
    }
}

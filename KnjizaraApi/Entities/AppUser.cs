using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string UserSurname { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }

        public ICollection<Porudzbina> Porudzbine { get; set; }



    }
}

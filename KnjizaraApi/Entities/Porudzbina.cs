using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Entities
{
    public class Porudzbina
    {
        public int Id { get; set; }

        public int UkupnoZaPlacanje { get; set; }

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public bool IsFinished { get; set; } = false;

        public ICollection<KnjigaUPorudzbini> Knjige { get; set; }
    }
}

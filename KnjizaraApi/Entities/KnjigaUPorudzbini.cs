using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Entities
{
    public class KnjigaUPorudzbini
    {
        public int Id { get; set; }

        public string Naslov { get; set; }

        public int Cena { get; set; }

        public string Autor { get; set; }

        public int Kolicina { get; set; } //kolicina porucenih

    }
}

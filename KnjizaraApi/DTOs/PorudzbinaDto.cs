using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.DTOs
{
    public class PorudzbinaDto
    {
        public int Id { get; set; }

        public int UkupnoZaPlacanje { get; set; }

        public bool IsFinished { get; set; } = false;

        public int AppUserId { get; set; }

        public ICollection<KnjigaUPorudzbiniDto> Knjige { get; set; }


    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.DTOs
{
    public class AddBookDto
    {
        public string Naslov { get; set; }

        public int GodinaIzdanja { get; set; }

        public string Izdavac { get; set; }

        public int KolicinaUMagacinu { get; set; }

        public string Autor { get; set; }

        public int Cena { get; set; }

        public string About { get; set; }
    }
}
﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string PublicId { get; set; }

        public Knjiga Knjiga { get; set; }

        public int KnjigaId { get; set; }
    }
}

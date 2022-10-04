using AutoMapper;
using KnjizaraApi.DTOs;
using KnjizaraApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserDto>().ReverseMap();
            CreateMap<RegisterDto, AppUser>().ReverseMap();
            CreateMap<Porudzbina, PorudzbinaDto>();
            CreateMap<PorudzbinaDto, Porudzbina>();
            CreateMap<Knjiga, KnjigaDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
           src.Photos.FirstOrDefault().Url));
            CreateMap<AddBookDto, Knjiga>();
            CreateMap<KnjigaUPorudzbini, KnjigaUPorudzbiniDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
        }

    }
}

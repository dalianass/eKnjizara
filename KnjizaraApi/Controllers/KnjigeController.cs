using AutoMapper;
using KnjizaraApi.Data;
using KnjizaraApi.DTOs;
using KnjizaraApi.Entities;
using KnjizaraApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KnjigeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public KnjigeController(DataContext context, IMapper mapper, IPhotoService photoService)
        {
            _context = context;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KnjigaDto>>> GetBooks()
        {
            var bookFromDb = await _context.Knjige
                .Include(p => p.Photos)?
                .ToListAsync();
            var result = _mapper.Map<IEnumerable<KnjigaDto>>(bookFromDb);
            return Ok(result);
        }


        [HttpGet("{id}", Name = "GetBookById")]
        public async Task<ActionResult<Knjiga>> GetBookById(int id)
        {
            return await _context.Knjige.FindAsync(id);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<Knjiga>> Delete(int id)
        {
            var result = await _context.Knjige.FindAsync(id);
            _context.Knjige.Remove(result);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("add-book")]

        public async Task<ActionResult<Knjiga>> AddBook(AddBookDto addBookDto)
        {
            var knjiga = _mapper.Map<Knjiga>(addBookDto);
            await _context.AddAsync(knjiga);
            await _context.SaveChangesAsync();
            return Ok(knjiga);
        }


        [HttpPost("add-photo")]

        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int knjigaId)
        {
            var knjiga = await _context.Knjige
                .Include(p => p.Photos).
                FirstOrDefaultAsync(k => k.Id == knjigaId);
            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);
            //Error message dolazi od Cloudinary-ja

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            knjiga.Photos.Add(photo);

            if (await _context.SaveChangesAsync() > 0)
            {
                //return CreatedAtRoute("GetBookById", new { id = knjiga.Id}, _mapper.Map<PhotoDto>(photo));
                return _mapper.Map<PhotoDto>(photo);

            }
            return BadRequest("Problem pri dodavanju fotografije");
        }
    }
}

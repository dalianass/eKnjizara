using AutoMapper;
using KnjizaraApi.Data;
using KnjizaraApi.DTOs;
using KnjizaraApi.Entities;
using KnjizaraApi.Helpers;
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

    public class PorudzbinaController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PorudzbinaController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Porudzbina>>> GetPorudzbine()
        {
            var result = await _context.Porudzbine
                .Include(p => p.Knjige)
                .Include(a => a.AppUser)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PorudzbinaDto>>(result));
        }

        [HttpGet("moje-porudzbine")]
        public async Task<ActionResult<IEnumerable<Porudzbina>>> GetMojePorudzbine(int id)
        {
            var result = await _context.Porudzbine
                .Include(p => p.Knjige)
                .Include(a => a.AppUser)
                .Where(a => a.AppUserId == id)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PorudzbinaDto>>(result));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Porudzbina>> GetPorudzbinaById(int id)
        {
            return await _context.Porudzbine
                .Include(p => p.Knjige)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        //[Authorize]
        [HttpPost("add-porudzbina")]
        public async Task<ActionResult<Porudzbina>> AddPorudzbina(PorudzbinaDto porudzbinaDto)
        {
            porudzbinaDto.AppUserId = User.GetUserId();
            var porudzbina = _mapper.Map<Porudzbina>(porudzbinaDto);
            await _context.AddAsync(porudzbina);
            await _context.SaveChangesAsync();
            return Ok(porudzbina);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePorudzbina(int id, PorudzbinaDto porudzbinaDto)
        {
            if (id != porudzbinaDto.Id)
            {
                return BadRequest();
            }

            var result = _mapper.Map<Porudzbina>(porudzbinaDto);

            _context.Entry(result).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PorudzbinaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool PorudzbinaExists(int id)
        {
            return _context.Porudzbine.Any(e => e.Id == id);
        }

    }
}

using AutoMapper;
using KnjizaraApi.Data;
using KnjizaraApi.DTOs;
using KnjizaraApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public UsersController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        //[Authorize(Roles = "Admin, Moderator")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await this.context.
                Users.ToListAsync();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return await this.context.Users.
                Include(p => p.Porudzbine).
                FirstOrDefaultAsync(t => t.UserName == username);
        }

        [HttpPost("create-user")]

        public async Task<ActionResult<AppUser>> CreateUser(UserDto userDto)
        {
            var user = this.mapper.Map<AppUser>(userDto);
            await this.context.SaveChangesAsync();
            return Ok(user);
        }

    }
}

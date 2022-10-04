
using AutoMapper;
using KnjizaraApi.DTOs;
using KnjizaraApi.Entities;
using MailKit.Net.Smtp;
using KnjizaraApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;


namespace KnjizaraApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper, RoleManager<AppRole> roleManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _roleManager = roleManager;
            _config = config;
        }
        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _roleManager.Roles.AnyAsync() == false)
            {
                var roles = new List<AppRole>
                {
                    new AppRole{Name="Korisnik"},
                    new AppRole{Name="Admin"},
                    new AppRole{Name="Moderator"}
                };

                foreach (var role in roles)
                {
                    await _roleManager.CreateAsync(role);
                }
            }


            if (await UserExists(registerDto.Email))
            {
                return BadRequest("Korisicko ime je zauzeto");
            }

            var user = _mapper.Map<AppUser>(registerDto);
            //to, from

            user.Email = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            //kreira usera i cuva ga u bazi

            if (!result.Succeeded) return BadRequest(result.Errors);

            //var message = new MimeMessage();
            //message.From.Add(new MailboxAddress("E-Knjizara", "citalackiklub7@gmail.com"));


            //message.To.Add(new MailboxAddress("user", user.Email));

            //message.Subject = "Potvrdite registraciju na sajtu eKnjizare";
            ////-------------------
            //var userFromDb = await _userManager.FindByEmailAsync(user.Email);

            //var token = await _userManager.GenerateEmailConfirmationTokenAsync(userFromDb);

            //var uriBuilder = new UriBuilder("http://localhost:4200/confirmemail");
            //var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            //query["token"] = token;
            //query["userid"] = userFromDb.Id.ToString();
            //uriBuilder.Query = query.ToString();
            //var urlString = uriBuilder.ToString();
            ////---------------------

            //message.Body = new TextPart("plain")
            //{
            //    Text = "Klikom linka u nastavku potvrdite svoju registraciju na sajtu eKnjizare: " + System.Environment.NewLine + urlString
            //};
            ////bodybuilder klasa za html se koristi
            //using (var client = new SmtpClient())
            //{
            //    client.Connect("smtp.gmail.com", 587, false);
            //    client.Authenticate("citalackiklub7@gmail.com", "wremxhuapekkrzik");
            //    client.Send(message);
            //    client.Disconnect(true);
            //};

            var roleResult = await _userManager.AddToRoleAsync(user, "Korisnik");
            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                UserSurname = user.UserSurname,
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Porudzbine)
            .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null)
            {
                return Unauthorized("Ne postoji korisnik sa tom kombinacijom emaila i lozinke. Pokusajte ponovo");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                UserSurname = user.UserSurname,
                Email = user.Email,
                //Porudzbine = _mapper.Map<ICollection<PorudzbinaDto>>(user.Porudzbine)
            };
        }

        [HttpPost("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailDto model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            var result = await _userManager.ConfirmEmailAsync(user, model.Token);

            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }


        private async Task<bool> UserExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}

using KnjizaraApi.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
       IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
       IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Porudzbina> Porudzbine { get; set; }
        public DbSet<Knjiga> Knjige { get; set; }
        public DbSet<KnjigaUPorudzbini> KnjigeUPorudzbini { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ui => ui.UserId)
                .IsRequired(); //spoljasnji kljuc ne moze biti null

            builder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ui => ui.RoleId)
            .IsRequired();
        }
    }
}

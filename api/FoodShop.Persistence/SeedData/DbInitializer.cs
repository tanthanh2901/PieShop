using FoodShop.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodShop.Persistence.SeedData
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            modelBuilder.Entity<Category>().HasData(
                        new Category { CategoryId = 1, Name = "Cheese cakes" },
                        new Category { CategoryId = 2, Name = "Fruit pies" },
                        new Category { CategoryId = 3, Name = "Seasonal pies" }
            );


            modelBuilder.Entity<PaymentMethod>().HasData(
                    new PaymentMethod { MethodId = 1, MethodName = "cod" },
                    new PaymentMethod { MethodId = 2, MethodName = "vnpay" } 
                    );

            var hasher = new PasswordHasher<AppUser>();

            modelBuilder.Entity<AppUser>().HasData(
            new AppUser
            {
                Id = 1, 
                Email = "admin@gmail.com",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                PasswordHash = hasher.HashPassword(null, "PassWord!")
            },
            new AppUser
            {
                Id = 2,
                Email = "user@gmail.com",
                UserName = "user",
                NormalizedUserName = "USER",
                PasswordHash = hasher.HashPassword(null, "PassWord!"),
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D")
            }
            );

            modelBuilder.Entity<AppRole>().HasData(
                new AppRole { Id = 1, Name = "admin", NormalizedName = "ADMIN" },
                new AppRole { Id = 2, Name = "customer", NormalizedName = "CUSTOMER" }
            );


        }
    }
}

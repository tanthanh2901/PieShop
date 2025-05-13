using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FoodShop.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace FoodShop.Persistence.SeedData
{
    public static class IdentitySeeder
    {
        public static async Task SeedRolesAndUsersAsync(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager)
        {
            // Seed Roles
            string[] roleNames = { "admin", "customer" };

            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new AppRole { Name = roleName });
                }
            }

            // Seed Admin User
            var adminUser = await userManager.FindByEmailAsync("admin@gmail.com");
            if (adminUser == null)
            {
                adminUser = new AppUser
                {
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                    FirstName = "Admin",
                    LastName = "User",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, "Admin@123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "admin");
                }
            }

            // Seed Customer User
            var customerUser = await userManager.FindByEmailAsync("customer@gmail.com");
            if (customerUser == null)
            {
                customerUser = new AppUser
                {
                    UserName = "customer@gmail.com",
                    Email = "customer@gmail.com",
                    FirstName = "Customer",
                    LastName = "User",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(customerUser, "Customer@123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(customerUser, "customer");
                }
            }
        }
    }
}

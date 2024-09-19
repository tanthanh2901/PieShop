﻿using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Services;
using FoodShop.Infrastructure.Repositories;
using FoodShop.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FoodShop.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services
            , IConfiguration configuration)
        {

            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IAuthenRepository, AuthenRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICheckoutService, CheckoutService>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddLogging();
            return services;
        }

    }
}

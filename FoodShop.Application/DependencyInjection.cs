﻿using Microsoft.Extensions.DependencyInjection;

namespace FoodShop.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            var assembly = AppDomain.CurrentDomain.GetAssemblies();
            services.AddAutoMapper(assembly);
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));

            return services;
        }
    }
}

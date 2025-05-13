using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Services;
using FoodShop.Application.Services.Payment;
using FoodShop.Application.Services.Payment.VnPay;
using FoodShop.Application.Services.Payment.ZaloPay;
using FoodShop.Infrastructure.Repositories;
using FoodShop.Persistence.Repositories;
using FoodShop.Persistence.Services;
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
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>(); 
            services.AddScoped<ICheckoutService, CheckoutService>();
            services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IVnPayService>(provider => provider.GetService<IPaymentService>());
            services.AddScoped<IZaloPayService>(provider => provider.GetService<IPaymentService>());


            services.AddLogging();
            return services;
        }

    }
}

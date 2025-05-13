using FoodShop.Domain.Entities;
using FoodShop.Persistence.Repositories;

namespace FoodShop.Application.Contract.Persistence
{
    public interface IUnitOfWork : IDisposable
    {
        ICartRepository CartRepository { get; }
        IOrderRepository OrderRepository { get; }
        IRepository<Payment> Payments { get; }
        IRepository<Notification> Notifications { get; }
        Task<int> CompleteAsync();
    }
}

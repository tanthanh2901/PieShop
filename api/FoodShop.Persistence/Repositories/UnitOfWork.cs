using FoodShop.Application.Contract.Persistence;
using FoodShop.Domain.Entities;
using MediatR;

namespace FoodShop.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FoodShopDbContext _context;
        public IRepository<Payment> Payments { get; private set; }
        public ICartRepository CartRepository { get; }
        public IOrderRepository OrderRepository { get; }
        public IRepository<Notification> Notifications { get; private set; }

        public UnitOfWork(FoodShopDbContext context, ICartRepository cartRepository, IOrderRepository orderRepository)
        {
            _context = context;
            Payments = new BaseRepository<Payment>(_context);
            Notifications = new BaseRepository<Notification>(_context);
            CartRepository = cartRepository;
            OrderRepository = orderRepository;
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}

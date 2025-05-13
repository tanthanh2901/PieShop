using FoodShop.Application.Dto;
using FoodShop.Domain.Entities;
using FoodShop.Domain.Enum;
using Microsoft.EntityFrameworkCore;

namespace FoodShop.Persistence.Repositories
{
    internal class OrderRepository : IOrderRepository
    {
        private readonly FoodShopDbContext dbContext;

        public OrderRepository(FoodShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<OrderDto>> AdminGetAllOrders()
        {
            var orders = await dbContext.Orders
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    UserId = o.UserId,
                    OrderDate = o.OrderDate,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    OrderDetailsDto = o.OrderDetail.Select(od => new OrderDetailDto
                    {
                        OrderId = od.OrderId,
                        ProductId = od.ProductId,
                        ProductName = od.Product.Name,
                        ImageUrl = od.Product.ImageUrl,
                        Quantity = od.Quantity,
                        UnitPrice = od.UnitPrice
                    }).ToList()
                }).ToListAsync();

            return orders;

        }

        public async Task<Order> CreateOrder(Order order)
        {
            await dbContext.AddAsync(order);
            await dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<List<OrderDto>> GetAllOrders(int userId)
        {
            var orders = await dbContext.Orders
                .Where(o => o.UserId == userId)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    UserId = o.UserId,
                    OrderDate = o.OrderDate,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    OrderDetailsDto = o.OrderDetail.Select(od => new OrderDetailDto
                    {
                        OrderId = od.OrderId,
                        ProductId = od.ProductId,
                        ProductName = od.Product.Name,
                        ImageUrl = od.Product.ImageUrl,
                        Quantity = od.Quantity,
                        UnitPrice = od.UnitPrice
                    }).ToList()
                }).ToListAsync();

            return orders;
        }

        public async Task<OrderDto> GetOrderByIdAsync(int orderId)
        {
            var order = await dbContext.Orders.Where(o => o.OrderId == orderId)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    UserId = o.UserId,
                    OrderDate = o.OrderDate,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    OrderDetailsDto = o.OrderDetail.Select(od => new OrderDetailDto
                    {
                        OrderId = od.OrderId,
                        ProductId = od.ProductId,
                        Quantity = od.Quantity,
                        UnitPrice = od.UnitPrice
                    }).ToList()
                }).FirstOrDefaultAsync();
            return order;
        }


        public async Task<List<OrderDto>> GetOrderByStatus(int userId, OrderStatus status)
        {
            var orders = await GetAllOrders(userId);
            var filteredOrders = orders.Where(o => o.Status == status).ToList();

            return filteredOrders;
        }

        public async Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus status)
        {
            var order = await dbContext.Orders.FirstOrDefaultAsync(order => order.OrderId == orderId);
            if (order == null)
            {
                return false;
            }

            order.Status = status;
            await dbContext.SaveChangesAsync();

            var notification = new Notification
            {
                AppUserId = order.UserId,
                Message = $"Your order status has been updated to {status}.",
            };

            await dbContext.Notifications.AddAsync(notification);

            return true;

        }
    }
}

using System.Security.Claims;
using AutoMapper;
using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Dto;
using FoodShop.Application.Feature.Payment.Commands;
using FoodShop.Application.Services;
using FoodShop.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace FoodShop.Persistence.Services
{
    public class CheckoutService : ICheckoutService
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public CheckoutService(IUnitOfWork unitOfWork, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<OrderDto> ProcessCheckoutAsync(PlaceOrderRequest placeOrderRequest)
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var userId = int.Parse(userIdClaim.Value);

            // Get the user's cart
            var cartItems = await _unitOfWork.CartRepository.GetCartItems(userId);
            if (cartItems == null || cartItems.Count() == 0)
            {
                throw new InvalidOperationException("Cart is empty");
            }

            // Calculate total amount
            decimal totalAmount = 0;
            foreach (CartItem item in cartItems)
            {
                totalAmount += item.Product.Price * item.Quantity;
            }

            var exchangeRate = 25000;//await currencyExchangeService.GetUsdToVndRateAsync();
            totalAmount = totalAmount * exchangeRate;

            // Create order
            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                TotalAmount = totalAmount,
                ShipAddress = placeOrderRequest.ShipAddress,
                ShipName = placeOrderRequest.ShipName,
                PhoneNumber = placeOrderRequest.PhoneNumber,
                OrderDetail = cartItems.Select(item => new OrderDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Product.Price
                }).ToList(),
                Status = Domain.Enum.OrderStatus.Pending
            };

            order = await _unitOfWork.OrderRepository.CreateOrder(order);

            var payment = new Payment
            {
                Amount = totalAmount,
                MethodId = placeOrderRequest.PaymentMethodId,
                OrderId = order.OrderId,
                PaymentDate = order.OrderDate,
                TransactionId = GenerateAppTransId(),
                Status = order.Status.ToString()
            };
            //payment.OrderId = order.OrderId;

            await _unitOfWork.Payments.AddAsync(payment);

            //cart.Items.Clear();

            var notification = new Notification
            {
                AppUserId = 1, //assume admin ID is 1
                Message = $"A new order #{order.OrderId} has been placed.",
            };

            await _unitOfWork.Notifications.AddAsync(notification);
            await _unitOfWork.CartRepository.ClearCartAsync(userId);

            await _unitOfWork.CompleteAsync();

            return mapper.Map<OrderDto>(order);
        }

        private string GenerateAppTransId()
        {
            return DateTime.UtcNow.ToString("yyMMdd") + "_" + new Random().Next(100000, 999999).ToString();
        }
    }
}

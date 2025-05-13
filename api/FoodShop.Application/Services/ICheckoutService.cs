using FoodShop.Application.Dto;
using FoodShop.Application.Feature.Payment.Commands;

namespace FoodShop.Application.Services
{
    public interface ICheckoutService
    {
        Task<OrderDto> ProcessCheckoutAsync(PlaceOrderRequest placeOrderRequest);
    }
}

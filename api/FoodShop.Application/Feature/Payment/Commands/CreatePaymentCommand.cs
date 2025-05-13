using MediatR;

namespace FoodShop.Application.Feature.Payment.Commands
{
    public class CreatePaymentCommand : IRequest<string>
    {
        public PlaceOrderRequest PlaceOrderRequest;
    }
}

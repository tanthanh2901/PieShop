using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Commands.CreatePaymentMethod
{
    public class CreatePaymentMethodCommand : IRequest<int>
    {
        public string MethodName { get; set; }
    }
}

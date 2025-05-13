using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Commands.UpdatePaymentMethod
{
    public class UpdatePaymentMethodCommand : IRequest
    {
        public int MethodId;
        public string MethodName { get; set; }
    }
}

using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Commands.DeletePaymentMethod
{
    public class DeletePaymentMethodCommand : IRequest
    {
        public int MethodId;
    }
}

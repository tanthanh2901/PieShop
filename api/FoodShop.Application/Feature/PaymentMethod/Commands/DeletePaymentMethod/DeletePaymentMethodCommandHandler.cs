using FoodShop.Application.Contract.Persistence;
using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Commands.DeletePaymentMethod
{
    internal class DeletePaymentMethodCommandHandler : IRequestHandler<DeletePaymentMethodCommand>
    {
        private readonly IPaymentMethodRepository paymentMethodRepository;

        public DeletePaymentMethodCommandHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            this.paymentMethodRepository = paymentMethodRepository;
        }

        public async Task Handle(DeletePaymentMethodCommand request, CancellationToken cancellationToken)
        {
            var paymentMethod = await paymentMethodRepository.GetByIdAsync(request.MethodId);
            await paymentMethodRepository.DeleteAsync(paymentMethod);
        }
    }
}

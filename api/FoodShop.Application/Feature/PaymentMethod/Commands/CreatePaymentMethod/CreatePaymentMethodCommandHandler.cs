using AutoMapper;
using FoodShop.Application.Contract.Persistence;
using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Commands.CreatePaymentMethod
{
    public class CreatePaymentMethodCommandHandler : IRequestHandler<CreatePaymentMethodCommand, int>
    {
        private readonly IPaymentMethodRepository paymentMethodRepository;
        private readonly IMapper mapper;

        public CreatePaymentMethodCommandHandler(IPaymentMethodRepository paymentMethodRepository, IMapper mapper)
        {
            this.paymentMethodRepository = paymentMethodRepository;
            this.mapper = mapper;
        }

        async Task<int> IRequestHandler<CreatePaymentMethodCommand, int>.Handle(CreatePaymentMethodCommand request, CancellationToken cancellationToken)
        {
            var paymentMethod = mapper.Map<Domain.Entities.PaymentMethod>(request);

            await paymentMethodRepository.AddAsync(paymentMethod);

            return paymentMethod.MethodId;
        }
    }
}

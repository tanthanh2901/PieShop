using AutoMapper;
using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Feature.Products.Commands.UpdateProduct;
using FoodShop.Domain.Entities;
using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Commands.UpdatePaymentMethod
{
    internal class UpdatePaymentMethodCommandHandler : IRequestHandler<UpdatePaymentMethodCommand>
    {
        private readonly IPaymentMethodRepository paymentMethodRepository;
        private readonly IMapper mapper;

        public UpdatePaymentMethodCommandHandler(IPaymentMethodRepository paymentMethodRepository, IMapper mapper)
        {
            this.paymentMethodRepository = paymentMethodRepository;
            this.mapper = mapper;
        }

        public async Task Handle(UpdatePaymentMethodCommand request, CancellationToken cancellationToken)
        {
            var paymentMethodToUpdate = await paymentMethodRepository.GetByIdAsync(request.MethodId);
            mapper.Map(request, paymentMethodToUpdate, typeof(UpdatePaymentMethodCommand), typeof(Domain.Entities.PaymentMethod));

            await paymentMethodRepository.UpdateAsync(paymentMethodToUpdate);

        }
    }
}

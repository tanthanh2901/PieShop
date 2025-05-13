using AutoMapper;
using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Dto;
using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Queries.GetAllPaymentMethods
{
    public class GetAllPaymentMethodsQueryHandler
        : IRequestHandler<GetAllPaymentMethodsQuery, List<PaymentMethodDto>>
    {
        private readonly IPaymentMethodRepository paymentMethodRepository;
        private readonly IMapper mapper;

        public GetAllPaymentMethodsQueryHandler(IPaymentMethodRepository paymentMethodRepository, IMapper mapper)
        {
            this.paymentMethodRepository = paymentMethodRepository;
            this.mapper = mapper;
        }

        public async Task<List<PaymentMethodDto>> Handle(GetAllPaymentMethodsQuery request, CancellationToken cancellationToken)
        {
            var paymentMethods = await paymentMethodRepository.GetAllAsync();
            return mapper.Map<List<PaymentMethodDto>>(paymentMethods);
        }
    }
}

using AutoMapper;
using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Dto;
using FoodShop.Persistence.Repositories;
using MediatR;

namespace FoodShop.Application.Feature.Order.GetAllOrders
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, List<OrderDto>>
    {
        private readonly IOrderRepository orderRepository;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetAllOrdersQueryHandler(IOrderRepository orderRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.orderRepository = orderRepository;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        async Task<List<OrderDto>> IRequestHandler<GetAllOrdersQuery, List<OrderDto>>.Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await  unitOfWork.OrderRepository.GetAllOrders(request.UserId);
            return mapper.Map<List<OrderDto>>(orders);
        }
    }
}

using FoodShop.Application.Dto;
using MediatR;

namespace FoodShop.Application.Feature.PaymentMethod.Queries.GetAllPaymentMethods
{
    public class GetAllPaymentMethodsQuery : IRequest<List<PaymentMethodDto>>
    {
    }
}

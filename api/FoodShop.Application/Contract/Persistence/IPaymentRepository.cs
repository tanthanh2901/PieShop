using FoodShop.Application.Dto;
using FoodShop.Domain.Entities;

namespace FoodShop.Application.Contract.Persistence
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        Task<bool> AddPayment(PaymentDto paymentDto);
        Task<PaymentDto> GetPaymentByTransId(string transId);
    }
}

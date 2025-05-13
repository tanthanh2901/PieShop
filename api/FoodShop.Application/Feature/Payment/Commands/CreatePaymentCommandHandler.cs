using FoodShop.Application.Services;
using FoodShop.Application.Services.Payment;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace FoodShop.Application.Feature.Payment.Commands
{
    public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand, string>
    {
        private readonly ICheckoutService checkoutService;
        private readonly IPaymentService paymentService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreatePaymentCommandHandler(
            ICheckoutService checkoutService,
            IPaymentService paymentService,
            IHttpContextAccessor httpContextAccessor)
        {
            this.checkoutService = checkoutService;
            this.paymentService = paymentService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
        {
            var paymentMethodId = request.PlaceOrderRequest.PaymentMethodId;

            var orderDto = await checkoutService.ProcessCheckoutAsync(request.PlaceOrderRequest);

            // Handle COD payment
            if (paymentMethodId == 1)
            {
                return "Order successfully placed with COD.";
            }

            // Handle VNPAY payment
            else if (paymentMethodId == 2)
            {
                var httpContext = _httpContextAccessor.HttpContext;
                if (httpContext == null)
                    throw new InvalidOperationException("HttpContext is not available.");

                var url = paymentService.CreateVnPayPaymentUrl(orderDto, httpContext);
                return url;
            }

            throw new InvalidOperationException("Invalid payment method");
        }
    }
}

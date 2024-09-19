﻿using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Entities;
using FoodShop.Application.Feature.Cart.Commands.AddToCart;
using FoodShop.Application.Feature.Cart.Queries.GetCart;
using FoodShop.Domain.Entities;
using FoodShop.Persistence.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SendGrid.Helpers.Errors.Model;

namespace FoodShop.API.Controllers
{
    [ApiController]
    [Route("cart")]
    [Authorize]
    public class CartController : Controller
    {
        private readonly ICartRepository cartRepository;
        private readonly IProductRepository productRepository;
        private readonly IMediator mediator; 
        private readonly CartService _cartService;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICheckoutService _checkoutService;

        public CartController(ICartRepository cartRepository, IMediator mediator, CartService cartService, UserManager<AppUser> userManager, IProductRepository productRepository, ICheckoutService checkoutService)
        {
            this.cartRepository = cartRepository;
            this.mediator = mediator;
            _cartService = cartService;
            _userManager = userManager;
            this.productRepository = productRepository;
            _checkoutService = checkoutService;
        }

        //[HttpPost]
        //public IActionResult AddToCartCookie(int productId, int quantity) 
        //{
        //    var newProduct = new CartProduct
        //    {
        //        ProductID = productId,
        //        Quantity = quantity,
        //    };

        //    _cartService.AddProductToCartCookie(newProduct);
        //    return Ok(newProduct);

        //}

        //[HttpGet]
        //public IActionResult GetCartFromCookie()
        //{
        //    var cartProducts = _cartService.GetCartFromCookie();
        //    //var items = cart.Items;
        //    return Ok(cartProducts);
        //}

        //[HttpPost("remove-product")]
        //[ProducesResponseType(typeof(CartOrderInfo), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public IActionResult RemoveProduct(
        //    [FromQuery] int? productId,
        //    [FromHeader(Name = "Cookies")] string cookieHeader)
        //{
        //    // Extract the cart cookie from the header
        //    var cartCookie = cookieHeader?.Split(';')
        //                      .FirstOrDefault(x => x.Trim().StartsWith("cart="))?
        //                      .Split('=')[1];

        //    if (productId == null)
        //    {
        //        return BadRequest("Product ID cannot be null");
        //    }

        //    try
        //    {
        //        var updatedCart = _cartService.RemoveProduct(productId, cartCookie, Response);
        //        return Ok(updatedCart);
        //    }
        //    catch (NotFoundException ex)
        //    {
        //        return NotFound(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle unexpected errors
        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        //[HttpDelete("clear")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public IActionResult ClearCart()
        //{
        //    // Clear the cart cookie
        //    _cartService.ClearCart();

        //    // Return a success response
        //    return Ok(new { message = "Cart cleared successfully." });
        //}

        private async Task<int> GetUserId()
        {
            var user = await _userManager.GetUserAsync(User);

            return (int)(user?.Id);
        }

        [HttpPost("addToCart")]
        public async Task<IActionResult> AddToCart(int productId, int quantity)
        {
            var userId = await GetUserId();
            if (userId == null) return Unauthorized();

            await cartRepository.AddToCart(userId, productId, quantity);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = await GetUserId();
            if (userId == null) return Unauthorized();

            var cartItems = await cartRepository.GetCartItems(userId);
            return Ok(cartItems);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCartItem(int productId, int quantity)
        {
            var userId = await GetUserId();
            if (userId == null) return Unauthorized();

            await cartRepository.UpdateCartItem(userId, productId, quantity);
            return Ok();
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            var userId = await GetUserId();
            if (userId == null) return Unauthorized();

            await cartRepository.RemoveFromCart(userId, productId);
            return Ok();
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = await GetUserId();
            if (userId == null) return Unauthorized();

            await cartRepository.ClearCartAsync(userId);
            return Ok(new { message = "Cart cleared successfully" });
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            var userId = await GetUserId();

            try
            {
                var order = await _checkoutService.ProcessCheckoutAsync(userId, "cod");
                return Ok(new { OrderId = order.OrderId, Message = "Checkout successful" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        
    }
}
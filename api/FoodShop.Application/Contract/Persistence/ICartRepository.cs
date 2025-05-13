using FoodShop.Domain.Entities;

namespace FoodShop.Application.Contract.Persistence
{
    public interface ICartRepository 
    {
        Task AddToCart(int userId, int productId, int quantity);
        Task<int> GetNumberOfCartItem(int userId);
        Task<List<CartItem>> GetCartItems(int userId);
        Task<Cart> GetCartByUserIdAsync(int userId);
        Task UpdateCartItem(int userId, int cartItemId, int quantity);
        Task RemoveFromCart(int userId, int productId);
        Task ClearCartAsync(int userId);
    }
}

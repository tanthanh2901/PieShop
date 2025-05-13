using FoodShop.Application.Contract.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FoodShop.Persistence.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected readonly FoodShopDbContext _dbContext;

        public BaseRepository(FoodShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual async Task<T> GetByIdAsync(int id)
           => await _dbContext.Set<T>().FindAsync(id);

        public async Task<T> AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            try
            {
                _dbContext.Entry(entity).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new InvalidOperationException("Concurrency issue occurred while updating", ex);
            }
        }
        public async Task DeleteAsync(T entity)
        {
            var existingEntity = await _dbContext.Set<T>().FindAsync(_dbContext.Entry(entity).Property("Id").CurrentValue);
            if (existingEntity == null)
                throw new KeyNotFoundException("Entity not found.");

            _dbContext.Set<T>().Remove(existingEntity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();

        }

    }
}

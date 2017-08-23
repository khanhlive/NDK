
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NDK.ApplicationCore.EFGenericRepository
{
    /// <summary>
    /// Interface: tạo phương thức chung cho Entity
    /// </summary>
    /// <typeparam name="T">Đối tượng cần tạo</typeparam>
    /// <typeparam name="KeyType">Kiểu dữ liệu Key Field </typeparam>
    public interface IRepository<T,KeyType> where T : class
    {
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        AccessEntityStatusCode Insert(T item);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        Task<Tuple<AccessEntityStatusCode, T>> InsertAsync(T item);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        Tuple<AccessEntityStatusCode, T> Update(T item, KeyType id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Tuple<AccessEntityStatusCode, T>> UpdateAsync(T item, KeyType id);
        /// <summary>
        /// asdas dá 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        AccessEntityStatusCode Delete(T item);
        /// <summary>
        /// avcvcvc vcvcc
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        Task<AccessEntityStatusCode> DeleteAsync(T item);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IQueryable<T> Select();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<ICollection<T>> GetAllAsync();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T GetByID(KeyType id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<T> GetByIDAsync(KeyType id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        T Find(Expression<Func<T, bool>> match);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        Task<T> FindAsync(Expression<Func<T, bool>> match);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        ICollection<T> FindAll(Expression<Func<T, bool>> match);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> match);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        int Count();
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<int> CountAsync();
    }
}

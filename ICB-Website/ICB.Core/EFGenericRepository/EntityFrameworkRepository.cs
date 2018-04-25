
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NDK.ApplicationCore.EFGenericRepository
{
    /// <summary>
    /// Thiết lập kiểu dữ liệu và đối tượng cần tạo Services
    /// </summary>
    /// <typeparam name="T">Kiểu dữ liệu đối tượng cần tạo</typeparam>
    /// <typeparam name="KeyType">Kiểu dữ liệu Key Field</typeparam>
    public class EntityFrameworkRepository<T, KeyType> : IDisposable,IRepository<T, KeyType> where T : class
    {
        /// <summary>
        /// DbSet
        /// </summary>
        protected readonly DbSet<T> dbSet;

        /// <summary>
        /// DbContext Entities
        /// </summary>
        protected DbContext context;
        /// <summary>
        /// Khởi tạo với DbContext
        /// </summary>
        /// <param name="db">DbContext Entities</param>
        public EntityFrameworkRepository(DbContext db)
        {
            this.context = db;// new Models.ICB_DbContext();
            this.dbSet = this.context.Set<T>();
            this.context.Configuration.ProxyCreationEnabled = false;
            //this.db = new DbContext();
        }

        /// <summary>
        /// Đếm số lượng bản ghi
        /// </summary>
        /// <returns>int: trả về số lượng bản ghi có trong bảng</returns>
        public virtual int Count()
        {
            return this.dbSet.Count();
        }
        

        /// <summary>
        /// Xóa đối tượng
        /// </summary>
        /// <param name="item">Đối tượng cần xóa</param>
        /// <returns>AccessEntityStatusCode</returns>
        public virtual AccessEntityStatusCode Delete(T item)
        {
            this.context.Set<T>().Attach(item);
            this.context.Entry<T>(item).State = EntityState.Deleted;
            int counter = this.context.SaveChanges();
            return (counter > 0 ? AccessEntityStatusCode.OK : AccessEntityStatusCode.Failed);
        }
        /// <summary>
        /// Trả về phần tử đầu tiên phù hợp với 'biểu thức' tìm kiếm
        /// </summary>
        /// <param name="match">Biểu thức tìm kiếm</param>
        /// <returns></returns>
        public virtual T Find(Expression<Func<T, bool>> match)
        {
            return this.context.Set<T>().FirstOrDefault(match);
        }

        /// <summary>
        /// Trả về ICollection phù hợp với 'biểu thức' tìm kiếm
        /// </summary>
        /// <param name="match">Biểu thức tìm kiếm</param>
        /// <returns></returns>
        public virtual ICollection<T> FindAll(Expression<Func<T, bool>> match)
        {
            return this.context.Set<T>().Where(match).ToList();
        }
        

        /// <summary>
        /// Tìm kiếm phần tử trong DbSet theo Key Field
        /// </summary>
        /// <param name="id">Key Value</param>
        /// <returns></returns>
        public virtual T GetByID(KeyType id)
        {
            return this.context.Set<T>().Find(id);
        }

        /// <summary>
        /// Thêm mới phần tử vào Collections
        /// </summary>
        /// <param name="item">Đối tượng cần thêm</param>
        /// <returns></returns>
        public virtual AccessEntityStatusCode Insert(T item)
        {
            this.context.Set<T>().Add(item);
            try
            {
                int counter = this.context.SaveChanges();
                return (counter > 0 ? AccessEntityStatusCode.OK : AccessEntityStatusCode.Failed);
            }
            catch (DbUpdateException)
            {
                throw;
            }
            catch (DbEntityValidationException)
            {

                throw;
            }
            
            
        }
        
        /// <summary>
        /// Return DbSet
        /// </summary>
        /// <returns></returns>
        public virtual IQueryable<T> Select()
        {
            return this.dbSet;
        }
        /// <summary>
        /// Cập nhật giá trị cho đối tượng
        /// </summary>
        /// <param name="item">Đối tượng cần cập nhật giá trị</param>
        /// <param name="id">Key Value</param>
        /// <returns></returns>
        public virtual Tuple<AccessEntityStatusCode, T> Update(T item, KeyType id)
        {
            var model = this.context.Set<T>().Find(id);
            if (model != null)
            {

                this.context.Entry<T>(model).CurrentValues.SetValues(item);// = EntityState.Modified;
                int counter = this.context.SaveChanges();
                this.context.Entry<T>(model).GetDatabaseValues();
                return Tuple.Create(counter >= 0 ? AccessEntityStatusCode.OK : AccessEntityStatusCode.Failed, item);
            }
            else
            {
                return Tuple.Create(AccessEntityStatusCode.NotFound, item);
            }

        }
        

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {   
            this.context.Dispose();
        }
        

        /// <summary>
        /// Lấy danh sách
        /// </summary>
        /// <returns></returns>
        public virtual ICollection<T> GetAll()
        {
            return this.context.Set<T>().ToList();
        }
        
        public virtual AccessEntityStatusCode Delete(KeyType id)
        {
            T item = this.GetByID(id);
            if (item == null)
            {
                return AccessEntityStatusCode.NotFound;
            }
            else
            {
                AccessEntityStatusCode statusCode = this.Delete(item);
                return statusCode;
            }
        }
    }
    
}

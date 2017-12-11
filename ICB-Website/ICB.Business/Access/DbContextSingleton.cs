using System.Data.Entity;

namespace ICB.Business.Access
{
    public class DbContextSingleton
    {
        private static Models.WebContext dbContext = new Models.WebContext();
        private DbContextSingleton() { }
        public static DbContext GetInstance()
        {
            return dbContext;
        }
    }
}

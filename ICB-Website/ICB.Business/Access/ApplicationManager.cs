using NDK.ApplicationCore.EFGenericRepository;

namespace ICB.Business.Access
{
    public class ApplicationManager<T, KeyType> : EntityFrameworkRepository<T, KeyType> where T : class
    {
        public ApplicationManager() : base(new Models.WebContext()) { }
        
    }
}

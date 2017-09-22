using ICB.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ICB.Business.Access
{
    public class AccountProvider : ApplicationManager<Models.Account,int>
    {
        public AccountProvider()
        {
            
        }
        public Account SignIn(string username, string password)
        {
            string hashPassword = NDK.ApplicationCore.Extensions.Hepler.StringHelper.CreateMD5(password);
            return context.Set<Account>().FirstOrDefault(p => p.Username == username && p.Password == hashPassword);
        }
        public async Task<Account> SignInAsync(string username, string password)
        {
            string hashPassword = NDK.ApplicationCore.Extensions.Hepler.StringHelper.CreateMD5(password);
            return await context.Set<Account>().FirstOrDefaultAsync(p => p.Username == username && p.Password == hashPassword);
        }

        public bool CheckUsername(string username)
        {
            return context.Set<Account>().Any(p => p.Username == username);
        }
        public async Task<bool> CheckUsernameAsync(string username)
        {
            return await context.Set<Account>().AnyAsync(p => p.Username == username);
        }
    }
}

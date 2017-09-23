using ICB.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using NDK.ApplicationCore.Extensions.ResponseResults;
using ICB.Business.Entities.Message;
using ICB.Business.Entities.Apps;

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

        public AccessEntityResult Register(Account account)
        {
            if (this.CheckUsername(account.Username))
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Existed, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Account_Existed) };
            }
            else
            {
                AccessEntityStatusCode result = this.Insert(account);
                if (result == AccessEntityStatusCode.OK)
                {
                    return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Register_Success) };
                }
                else
                {
                    return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Register_Failed) };
                }
            }
        }

        public async Task <AccessEntityResult> RegisterAsync(Account account)
        {
            if (await this.CheckUsernameAsync(account.Username))
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Existed, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Account_Existed) };
            }
            else
            {
                Tuple<AccessEntityStatusCode, Account> result = await this.InsertAsync(account);
                if (result.Item1 == AccessEntityStatusCode.OK)
                {
                    return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Register_Success) };
                }
                else
                {
                    return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Register_Failed) };
                }
            }
        }
        
    }
}

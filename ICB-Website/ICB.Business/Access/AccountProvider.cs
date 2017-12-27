using ICB.Business.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using NDK.ApplicationCore.Extensions.ResponseResults;
using ICB.Business.Entities.Message;
using ICB.Business.Entities.Apps;
using NDK.ApplicationCore.Extensions.Hepler;

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

        public Tuple<AccessEntityStatusCode, Account> Edit(Account account, int id)
        {


            Account edit = this.GetByID(id);
            if (edit != null)
            {
                if (string.IsNullOrEmpty(account.Password) || string.IsNullOrWhiteSpace(account.Password))
                {
                    account.Password = edit.Password;
                    account.CreateTime = edit.CreateTime;
                    //account.Documents = edit.Documents;
                    //account.Feedbacks = edit.Feedbacks;
                    account.IsDeleted = edit.IsDeleted;
                    account.LastLoginTime = edit.LastLoginTime;
                    account.LastMordifiedTime = edit.LastMordifiedTime;
                    //account.Services = edit.Services;
                    return this.Update(account, id);
                }
                else
                {
                    account.Password = StringHelper.CreateMD5(account.Password);
                    return this.Update(account, id);
                }
            }
            else
            {
                return new Tuple<AccessEntityStatusCode, Account>(AccessEntityStatusCode.NotFound, null);
            }

        }


        public async Task<Tuple<AccessEntityStatusCode, Account>> EditAsync(Account account, int id)
        {

            Account edit = await this.GetByIDAsync(id);
            if (edit != null)
            {
                account.Password = edit.Password;
                account.CreateTime = edit.CreateTime;
                //account.Documents = edit.Documents;
                //account.Feedbacks = edit.Feedbacks;
                account.IsDeleted = edit.IsDeleted;
                account.LastLoginTime = edit.LastLoginTime;
                account.LastMordifiedTime = edit.LastMordifiedTime;
                //account.Services = edit.Services;
                if (string.IsNullOrEmpty(account.Password) || string.IsNullOrWhiteSpace(account.Password))
                {
                    account.Password = edit.Password;
                    return await this.UpdateAsync(account, id);
                }
                else
                {
                    account.Password = StringHelper.CreateMD5(account.Password);
                    return await this.UpdateAsync(account, id);
                }
            }
            else
            {
                return new Tuple<AccessEntityStatusCode, Account>(AccessEntityStatusCode.NotFound, null);
            }

        }

        public static string GetName(int id)
        {
            AccountProvider accountProvider = new AccountProvider();
            Account account =  accountProvider.GetByID(id);
            return account == null ? "" : account.Username;
        }

    }
}

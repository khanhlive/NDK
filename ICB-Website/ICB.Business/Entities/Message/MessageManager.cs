using ICB.Business.Entities.Apps;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ICB.Business.Entities.Message
{
    public class MessageManager
    {
        public static string GetErrorMessage(ModuleType moduleType, MessageType messageType)
        {
            switch (moduleType)
            {
                case ModuleType.Register:
                    return MessageManager.GetMessage(new RegisterMessage(), messageType);
                case ModuleType.Login:
                    break;
                default:
                    break;
            }

            return "";
        }

        protected static string GetMessage(MessageBase messageBase,MessageType messageType)
        {
            return messageBase.GetMessage(messageType);
        }
    }
    public abstract class MessageBase
    {
        protected string Success = "Thành công";
        protected string AccountExisted = "Tài khoản đã tồn tại";
        protected string AccountNotFound = "Tài khoản không tồn tại";
        protected string MsgDefault = "Thông báo từ Website";
        public abstract string GetMessage(MessageType messageType);
    }

    public class RegisterMessage : MessageBase
    {
        protected new string Success = "Đăng ký tài khoản thành công";
        protected string Failed = "Không đăng ký được tài khoản";
        protected string ModelFailed = "Đăng ký tài khoản thành công";

        public override string GetMessage(MessageType messageType)
        {
            switch (messageType)
            {
                case MessageType.Account_Existed:
                    return this.AccountExisted;
                case MessageType.Account_NotFound:
                    return this.AccountNotFound;
                case MessageType.Register_Success:
                    return this.Success;
                case MessageType.Register_Failed:
                    return this.Failed;
                case MessageType.Register_ModelFailed:
                    return this.ModelFailed;
                case MessageType.ModelFailed:
                    return this.ModelFailed;
                default:
                    return this.MsgDefault;
            }
        }
    }

    public class LoginMessage : MessageBase
    {
        protected new string Success = "Đăng nhập thành công";
        protected string Failed = "Tài khoản hoặc mật khẩu sai";
        protected string ModelFailed = "Sai thông tin đăng nhập";
        public override string GetMessage(MessageType messageType)
        {
            switch (messageType)
            {
                case MessageType.Account_Existed:
                    return this.AccountExisted;
                case MessageType.Account_NotFound:
                    return this.AccountNotFound;
                case MessageType.Login_Failed:
                    return this.Failed;
                case MessageType.Login_ModelFailed:
                    return this.ModelFailed;
                case MessageType.Login_Success:
                    return this.Success;
                case MessageType.ModelFailed:
                    return this.ModelFailed;
                default:
                    return this.MsgDefault;
            }
        }
    }

    public enum MessageType
    {
        Account_Existed,
        Account_NotFound,
        Register_Success,
        Register_Failed,
        Register_ModelFailed,
        Login_Failed,
        Login_ModelFailed,
        Login_Success,
        ModelFailed,

    }



}

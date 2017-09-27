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
                case ModuleType.Base:
                    return MessageManager.GetMessage(new MessageBase1(), messageType);
                case ModuleType.Register:
                    return MessageManager.GetMessage(new RegisterMessage(), messageType);
                case ModuleType.Login:
                    break;
                default:
                    break;
            }

            return "";
        }

        public static string GetErrorMessage(ModuleType moduleType, AccessEntityStatusCode accessEntityStatusCode)
        {
            switch (moduleType)
            {
                case ModuleType.Base:
                    return MessageManager.GetMessage(new MessageBase1(), accessEntityStatusCode);
                case ModuleType.Register:
                    return MessageManager.GetMessage(new RegisterMessage(), accessEntityStatusCode);
                case ModuleType.Login:
                    return MessageManager.GetMessage(new LoginMessage(), accessEntityStatusCode);
                default:
                    break;
            }

            return "";
        }

        protected static string GetMessage(MessageBase messageBase,MessageType messageType)
        {
            return messageBase.GetMessage(messageType);
        }
        protected static string GetMessage(MessageBase messageBase, AccessEntityStatusCode accessEntityStatusCode)
        {
            switch (accessEntityStatusCode)
            {
                case AccessEntityStatusCode.OK:
                    return messageBase.GetMessage(MessageType.Success);
                case AccessEntityStatusCode.Existed:
                    return messageBase.GetMessage(MessageType.Existed);
                case AccessEntityStatusCode.NotFound:
                    return messageBase.GetMessage(MessageType.NotFound);
                case AccessEntityStatusCode.Failed:
                    return messageBase.GetMessage(MessageType.Failed);
                case AccessEntityStatusCode.ModelFailed:
                    return messageBase.GetMessage(MessageType.ModelFailed);
                default:
                    return "Lỗi hệ thống";
            }
        }

    }
    public abstract class MessageBase
    {
        protected string Success = "Thành công";
        protected string Failed_Base = "Có lỗi xảy ra";
        protected string NotFound = "Không tìm thấy dữ liệu phù hợp";
        protected string Existed = "Đã tồn tại";
        protected string AccountExisted = "Tài khoản đã tồn tại";
        protected string AccountNotFound = "Tài khoản không tồn tại";
        protected string MsgDefault = "Thông báo từ Website";
        protected string ModelFailed_Base = "Thông tin không hợp lệ";
        protected string Update = "Cập nhật thành công";
        public abstract string GetMessage(MessageType messageType);
    }

    public class MessageBase1 : MessageBase
    {
        public override string GetMessage(MessageType messageType)
        {
            switch (messageType)
            {
                case MessageType.ModelFailed:
                    return this.ModelFailed_Base;
                case MessageType.Success:
                    return this.Success;
                case MessageType.Failed:
                    return this.Failed_Base;
                case MessageType.NotFound:
                    return this.NotFound;
                case MessageType.Existed:
                    return this.Existed;
                case MessageType.Update:
                    return this.Update;
                default:
                    return this.MsgDefault;
            }
        }
    }

    public class RegisterMessage : MessageBase
    {
        protected new string Success = "Đăng ký tài khoản thành công";
        protected string Failed = "Không đăng ký được tài khoản";
        protected string ModelFailed = "Thông tin không hợp lệ";
        protected new string Update = "Cập nhật thành công";

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
        Update,
        Success,
        Failed,
        NotFound,
        Existed,
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

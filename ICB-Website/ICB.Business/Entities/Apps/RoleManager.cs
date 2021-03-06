﻿using System.Collections.Generic;
using System.Linq;

namespace ICB.Business.Entities.Apps
{
    public class RoleManager
    {
        public const int Superadmin = 0;
        public const int Admin = 1;
        public const int Manager = 2;
        public const int Writer = 3;
        public const int Member = 4;
        public const int Guest = 5;


        public static string GetDisplayName(int role)
        {
            List<RoleModel> list = new List<RoleModel>();
            list.Add(new RoleModel { Value = 0, Name = "Quản trị hệ thống", NameENG = "SuperAdmin" });
            list.Add(new RoleModel { Value = 1, Name = "Quản trị", NameENG = "Admin" });
            list.Add(new RoleModel { Value = 2, Name = "Quản lý Website", NameENG = "Manager" });
            list.Add(new RoleModel { Value = 3, Name = "Người viết bài", NameENG = "Writer" });
            list.Add(new RoleModel { Value = 4, Name = "Thành viên", NameENG = "Member" });
            list.Add(new RoleModel { Value = 5, Name = "Khách", NameENG = "Guest" });
            RoleModel roleModel = list.FirstOrDefault(x => x.Value == role);
            return roleModel == null ? "" : roleModel.Name;
        }
        public static List<RoleModel> GetAllRole()
        {
            List<RoleModel> list = new List<RoleModel>();
            list.Add(new RoleModel { Value = 0, Name = "Quản trị hệ thống", NameENG = "SuperAdmin" });
            list.Add(new RoleModel { Value = 1, Name = "Quản trị", NameENG = "Admin" });
            list.Add(new RoleModel { Value = 2, Name = "Quản lý Website", NameENG = "Manager" });
            list.Add(new RoleModel { Value = 3, Name = "Người viết bài", NameENG = "Writer" });
            list.Add(new RoleModel { Value = 4, Name = "Thành viên", NameENG = "Member" });
            list.Add(new RoleModel { Value = 5, Name = "Khách", NameENG = "Guest" });
            return list;
        }
    }

    public class RoleModel
    {
        public int Value { get; set; }
        public string Name { get; set; }
        public string NameENG { get; set; }
    }

    public enum DocumentType
    {
        TaiLieu = 1,
        VanBan = 2
    }

    public class DocumentStatus
    {
        public static string GetStatusText(int status)
        {
            if (status == 0)
            {
                return "Chưa duyệt";
            }
            else if (status == 1)
            {
                return "Đã duyệt";
            }
            else if (status == 2)
            {
                return "Đã xóa";
            }
            else
            {
                return "";
            }
        }
    }

    public enum ModelStatus
    {
        Active = 1,
        NonActive = 0
    }

    public enum WebsiteCategory
    {
        Info = 0,
        Slider = 1,
        HosoNangLuc = 3,
        GioiThieu = 4,
        SoDoToChuc = 5,
        ChinhSachChatLuong = 6,
        TamNhinSuMenh = 7
    }
}

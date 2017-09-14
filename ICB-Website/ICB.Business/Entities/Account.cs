using NDK.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ICB.Business.Entities
{
    public class Account : IEntitiesCore<Account>
    {
        public bool Compare(Account target)
        {
            return true;
        }
        [Key]
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
        public DateTime CreateTime { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsLocked { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime LastLoginTime { get; set; }
        public DateTime LastMordifiedTime { get; set; }
        public string ImageURL { get; set; }
        //public int UserID { get; set; }
    }

    public class News
    {
        [Key]
        public int ID { get; set; }
        public string Caption { get; set; }
        public string ThumbnailURL { get; set; }
        public DateTime PostedDate { get; set; }
        public int UserID { get; set; }
        public int Category { get; set; }
        public int Status { get; set; }
        public string ContentReview { get; set; }
        public string Content { get; set; }

        public virtual Account Account { get; set; }
    }

    public class Document
    {
        [Key]
        public int ID { get; set; }
        public string Path { get; set; }
        public string Caption { get; set; }
        public DateTime CreateTime { get; set; }
        public int UserIDCreated { get; set; }
        public int Status { get; set; }
        public int Category { get; set; }
        public string Description { get; set; }
    }

    public class Category
    {
        public Category()
        {
            this.Services = new HashSet<Service>();
        }

        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        public string NameENG { get; set; }
        public string TitleENG { get; set; }


        public virtual ICollection<Service> Services { get; set; }

    }

    public class Service
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string NameENG { get; set; }
        public string Title { get; set; }
        public string TitleENG { get; set; }
        public string ImageURL { get; set; }
        public string ThumbnailURL { get; set; }
        public string Caption { get; set; }
        public string CaptionENG { get; set; }
        public string Introduction { get; set; }
        public string Procedure { get; set; }
        public string DocumentArrayID { get; set; }
        public int CategoryID { get; set; }
        public bool HasChild { get; set; }
        public Nullable<int> ServiceID { get; set; }
        public int Status { get; set; }
        public DateTime CreateTime { get; set; }
        public Nullable<DateTime> LastMordifiedTime { get; set; }
        public double ViewCounter { get; set; }
        public int UserID { get; set; }
        public virtual Category Category { get; set; }

    }

    public class Customer
    {

        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Fullname { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Thumbnail { get; set; }
        public string Icon { get; set; }
        public Nullable<int> Order { get; set; }
        public int Status { get; set; }
    }
}

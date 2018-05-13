namespace ICB.Business.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class WebContext : DbContext
    {
        public WebContext()
            : base("name=WebContext")
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<News> News { get; set; }
        //public virtual DbSet<RoleManager> RoleManagers { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<Support> Supports { get; set; }
        public virtual DbSet<SystemConfig> SystemConfigs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .Property(e => e.Username)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.Account)
                .HasForeignKey(e => e.UserIDCreated)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.Feedbacks)
                .WithOptional(e => e.Account)
                .HasForeignKey(e => e.UserID);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.News)
                .WithRequired(e => e.Account)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Account>()
            //    .HasMany(e => e.RoleManagers)
            //    .WithRequired(e => e.Account)
            //    .WillCascadeOnDelete(false);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.Services)
                .WithOptional(e => e.Account)
                .HasForeignKey(e => e.UserID);

            modelBuilder.Entity<Category>()
                .Property(e => e.NameENG)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.TitleENG)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Services)
                .WithRequired(e => e.Category)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Customer>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Feedback>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Service>()
                .Property(e => e.NameENG)
                .IsUnicode(false);

            modelBuilder.Entity<Service>()
                .Property(e => e.CaptionENG)
                .IsUnicode(false);

            modelBuilder.Entity<Support>()
                .Property(e => e.Phone)
                .IsUnicode(false);

            modelBuilder.Entity<Support>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Support>()
                .Property(e => e.Skype)
                .IsUnicode(false);

            modelBuilder.Entity<SystemConfig>()
                .Property(e => e.NameENG)
                .IsUnicode(false);

            modelBuilder.Entity<SystemConfig>()
                .Property(e => e.Tel)
                .IsUnicode(false);

            modelBuilder.Entity<SystemConfig>()
                .Property(e => e.Fax)
                .IsUnicode(false);

            modelBuilder.Entity<SystemConfig>()
                .Property(e => e.Hotline)
                .IsUnicode(false);
        }
    }
}

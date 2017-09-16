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
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
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
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.Documents)
                .WithOptional(e => e.Account)
                .HasForeignKey(e => e.UserIDCreated);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.Feedbacks)
                .WithRequired(e => e.Account)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.News)
                .WithOptional(e => e.Account)
                .HasForeignKey(e => e.UserID);

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

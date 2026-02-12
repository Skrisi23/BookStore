using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

public partial class BookStoreContext : DbContext
{
    public BookStoreContext(DbContextOptions<BookStoreContext> options)
        : base(options)
    {
    }

    public virtual DbSet<author> authors { get; set; }

    public virtual DbSet<book> books { get; set; }

    public virtual DbSet<copy> copies { get; set; }

    public virtual DbSet<rental> rentals { get; set; }

    public virtual DbSet<users> users { get; set; }

    public virtual DbSet<payment> payments { get; set; }

    public virtual DbSet<cart> carts { get; set; }

    public virtual DbSet<cart_item> cart_items { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("latin1_swedish_ci")
            .HasCharSet("latin1");

        modelBuilder.Entity<author>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");
        });

        modelBuilder.Entity<book>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.HasOne(d => d.author).WithMany(p => p.books)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_books_author");
        });

        modelBuilder.Entity<copy>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.Property(e => e.elerheto).HasDefaultValueSql("'1'");

            entity.HasOne(d => d.book).WithMany(p => p.copies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_copies_book");
        });

        modelBuilder.Entity<rental>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.HasOne(d => d.copy).WithMany(p => p.rentals)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_rentals_copy");

            entity.HasOne(d => d.user).WithMany(p => p.rentals)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_rentals_user");

            entity.HasOne(d => d.payment).WithMany(p => p.rentals)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("fk_rentals_payment");
        });

        modelBuilder.Entity<users>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.Property(e => e.letrehozva).HasDefaultValueSql("current_timestamp()");
        });

        modelBuilder.Entity<payment>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.HasOne(d => d.user).WithMany(p => p.payments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_payments_user");
        });

        modelBuilder.Entity<cart>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.status).HasDefaultValue("active");

            entity.HasOne(d => d.user).WithMany(p => p.carts)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_carts_user");
        });

        modelBuilder.Entity<cart_item>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.Property(e => e.added_at).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.quantity).HasDefaultValue(1);

            entity.HasOne(d => d.cart).WithMany(p => p.cart_items)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_cart_items_cart");

            entity.HasOne(d => d.copy).WithMany(p => p.cart_items)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_cart_items_copy");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

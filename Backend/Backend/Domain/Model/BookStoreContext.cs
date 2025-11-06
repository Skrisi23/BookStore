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
        });

        modelBuilder.Entity<users>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PRIMARY");

            entity.Property(e => e.letrehozva).HasDefaultValueSql("current_timestamp()");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

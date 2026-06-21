using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBookCoverField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "latin1");

            migrationBuilder.CreateTable(
                name: "authors",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nev = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nev = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    jelszo_hash = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    letrehozva = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "current_timestamp()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    cim = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    author_id = table.Column<int>(type: "int(11)", nullable: false),
                    boritokep = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    kiadasi_datum = table.Column<DateOnly>(type: "date", nullable: true),
                    tartalom = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_books_author",
                        column: x => x.author_id,
                        principalTable: "authors",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "copies",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    book_id = table.Column<int>(type: "int(11)", nullable: false),
                    leltari_szam = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    elerheto = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValueSql: "'1'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_copies_book",
                        column: x => x.book_id,
                        principalTable: "books",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "rentals",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int(11)", nullable: false),
                    copy_id = table.Column<int>(type: "int(11)", nullable: false),
                    kolcsonzes_datuma = table.Column<DateOnly>(type: "date", nullable: false),
                    visszahozva_datuma = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_rentals_copy",
                        column: x => x.copy_id,
                        principalTable: "copies",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_rentals_user",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_hungarian_ci");

            migrationBuilder.CreateIndex(
                name: "author_id",
                table: "books",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "book_id",
                table: "copies",
                columns: new[] { "book_id", "elerheto" });

            migrationBuilder.CreateIndex(
                name: "leltari_szam",
                table: "copies",
                column: "leltari_szam",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "copy_id",
                table: "rentals",
                columns: new[] { "copy_id", "visszahozva_datuma" });

            migrationBuilder.CreateIndex(
                name: "user_id",
                table: "rentals",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "email",
                table: "users",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "rentals");

            migrationBuilder.DropTable(
                name: "copies");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropTable(
                name: "authors");
        }
    }
}

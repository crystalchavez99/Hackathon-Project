using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learning.API.Migrations
{
    /// <inheritdoc />
    public partial class FixAssociations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_User_StudentId",
                table: "Enrollments");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_User_StudentId",
                table: "Enrollments",
                column: "StudentId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_User_StudentId",
                table: "Enrollments");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_User_StudentId",
                table: "Enrollments",
                column: "StudentId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

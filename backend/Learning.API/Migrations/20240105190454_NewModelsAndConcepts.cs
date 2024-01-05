using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learning.API.Migrations
{
    /// <inheritdoc />
    public partial class NewModelsAndConcepts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_User_TeacherId",
                table: "Courses");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_User_TeacherId",
                table: "Courses",
                column: "TeacherId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_User_TeacherId",
                table: "Courses");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_User_TeacherId",
                table: "Courses",
                column: "TeacherId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

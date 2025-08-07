using InstituteApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace InstituteApi.Data
{
    public class InstituteDbContext : DbContext
    {
        public InstituteDbContext(DbContextOptions<InstituteDbContext> options) : base(options)
        {
        }

        public DbSet<StudentComplaint> StudentComplaints { get; set; }
    }
}
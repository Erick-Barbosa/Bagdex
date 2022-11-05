using Microsoft.EntityFrameworkCore;
using Bagdex.Models;

namespace Bagdex.Data
{
    public class BagdexContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public BagdexContext(IConfiguration configuration) 
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        public DbSet<Bagmon>? Bagmon { get; set; }
    }
}
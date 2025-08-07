using InstituteApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace InstituteApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ? Register your MySQL DbContext
            builder.Services.AddDbContext<InstituteDbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("InstituteDb"),
                    new MySqlServerVersion(new Version(8, 0, 3))
                )
            );

            // ? Configure JWT authentication
            var jwtSecret = builder.Configuration["Jwt:Secret"];
            if (string.IsNullOrEmpty(jwtSecret))
            {
                throw new ArgumentNullException("Jwt:Secret is missing in appsettings.json");
            }
            var key = Encoding.UTF8.GetBytes(jwtSecret);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),

                        // ? This tells ASP.NET Core to treat "role" claim as roles
                        RoleClaimType = "role"
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine($"JWT validation failed: {context.Exception.Message}");
                            return Task.CompletedTask;
                        }
                    };
                });

            builder.Services.AddAuthorization();

            // ? Add Swagger with JWT support
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Institute API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.Use(async (context, next) =>
            {
                var user = context.User;
                if (user?.Identity?.IsAuthenticated == true)
                {
                    var claims = string.Join(", ", user.Claims.Select(c => $"{c.Type}={c.Value}"));
                    Console.WriteLine($"Authenticated User Claims: {claims}");
                }
                await next();
            });


            app.Run();
        }
    }
}
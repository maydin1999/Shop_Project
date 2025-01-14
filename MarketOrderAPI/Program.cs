using MarketOrderAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Logging ayarları
builder.Logging.ClearProviders(); // Varsayılan log sağlayıcıları temizleniyor
builder.Logging.AddConsole();    // Konsola log ekleniyor

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Veritabanı bağlantısı
builder.Services.AddDbContext<MarketDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// JSON Döngüleri için Ayarlar
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; // Döngüleri yok say
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // PascalCase korumak için
    });


var app = builder.Build();

// Hata sayfası
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();
app.Run();

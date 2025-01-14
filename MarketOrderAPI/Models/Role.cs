using System.Text.Json.Serialization;

namespace MarketOrderAPI.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

    [JsonIgnore] // Döngüyü önlemek için Users'ı serileştirmeden hariç tutar
    public ICollection<User> Users { get; set; }
    }
}

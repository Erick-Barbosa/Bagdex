namespace Bagdex.Models
{
    public class Bagmon
    {
        public int id { get; set; }
        public String? name { get; set; }
        public String? type1 { get; set; }
        public String? type2 { get; set; }
        public String? type3 { get; set; }
        public String? ability { get; set; }
        public String? weakness { get; set; }
        public String? description { get; set; }
        public String? image { get; set; }
        public int health_points { get; set; }
        public int attack { get; set; }
        public int defense { get; set; }
        public int special_attack { get; set; }
        public int special_defense { get; set; }
        public int speed { get; set; }
        public String? min_height { get; set; }
        public String? max_height { get; set; }
        public String? min_weight { get; set; }
        public String? max_weight { get; set; }
    }
}
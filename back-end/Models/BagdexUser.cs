namespace Bagdex.Models
{
    public class BagdexUser
    {
        public int id { get; set;}
        public String? username { get; set; }
        public String? password { get; set;}
        public String? role { get; set;}
        public int permission_level { get;  set;}
    }
}
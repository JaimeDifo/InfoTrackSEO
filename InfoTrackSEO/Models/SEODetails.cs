namespace InfoTrackSEOApplication.Models
{
    public class SEODetails
    {
        public int Id { get; set; } 
        public string? SearchTerm { get; set; }
        public string? SearchEngine { get; set; }
        public string? Url { get; set; } 
        public string? Page { get; set; }    
        public DateTime DateSearched { get; set; } 
   
    }
}

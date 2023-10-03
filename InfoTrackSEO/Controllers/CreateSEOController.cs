using InfoTrackSEOApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace InfoTrackSEOApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateSEOController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CreateSEOController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Post(SEODetails seo)
        {
            try
            {
                string query = @"
                    INSERT INTO dbo.InfoTrackSEO (SearchTerm, SearchEngine, Url, Page, DateSearched)
                    VALUES (@SearchTerm, @SearchEngine, @Url, @Page, @DateSearched)
                ";

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SEOAppCon")))
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        command.Parameters.AddWithValue("@SearchTerm", seo.SearchTerm);
                        command.Parameters.AddWithValue("@SearchEngine", seo.SearchEngine);
                        command.Parameters.AddWithValue("@Url", seo.Url);
                        command.Parameters.AddWithValue("@Page", seo.Page);
                        command.Parameters.AddWithValue("@DateSearched", seo.DateSearched);
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("SEO details created successfully.");
                        }
                        else
                        {
                            return BadRequest("Error, Failed to create SEO details.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}

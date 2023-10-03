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
    public class UpdateSEOController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UpdateSEOController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] SEODetails seo)
        {
            try
            {
                // Added to ensure the ID matches if not goes to bad requesgt.
                if (id != seo.Id)
                {
                    return BadRequest("ID in the URL does not match the ID in the request body.");
                }

                string query = @"
                    UPDATE dbo.InfoTrackSEO
                    SET SearchTerm = @SearchTerm,
                        SearchEngine = @SearchEngine,
                        Url = @Url,
                        Page = @Page,
                        DateSearched = @DateSearched
                    WHERE Id = @Id
                ";

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SEOAppCon")))
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        command.Parameters.AddWithValue("@Id", seo.Id); // Use the ID from the request body
                        command.Parameters.AddWithValue("@SearchTerm", seo.SearchTerm);
                        command.Parameters.AddWithValue("@SearchEngine", seo.SearchEngine);
                        command.Parameters.AddWithValue("@Url", seo.Url);
                        command.Parameters.AddWithValue("@Page", seo.Page);
                        command.Parameters.AddWithValue("@DateSearched", seo.DateSearched);
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("SEO details updated successfully."); //success return if updated.
                        }
                        else
                        {
                            return NotFound("SEO details not found for the provided ID."); ////Error Handling Not found if SEO record is not present
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}"); //Error Handling
            }
        }
    }
}

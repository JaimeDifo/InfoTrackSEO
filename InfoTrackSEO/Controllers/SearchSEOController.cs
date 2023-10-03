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
    public class SearchSEOController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SearchSEOController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{SearchTerm}")]
        public IActionResult Get(string SearchTerm) // Fetch data with condition request
        {
            try
            {
                string query = @"
                    SELECT * FROM dbo.InfoTrackSEO
                    WHERE SearchTerm LIKE @SearchTerm
                ";

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SEOAppCon"))) //Connecting to database
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        command.Parameters.AddWithValue("@SearchTerm", $"%{SearchTerm}%");
                        SqlDataReader reader = command.ExecuteReader();

                        DataTable dataTable = new DataTable();
                        dataTable.Load(reader);
                        reader.Close();

                        return Ok(dataTable); // return the data
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}"); //Error handling
            }
        }
    }
}

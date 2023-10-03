using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace InfoTrackSEOApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewSEOController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ViewSEOController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get() // Fetch Data request
        {
            try
            {
                string query = @"
                    SELECT * FROM dbo.InfoTrackSEO
                ";

                DataTable dataTable = new DataTable();
                string? sqlDataSource = _configuration.GetConnectionString("SEOAppCon"); //Connecting to the database

                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();

                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        using (SqlDataReader myReader = myCommand.ExecuteReader())
                        {
                            dataTable.Load(myReader);
                        }
                    }
                }

                return Ok(dataTable); // Result is returned as Ok
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}"); //Error Handling
            }
        }
    }
}

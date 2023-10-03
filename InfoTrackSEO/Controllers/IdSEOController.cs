using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace InfoTrackSEOApplication.Controllers
{
    [Route("api/[controller]")]
    public class IdSEOController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public IdSEOController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) 
        {
            try
            {
                string query = @"
                    SELECT * FROM dbo.InfoTrackSEO
                    WHERE Id = @Id
                ";
                DataTable dataTable = new DataTable();
                string? sqlDataSource = _configuration.GetConnectionString("SEOAppCon");

                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@Id", id); 
                        SqlDataReader myReader = myCommand.ExecuteReader();
                        dataTable.Load(myReader);
                        myReader.Close();
                    }
                }

                if (dataTable.Rows.Count == 0) //Error Handling
                {
                    return NotFound(); 
                }

                return Ok(dataTable);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}"); //Error Handling
            }
        }
    }
}

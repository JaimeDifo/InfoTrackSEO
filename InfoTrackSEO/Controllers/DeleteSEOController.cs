using InfoTrackSEOApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data;
using System.Data.SqlClient;

namespace InfoTrackSEOApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteSEOController : Controller
    {

        private readonly IConfiguration _configuration;

        public DeleteSEOController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) //delete record request
        {
            try
            {
                string query = @"
                    DELETE FROM dbo.InfoTrackSEO 
                    WHERE Id = @Id
                    ";
                DataTable dataTable = new DataTable();
                string? sqlDataSource = _configuration.GetConnectionString("SEOAppCon"); //Connecting to database

                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@Id", id);
                        myCommand.ExecuteNonQuery();
                    }

                    return Ok(); //A 200 response is return on successful excution
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

        }
    }

}

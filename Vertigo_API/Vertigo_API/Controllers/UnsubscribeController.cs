using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Website_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    public class UnsubscribeController : ControllerBase
    {
        [HttpDelete("{email}")]
        public IActionResult UnsubscribeUser(string email)
        {
            string connectionString =
                @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False";
            string query = "DELETE FROM FormData WHERE email = @Email";
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Email", email);
                        int rowsAffected = command.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return Ok("User successfully unsubscribed.");
                        }
                        else
                        {
                            return NotFound("User With The Specified Email Not Found.");
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
}
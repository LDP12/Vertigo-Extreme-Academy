using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Website_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddFormData(LoginInfoModel model)
        {
            using (SqlConnection connection =
                   new SqlConnection(
                       @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False"))
            using (SqlCommand command = new SqlCommand("SELECT * FROM FormData WHERE email = @Email", connection))
            {
                command.Parameters.AddWithValue("@Email", model.Email);
                try
                {
                    connection.Open();
                    
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (!reader.HasRows)
                        {
                            return BadRequest("User Not Found!");
                        }

                        reader.Read();
                        if (reader["password"].ToString() != model.Password)
                        {
                            return BadRequest("Invalid Email or Password!");
                        }

                        return Ok("Login Successful!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest("An Error Occurred While Processing Your Request: " + ex.Message);
                }
            }
        }

        public class LoginInfoModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
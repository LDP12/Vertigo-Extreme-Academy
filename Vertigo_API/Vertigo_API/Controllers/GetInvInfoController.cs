using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Website_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    public class GetInvInfoController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddGetInvData(GetInvInfoModel model)
        {
            string connectionString =
                @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False";
            string query =
                "INSERT INTO GetInvData (Name, Surname, Age, PhoneNumber, Email, Gender, Profession, Ethnicity, Province, Comments) VALUES (@Name, @Surname, @Age, @PhoneNumber, @Email, @Gender, @Profession, @Ethnicity, @Province, @Comments)";
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Name", model.Name);
                        command.Parameters.AddWithValue("@Surname", model.Surname);
                        command.Parameters.AddWithValue("@Age", model.Age);
                        command.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber);
                        command.Parameters.AddWithValue("@Email", model.Email);
                        command.Parameters.AddWithValue("@Gender", model.Gender);
                        command.Parameters.AddWithValue("@Profession", model.Profession);
                        command.Parameters.AddWithValue("@Ethnicity", model.Ethnicity);
                        command.Parameters.AddWithValue("@Province", model.Province);
                        command.Parameters.AddWithValue("@Comments", model.AdditionalInfo);
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Data Added Successfully.");
                        }
                        else
                        {
                            return BadRequest("Failed to Add Data.");
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
        
        [HttpGet]
        public IActionResult GetAllGetInvData()
        {
            List<GetInvInfoModel> getInvInfoList = new List<GetInvInfoModel>();

            string connectionString =
                @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False";
            string query = "SELECT * FROM GetInvData";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            getInvInfoList.Add(new GetInvInfoModel
                            {
                                Name = reader["Name"].ToString(),
                                Surname = reader["Surname"].ToString(),
                                Age = Convert.ToInt32(reader["Age"]),
                                PhoneNumber = Convert.ToInt32(reader["PhoneNumber"]),
                                Email = reader["Email"].ToString(),
                                Gender = reader["Gender"].ToString(),
                                Profession = reader["Gender"].ToString(),
                                Ethnicity = reader["Ethnicity"].ToString(),
                                Province = reader["Province"].ToString(),
                                AdditionalInfo = reader["Comments"].ToString()
                            });
                        }
                    }
                }

                return Ok(getInvInfoList);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        public class GetInvInfoModel
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public int Age { get; set; }
            public int PhoneNumber { get; set; }
            public string Email { get; set; }
            public string Gender { get; set; }
            public string Profession { get; set; }
            public string Ethnicity { get; set; }
            public string Province { get; set; }
            public string AdditionalInfo { get; set; }
        }
    }
}
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MimeKit;

namespace Website_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    
    public class PersonalInfoController : ControllerBase
    {
        private const string VoucherChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        private string GetRandomizedVoucherCode(int length)
        {
            var random = new Random();
            char[] voucherCode = new char[length];
             for (int i = 0; i < length; i++)
            {
                voucherCode[i] = VoucherChars[random.Next(VoucherChars.Length)];
            }
            return new string(voucherCode);
        }

        private async Task SendVoucherEmailAsync(string email, string voucherCode)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Vertigo Extreme Academy", "vertigoextacademy@gmail.com"));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Welcome to Vertigo Extreme Academy";
             message.Body = new TextPart("plain")
            {
                Text = $"Welcome to Vertigo Extreme Academy. Thank you for your interest and for signing up. Please find a Voucher Code below that can be used to gain your first month at the Academy free of charge. See you soon! Voucher Code: {voucherCode}"
            };
             using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("vertigoextacademy@gmail.com", "ahuzzdwmaaiwldmc");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> AddFormData(PersonalInfoModel model)
        {
            string connectionString =
                @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False";
            string query =
                "INSERT INTO FormData (Name, Surname, Age, Gender, Province, Email, Password, Comments) VALUES (@Name, @Surname, @Age, @Gender, @Province, @Email, @Password, @Comments)";
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
                        command.Parameters.AddWithValue("@Gender", model.Gender);
                        command.Parameters.AddWithValue("@Province", model.Province);
                        command.Parameters.AddWithValue("@Email", model.Email);
                        command.Parameters.AddWithValue("@Password", model.Password);
                        command.Parameters.AddWithValue("@Comments", model.AdditionalInfo);
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            string voucherCode = GetRandomizedVoucherCode(8);
                            await SendVoucherEmailAsync(model.Email, voucherCode);
                            return Ok("User Created Successfully. Check You Emails for Your Voucher Code!");
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
        public IActionResult GetAllFormData()
        {
            List<PersonalInfoModel> personalInfoList = new List<PersonalInfoModel>();

            string connectionString =
                @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False";
            string query = "SELECT * FROM FormData";

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
                            personalInfoList.Add(new PersonalInfoModel
                            {
                                Name = reader["Name"].ToString(),
                                Surname = reader["Surname"].ToString(),
                                Age = Convert.ToInt32(reader["Age"]),
                                Gender = reader["Gender"].ToString(),
                                Province = reader["Province"].ToString(),
                                Email = reader["Email"].ToString(),
                                Password = reader["Password"].ToString(),
                                AdditionalInfo = reader["Comments"].ToString()
                            });
                        }
                    }
                }

                return Ok(personalInfoList);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        public class PersonalInfoModel
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public int Age { get; set; }
            public string Gender { get; set; }
            public string Province { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string AdditionalInfo { get; set; }
        }
    }
}
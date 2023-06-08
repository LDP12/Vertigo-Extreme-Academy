using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
 
namespace Website_API.Controllers
{
    [EnableCors]
    [Route("[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private const string ConnectionString = @"Data Source=LDP-ROG-STRIX;Initial Catalog=DropDown_DB;Integrated Security=True;Encrypt=False";

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            if (image == null)
            {
                return BadRequest("Invalid Request Type");
            }
            var fileName = image.FileName.Trim('\"');
            var imageData = ImageToBinary(Image.FromStream(image.OpenReadStream()));
            using (var sqlConn = new SqlConnection(ConnectionString))
            {
                await sqlConn.OpenAsync();
                using (var sqlCommand = new SqlCommand("INSERT INTO PersonalImages (ImageName, ImageData) OUTPUT INSERTED.Id VALUES (@Name, @Data)", sqlConn))
                {
                    sqlCommand.Parameters.AddWithValue("@Name", fileName);
                    sqlCommand.Parameters.AddWithValue("@Data", imageData);
                    var newImageId = await sqlCommand.ExecuteScalarAsync();
                    return Ok(new { id = newImageId });
                }
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetImages()
        {
            using (var sqlConn = new SqlConnection(ConnectionString))
            {
                await sqlConn.OpenAsync();
                using (var sqlCommand = new SqlCommand("SELECT Id, ImageName, ImageData FROM PersonalImages", sqlConn))
                {
                    using (var sqlReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        var images = new List<object>();
                        while (await sqlReader.ReadAsync())
                        {
                            byte[] imageData = sqlReader["ImageData"] as byte[];
                            string base64ImageData = Convert.ToBase64String(imageData);
                            images.Add(new
                            {
                                Id = sqlReader.GetInt32(0),
                                ImageName = sqlReader.GetString(1),
                                ImageData = base64ImageData
                            });
                        }
                        return Ok(images);
                    }
                }
            }
        }

        private static byte[] ImageToBinary(Image img)
        {
            using (var stream = new MemoryStream())
            {
                img.Save(stream, ImageFormat.Jpeg);
                return stream.ToArray();
            }
        }
    }
}
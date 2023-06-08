namespace Website_API.Controllers;

public static class Extensions
{
    public static byte[] ReadAllBytes(this Stream input)
    {
        using (MemoryStream ms = new MemoryStream())
        {
            input.CopyTo(ms);
            return ms.ToArray();
        }
    }
}
namespace HumanResourcesManagement.DTOS.Request
{
    public class UploadImageRequest
    {
        public string maNV { get; set; }
        public IFormFile file { get; set; }
    }
}

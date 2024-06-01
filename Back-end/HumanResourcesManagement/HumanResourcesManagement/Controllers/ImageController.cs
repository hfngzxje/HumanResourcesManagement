using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IImageService _imageService;

        public ImageController(NhanSuContext context, IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImage([FromForm]UploadImageRequest req)
        {
            try
            {
                await _imageService.UploadImage(req);
                return StatusCode(200, "upload anh thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getImage")]
        public async Task<IActionResult> GetImage(string maNV)
        {
            try
            {
               var base64 = await _imageService.GetImageByMaNV(maNV);
                return StatusCode(200, base64);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly INhanVienService _nhanVienService;

        public NhanVienController(INhanVienService nhanVienService)
        {
            _nhanVienService = nhanVienService;
        }

        [HttpGet]
        public IActionResult GetAllNhanVien()
        {
            var nhanVien = _nhanVienService.GetAllNhanVien();
            return Ok(nhanVien);
        }

        [HttpPost("TaoMoiNhanVien")]
        public IActionResult CreateNhanVien([FromBody] NhanVienRequest request)
        {
            try
            {
                _nhanVienService.AddNhanVien(request);
                return Ok("Them moi nhan vien thanh cong!!");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ChinhSuaNhanVien/{id}")]
        public IActionResult UpdateNhanVien(string id, [FromBody] NhanVienRequest nhanVienRequest)
        {
            try
            {
                _nhanVienService.UpdateNhanVien(id, nhanVienRequest);
                return Ok("Update thanh cong!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete("xoaNhanVien/{id}")]
        public IActionResult DeleteNhanVien(string id)
        {
            try
            {
                _nhanVienService.DeleteNhanVien(id);
                return Ok("Xóa nhân viên thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}

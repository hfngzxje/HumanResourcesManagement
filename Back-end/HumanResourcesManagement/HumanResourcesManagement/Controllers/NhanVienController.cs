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

        [HttpGet("id")]
        public IActionResult GetNhanVienById(string id)
        {
            try
            {
                var nhanVien = _nhanVienService.GetNhanVienById(id);
                return Ok(nhanVien);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
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

        [HttpGet("getDanTocById/{id}")]
        public IActionResult GetDanTocById(int id)
        {
            try
            {
                var danToc = _nhanVienService.GetDanTocById(id);
                return Ok(danToc);
            }catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");

            }
        }

        [HttpGet("getTonGiaoById/{id}")]
        public IActionResult GetTonGiaoById(int id)
        {
            try
            {
                var tonGiao = _nhanVienService.GetTonGiaoById(id);
                return Ok(tonGiao);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");

            }
        }

        [HttpGet("getNgachCongChucById/{id}")]
        public IActionResult GetNgachCongChucById(int id)
        {
            try
            {
                var congChuc = _nhanVienService.GetNgachCongChucById(id);
                return Ok(congChuc);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");

            }
        }

        [HttpGet("getPhongById/{id}")]
        public IActionResult GetPhongById(int id)
        {
            try
            {
                var phong = _nhanVienService.GetPhongBanById(id);
                return Ok(phong);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");

            }
        }

        [HttpGet("getToById/{id}")]
        public IActionResult GetToById(int id)
        {
            try
            {
                var to = _nhanVienService.GetToById(id);
                return Ok(to);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");

            }
        }

        [HttpGet("getChucVuById/{id}")]
        public IActionResult getChucVuById(int id)
        {
            try
            {
                var chucVu = _nhanVienService.GetChucVuById(id);
                return Ok(chucVu);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");

            }
        }
    }
}

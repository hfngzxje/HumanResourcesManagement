using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
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
            try
            {
                var nhanVien = _nhanVienService.GetAllNhanVien();
                return Ok(nhanVien);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TaoMoiNhanVien")]
        public async Task<IActionResult> CreateNhanVien([FromBody] NhanVienRequest request)
        {
            try
            {
                await _nhanVienService.AddNhanVienAsync(request);
                return Ok("Thêm mới nhân viên thành công!!");
            }
            catch (Exception ex)
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
                return Ok("Update thành công!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<NhanVienResponse>> GetById([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Mã nhân viên không được để trống.");
            }

            try
            {
                var nhanVien = await _nhanVienService.GetNhanVienByIdAsync(id);
                return Ok(nhanVien);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
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
            }
            catch (Exception ex)
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
        public IActionResult GetChucVuById(int id)
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

        [HttpGet("danToc")]
        public IActionResult GetAllDanToc()
        {
            try
            {
                var danToc = _nhanVienService.GetAllDanToc();
                return Ok(danToc);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("tonGiao")]
        public IActionResult GetAllTonGiao()
        {
            try
            {
                var tonGiao = _nhanVienService.GetAllTonGiao();
                return Ok(tonGiao);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("chucDanh")]
        public IActionResult GetAllChucDanh()
        {
            try
            {
                var chucDanh = _nhanVienService.GetAllChucDanh();
                return Ok(chucDanh);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("ngachCongChuc")]
        public IActionResult GetAllNgachCongChuc()
        {
            try
            {
                var ngachCongChuc = _nhanVienService.GetAllNgachCongChuc();
                return Ok(ngachCongChuc);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("phong")]
        public IActionResult GetAllPhong()
        {
            try
            {
                var phong = _nhanVienService.GetAllPhong();
                return Ok(phong);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("to")]
        public IActionResult GetAllTo()
        {
            try
            {
                var to = _nhanVienService.GetAllTo();
                return Ok(to);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("getByPhongBan")]
        public async Task<IActionResult> GetByPhongBan(int idPhong, bool? gioiTinh)
        {
            try
            {
                var list = await _nhanVienService.getNhanVienByPhongBan(idPhong, gioiTinh);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Search")]
        public async Task<ActionResult<List<TblNhanVien>>> SearchNhanVien([FromQuery] string? search)
        {
            try
            {
                var nhanViens = await _nhanVienService.SearchNhanVienAsync(search);

                if (nhanViens == null || nhanViens.Count == 0)
                {
                    return NotFound("Không có nhân viên nào!!");
                }

                return Ok(nhanViens);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrinhDoVanHoaController : ControllerBase
    {
        private readonly ITrinhDoVanHoaService _trinhDoVanHoaService;
        private readonly NhanSuContext _context;

        public TrinhDoVanHoaController(ITrinhDoVanHoaService trinhDoVanHoaService, NhanSuContext context)
        {
            _trinhDoVanHoaService = trinhDoVanHoaService;
            _context = context;
        }

        [HttpGet("getTrinhDoVanHoaByMaNV/{maNV}")]
        public async Task<IActionResult> GetTrinhDoVanHoaByMaNV(string maNV)
        {
            try
            {
                var listTrinhDoVanHoa = await _trinhDoVanHoaService.GetTrinhDoVanHoaByMaNV(maNV);
                return Ok(listTrinhDoVanHoa);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu." });
            }
        }

        [HttpGet("getTrinhDoVanHoaById/{id}")]
        public async Task<IActionResult> GetTrinhDoVanHoaById(int id)
        {
            try
            {
                var resp = await _trinhDoVanHoaService.GetTrinhDoVanHoaById(id);
                return Ok(resp);
            }catch(Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("addTrinhDoVanHoa")]
        public async Task<IActionResult> AddTrinhDoVanHoa([FromBody] InsertTrinhDoVanHoaRequest req)
        {
            try
            {
                var newTrinhDoVanHoa = await _trinhDoVanHoaService.AddTrinhDoVanHoa(req);
                return StatusCode(200, "Thêm thành công");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(502, ex.Message);
            }
        }

        [HttpDelete("deleteTrinhDoVanHoa/{id}")]
        public async Task<IActionResult> DeleteTrinhDoVanHoa(int id)
        {
            try
            {
                await _trinhDoVanHoaService.DeleteTrinhDoVanHoa(id);
                return StatusCode(200, "Xóa thành công");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "Không tìm thấy");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updateTrinhDoVanHoa")]
        public async Task<IActionResult> UpdateTrinhDoVanHoa([FromBody] UpdateTrinhDoVanHoaRequest req)
        {
            try
            {
                await _trinhDoVanHoaService.UpdateTrinhDoVanHoa(req);
                return StatusCode(200, "Sửa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

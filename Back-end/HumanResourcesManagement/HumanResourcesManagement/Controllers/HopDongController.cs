using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HopDongController : ControllerBase
    {
        private readonly IHopDongService _hopDongService;
        private readonly NhanSuContext _context;

        public HopDongController(IHopDongService hopDongService, NhanSuContext context)
        {
            _hopDongService = hopDongService;
            _context = context;
        }


        [HttpPost("TaoMoiHopDong")]
        public IActionResult CreateHopDong([FromBody] HopDongRequest request)
        {
            try
            {
                _hopDongService.TaoHopDong(request);
                return Ok("Toa hop dong thanh cong!!");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("SuaMoiHopDong/{id}")]
        public IActionResult UpdateHopDong(string id, [FromBody] HopDongRequest request)
        {
            try
            {
                _hopDongService.SuaHopDong(id, request);
                return Ok("Update thanh cong!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete("xoaHopDong/{id}")]
        public IActionResult DeleteHopDong(string id)
        {
            try
            {
                _hopDongService.XoaHopDong(id);
                return Ok("Xóa hợp đồng thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet]
        public IActionResult GetAllHopDong()
        {
            var hopDong = _hopDongService.GetAllHopDong();
            return Ok(hopDong);
        }

        [HttpGet("id")]
        public IActionResult GetHopDongByMaHopDong(string id)
        {
            try
            {
                var hopDong = _hopDongService.GetHopDongByMaHopDong(id);
                return Ok(hopDong);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }
    }
}

using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichSuHoatDongController : ControllerBase
    {
        private readonly ILichSuHoatDongService _lichSuHoatDongService;
        private readonly NhanSuContext _context;

        public LichSuHoatDongController(ILichSuHoatDongService lichSuHoatDongService, NhanSuContext context)
        {
            _lichSuHoatDongService = lichSuHoatDongService;
            _context = context;
        }

        [HttpPost]
        public IActionResult AddLichSuHoatDong([FromBody] LichSuHoatDongRequest request)
        {
            try
            {
                _lichSuHoatDongService.AddLichSuHoatDong(request);
                return Ok("Thêm mới thành công.");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var result = _lichSuHoatDongService.GetAll();
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetDetails(int id)
        {
            try
            {
                var result = _lichSuHoatDongService.GetDetails(id);
                if (result == null) return NotFound("Không tìm thấy lịch sử hoạt động.");
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var success = _lichSuHoatDongService.Delete(id);
                if (!success) return NotFound("Không tìm thấy lịch sử hoạt động.");

                return Ok("Xóa thành công.");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


    }
}

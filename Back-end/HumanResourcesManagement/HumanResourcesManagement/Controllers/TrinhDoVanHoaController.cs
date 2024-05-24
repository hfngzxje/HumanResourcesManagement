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

            var listTrinhDoVanHoa = await _trinhDoVanHoaService.GetTrinhDoVanHoaByMaNV(maNV);
            return Ok(listTrinhDoVanHoa);

        }

       
        [HttpPost("addTrinhDoVanHoa")]
        public async Task<IActionResult> AddTrinhDoVanHoa([FromBody] InsertTrinhDoVanHoaRequest req)
        {
            try
            {
                var newTrinhDoVanHoa = await _trinhDoVanHoaService.AddTrinhDoVanHoa(req);
                return StatusCode(200, "add thanh cong");
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
                return StatusCode(200, "xoa thanh cong");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "khong tim thay");
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
                return StatusCode(200, "sua thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucNgachCongChucController : ControllerBase
    {
        private readonly INgachCongChucService _ngachCongChucService;
        public DanhMucNgachCongChucController(INgachCongChucService ngachCongChucService)
        {
            _ngachCongChucService = ngachCongChucService;
        }

        [HttpGet("getAllNgachCongChuc")]
        public async Task<IActionResult> GetAllNgachCongChuc()
        {
            try
            {
                var data = await _ngachCongChucService.GetAllNgachCongChuc();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetNgachCongChucById(int id)
        {
            try
            {
                var data = await _ngachCongChucService.GetNgachCongChucById(id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("ThemNgachCongChuc")]
        public async Task<IActionResult> AddNgachCongChuc(InsertNgachCongChuc req)
        {
            try
            {
                var data = await _ngachCongChucService.AddNgachCongChuc(req);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPut("SuaNgachCongChuc")]
        public async Task<IActionResult> UpdateNgachCongChuc(UpdateNgachCongChucRequest req)
        {
            try
            {
                var data = await _ngachCongChucService.UpdateNgachCongChuc(req);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("XoaNgachCongChuc")]
        public async Task<IActionResult> DeleteNgachCongChuc(int id)
        {
            try
            {
                await _ngachCongChucService.DeleteNgachCongChuc(id);
                return StatusCode(200, Ok());
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

    }
}

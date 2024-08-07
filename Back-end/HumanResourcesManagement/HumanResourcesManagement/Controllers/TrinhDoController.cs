﻿using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrinhDoController : ControllerBase
    {
        private readonly ITrinhDoService _trinhDoService;
        private readonly NhanSuContext _context;

        public TrinhDoController(ITrinhDoService trinhDoService, NhanSuContext context)
        {
            _trinhDoService = trinhDoService;
            _context = context;
        }

        [HttpGet("getTrinhDo")]
        public async Task<IActionResult> GetTrinhDo()
        {
            try
            {
                var listTrinhDo = await _trinhDoService.GetTrinhDo();
                return Ok(listTrinhDo);
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

        [HttpGet("getTrinhDoById/{id}")]
        public async Task<IActionResult> GetTrinhDoById(int id)
        {
            try
            {
                var trinhDo = await _trinhDoService.GetTrinhDoById(id);
                return Ok(trinhDo);
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

        [HttpPost("addTrinhDo")]
        public async Task<IActionResult> AddTrinhDo([FromBody] TrinhDoRequest req)
        {
            try
            {
                await _trinhDoService.AddTrinhDo(req);
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

        [HttpDelete("deleteTrinhDo/{id}")]
        public async Task<IActionResult> DeleteTrinhDo(int id)
        {
            try
            {
                await _trinhDoService.DeleteTrinhDo(id);
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

        [HttpPut("updateTrinhDo/{id}")]
        public async Task<IActionResult> UpdateTrinhDo([FromBody] TrinhDoRequest req, int id)
        {
            try
            {
                await _trinhDoService.UpdateTrinhDo(req, id);
                return StatusCode(200, "Sửa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

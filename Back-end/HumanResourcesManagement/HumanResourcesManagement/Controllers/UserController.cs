using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly NhanSuContext _context;

        public UserController(IUserService userService, NhanSuContext context)
        {
            _userService = userService;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }
        //test 2
        [HttpGet]
        public IActionResult GetAllUsers2()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }
    }
}

using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NgachCongChucController : ControllerBase
    {
        private readonly INgachCongChucService _ngachCongChucService;
        public NgachCongChucController(INgachCongChucService ngachCongChucService)
        {
            _ngachCongChucService = ngachCongChucService;
        }


    }
}

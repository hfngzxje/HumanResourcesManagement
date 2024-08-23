using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DangNhapControllerTests
    {
        private Mock<IDangNhapService> _dangNhapServiceMock;
        private DangNhapController _controller;
        private DefaultHttpContext _httpContext;

        [SetUp]
        public void Setup()
        {
            _dangNhapServiceMock = new Mock<IDangNhapService>();
            _controller = new DangNhapController(null, _dangNhapServiceMock.Object);

            // Set up the HttpContext for session handling
            _httpContext = new DefaultHttpContext();
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = _httpContext
            };
        }

        // Login test
        [Test]
        public async Task Login_ReturnsOkResult_WithValidCredentials()
        {
            // Arrange
            var request = new DangNhapRequest { MaNhanVien = "NV001", MatKhau = "password" };
            var nhanVien = new TblNhanVien
            {
                Ma = "NV001",
                Ten = "Nguyen Van A",
                Email = "nguyenvana@example.com",
                VaiTroId = 1
            };

            _dangNhapServiceMock.Setup(s => s.AuthenticateAsync(request.MaNhanVien, request.MatKhau))
                .ReturnsAsync(nhanVien);

            // Act
            var result = await _controller.Login(request);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var response = okResult.Value as dynamic;

            Assert.AreEqual("Đăng nhập thành công", response.Message);
            Assert.AreEqual(nhanVien.Ma, response.NhanVien.Ma);
            Assert.AreEqual(nhanVien.Ten, response.NhanVien.Ten);
            Assert.AreEqual(nhanVien.Email, response.NhanVien.Email);
            Assert.AreEqual(nhanVien.VaiTroId, response.NhanVien.VaiTroId);

            // Verify session values
            Assert.AreEqual(request.MaNhanVien, _httpContext.Session.GetString("MaNhanVien"));
            Assert.AreEqual(nhanVien.VaiTroId, _httpContext.Session.GetInt32("VaiTroId"));
        }

        [Test]
        public async Task Login_ReturnsBadRequest_WhenCredentialsAreInvalid()
        {
            // Arrange
            var request = new DangNhapRequest { MaNhanVien = "NV001", MatKhau = "wrongpassword" };
            _dangNhapServiceMock.Setup(s => s.AuthenticateAsync(request.MaNhanVien, request.MatKhau))
                .ReturnsAsync((TblNhanVien)null);

            // Act
            var result = await _controller.Login(request);

            // Assert
            Assert.IsInstanceOf<UnauthorizedObjectResult>(result);
            var unauthorizedResult = result as UnauthorizedObjectResult;
            Assert.AreEqual("Mã nhân viên hoặc mật khẩu không đúng.", unauthorizedResult.Value);
        }

        [Test]
        public async Task ChangePassword_ReturnsOkResult_WhenChangeIsSuccessful()
        {
            // Arrange
            var request = new DoiMatKhauRequest { MaNhanVien = "NV001", MatKhauCu = "oldpassword", MatKhauMoi = "newpassword", XacNhanMatKhauMoi = "newpassword" };

            // Act
            var result = await _controller.ChangePassword(request);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Đổi mật khẩu thành công.", okResult.Value);
        }

        [Test]
        public async Task ChangePassword_ReturnsBadRequest_WhenDataIsInvalid()
        {
            // Arrange
            var request = new DoiMatKhauRequest { MaNhanVien = "NV001", MatKhauCu = "", MatKhauMoi = "newpassword", XacNhanMatKhauMoi = "" };

            // Act
            var result = await _controller.ChangePassword(request);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("Tất cả cần được điền.", badRequestResult.Value);
        }

        [Test]
        public async Task ForgotPassword_ReturnsOkResult_WhenEmailIsValid()
        {
            // Arrange
            var email = "nguyenvana@example.com";

            // Act
            var result = await _controller.ForgotPassword(email);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Email xác nhận đã được gửi.", okResult.Value);
        }

        [Test]
        public async Task ForgotPassword_ReturnsBadRequest_WhenEmailIsInvalid()
        {
            // Arrange
            var email = "";

            // Act
            var result = await _controller.ForgotPassword(email);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("Email không được để trống.", badRequestResult.Value);
        }

        [Test]
        public async Task ResetPassword_ReturnsOkResult_WhenResetIsSuccessful()
        {
            // Arrange
            var request = new DatLaiMatKhauRequest { Token = "reset-token", MatKhauMoi = "newpassword", XacNhanMatKhauMoi = "newpassword" };

            // Act
            var result = await _controller.ResetPassword(request);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Mật khẩu đã được đặt lại thành công.", okResult.Value);
        }

        [Test]
        public async Task ResetPassword_ReturnsBadRequest_WhenDataIsInvalid()
        {
            // Arrange
            var request = new DatLaiMatKhauRequest { Token = "", MatKhauMoi = "", XacNhanMatKhauMoi = "" };

            // Act
            var result = await _controller.ResetPassword(request);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("Thông tin không được để trống.", badRequestResult.Value);
        }

        [Test]
        public void Logout_ReturnsOkResult()
        {
            // Act
            var result = _controller.Logout();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Đăng xuất thành công.", (okResult.Value as dynamic).Message);

            // Verify session values are cleared
            Assert.IsNull(_httpContext.Session.GetString("MaNhanVien"));
            Assert.IsNull(_httpContext.Session.GetInt32("VaiTroId"));
        }
    }
}

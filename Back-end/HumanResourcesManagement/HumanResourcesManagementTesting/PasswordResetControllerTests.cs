using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class PasswordResetControllerTests
    {
        private Mock<IDangNhapService> _dangNhapServiceMock;
        private PasswordResetController _controller;

        [SetUp]
        public void Setup()
        {
            _dangNhapServiceMock = new Mock<IDangNhapService>();
            _controller = new PasswordResetController(_dangNhapServiceMock.Object);
        }

        // SendPasswordResetEmail
        [Test]
        public async Task SendPasswordResetEmail_ReturnsOkResult_WhenEmailSentSuccessfully()
        {
            // Arrange
            string email = "dungnthe150915@fpt.edu.vn";
            _dangNhapServiceMock.Setup(s => s.SendPasswordResetEmailAsync(email)).ReturnsAsync(true);

            // Act
            var result = await _controller.SendPasswordResetEmail(email);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Email reset password đã được gửi thành công.", ((dynamic)okResult.Value).Message);
        }

        [Test]
        public async Task SendPasswordResetEmail_ReturnsBadRequest_WhenEmailSendingFails()
        {
            // Arrange
            string email = "test@example.com";
            _dangNhapServiceMock.Setup(s => s.SendPasswordResetEmailAsync(email)).ReturnsAsync(false);

            // Act
            var result = await _controller.SendPasswordResetEmail(email);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("Không thể gửi email reset password.", ((dynamic)badRequestResult.Value).Message);
        }

        // ResetPassword
        [Test]
        public async Task ResetPassword_ReturnsOkResult_WhenPasswordResetSuccessfully()
        {
            // Arrange
            var request = new DatLaiMatKhauRequest { /* set request properties */ };
            _dangNhapServiceMock.Setup(s => s.ResetPasswordAsync(request)).ReturnsAsync(true);

            // Act
            var result = await _controller.ResetPassword(request);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Mật khẩu đã được thay đổi thành công.", ((dynamic)okResult.Value).Message);
        }

        [Test]
        public async Task ResetPassword_ReturnsBadRequest_WhenPasswordResetFails()
        {
            // Arrange
            var request = new DatLaiMatKhauRequest { /* set request properties */ };
            _dangNhapServiceMock.Setup(s => s.ResetPasswordAsync(request)).ReturnsAsync(false);

            // Act
            var result = await _controller.ResetPassword(request);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("Không thể thay đổi mật khẩu.", ((dynamic)badRequestResult.Value).Message);
        }
    }
}

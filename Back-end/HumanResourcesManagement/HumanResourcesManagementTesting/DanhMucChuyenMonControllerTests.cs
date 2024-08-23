using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response; // Đảm bảo rằng bạn đã import đúng namespace
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucChuyenMonControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IChuyenMonService> _chuyenMonServiceMock;
        private ChuyenMonController _controller;
        private List<ChuyenMonResponse> _chuyenMonResponses;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _chuyenMonServiceMock = new Mock<IChuyenMonService>();
            _controller = new ChuyenMonController(_chuyenMonServiceMock.Object, _contextMock.Object);

            // Khai báo danh sách chuyên môn
            _chuyenMonResponses = new List<ChuyenMonResponse>
            {
                new ChuyenMonResponse { Id = 1, Ten = "Kỹ sư phần mềm" },
                new ChuyenMonResponse { Id = 2, Ten = "Nhân sự" },
                new ChuyenMonResponse { Id = 3, Ten = "Kế toán" },
                new ChuyenMonResponse { Id = 4, Ten = "Marketing" }
            };

            // Setup mock service trả về danh sách
            _chuyenMonServiceMock.Setup(s => s.GetChuyenMon()).ReturnsAsync(_chuyenMonResponses);
        }

        // Get all
        [Test]
        public async Task GetChuyenMon_ReturnsOkResult_WithListOfChuyenMon()
        {
            // Act
            var result = await _controller.GetChuyenMon();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_chuyenMonResponses, okResult.Value);

            // In danh sách chuyên môn
            Console.WriteLine("Danh sách chuyên môn:");
            foreach (var cm in _chuyenMonResponses)
            {
                Console.WriteLine($"Id: {cm.Id}, Tên: {cm.Ten}");
            }
        }

        // Get by Id
        [Test]
        public async Task GetChuyenMonById_ReturnsOkResult_WithChuyenMon()
        {
            int id = 2;
            // Arrange
            var chuyenMon = _chuyenMonResponses.FirstOrDefault(c => c.Id == id);
            _chuyenMonServiceMock.Setup(s => s.GetChuyenMonById(id)).ReturnsAsync(chuyenMon);

            // Act
            var result = await _controller.GetChuyenMonById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(chuyenMon, okResult.Value);

            // In thông tin chuyên môn với Id tương ứng
            Console.WriteLine($"Chuyên môn Id: {chuyenMon.Id}, Tên: {chuyenMon.Ten}");
        }

        // Add ChuyenMon
        [Test]
        public async Task AddChuyenMon_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new ChuyenMonRequest { Ten = "Thiết kế đồ họa" };

            // Act
            var result = await _controller.AddChuyenMon(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Thêm thành công", objectResult.Value);

            // Thêm chuyên môn mới vào danh sách
            var newId = _chuyenMonResponses.Max(c => c.Id) + 1;
            var newChuyenMon = new ChuyenMonResponse { Id = newId, Ten = req.Ten };
            _chuyenMonResponses.Add(newChuyenMon);

            // In danh sách chuyên môn sau khi thêm mới
            Console.WriteLine("Danh sách chuyên môn sau khi thêm mới:");
            foreach (var cm in _chuyenMonResponses)
            {
                Console.WriteLine($"Id: {cm.Id}, Tên: {cm.Ten}");
            }
        }

        // Update ChuyenMon
        [Test]
        public async Task UpdateChuyenMon_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 3;
            // Arrange
            var req = new ChuyenMonRequest { Ten = "Quản lý tài chính" };

            // Act
            var result = await _controller.UpdateChuyenMon(req, id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Sửa thành công", objectResult.Value);

            // Cập nhật chuyên môn trong danh sách
            var updatedChuyenMon = _chuyenMonResponses.FirstOrDefault(c => c.Id == id);
            if (updatedChuyenMon != null)
            {
                updatedChuyenMon.Ten = req.Ten;
            }

            // In danh sách chuyên môn sau khi cập nhật
            Console.WriteLine("Danh sách chuyên môn sau khi cập nhật:");
            foreach (var cm in _chuyenMonResponses)
            {
                Console.WriteLine($"Id: {cm.Id}, Tên: {cm.Ten}");
            }
        }

        // Delete ChuyenMon
        [Test]
        public async Task DeleteChuyenMon_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            int id = 4;
            // Act
            var result = await _controller.DeleteChuyenMon(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa thành công", objectResult.Value);

            // Xóa chuyên môn có Id = 4 khỏi danh sách
            var deletedChuyenMon = _chuyenMonResponses.FirstOrDefault(c => c.Id == id);
            _chuyenMonResponses.Remove(deletedChuyenMon);

            // In lại danh sách chuyên môn sau khi xóa
            Console.WriteLine("Danh sách chuyên môn sau khi xóa:");
            foreach (var cm in _chuyenMonResponses)
            {
                Console.WriteLine($"Id: {cm.Id}, Tên: {cm.Ten}");
            }
        }
    }
}

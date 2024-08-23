using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucNgoaiNguControllerTests
    {
        private Mock<IDanhMucNgoaiNguService> _danhMucNgoaiNguServiceMock;
        private DanhMucNgoaiNguController _controller;
        private List<DanhMucNgoaiNguResponse> _danhMucNgoaiNguResponses;

        [SetUp]
        public void Setup()
        {
            _danhMucNgoaiNguServiceMock = new Mock<IDanhMucNgoaiNguService>();
            _controller = new DanhMucNgoaiNguController(_danhMucNgoaiNguServiceMock.Object, new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>()).Object);

            // Khai báo danh sách ngoại ngữ
            _danhMucNgoaiNguResponses = new List<DanhMucNgoaiNguResponse>
            {
                new DanhMucNgoaiNguResponse { Id = 1, Ten = "Tiếng Anh" },
                new DanhMucNgoaiNguResponse { Id = 2, Ten = "Tiếng Nhật" },
                new DanhMucNgoaiNguResponse { Id = 3, Ten = "Tiếng Pháp" },
                new DanhMucNgoaiNguResponse { Id = 4, Ten = "Tiếng Đức" }
            };

            // Setup mock service trả về danh sách
            _danhMucNgoaiNguServiceMock.Setup(s => s.GetDanhMucNgoaiNgu()).ReturnsAsync(_danhMucNgoaiNguResponses);
        }

        // Get all
        [Test]
        public async Task GetDanhMucNgoaiNgu_ReturnsOkResult_WithListOfNgoaiNgu()
        {
            // Act
            var result = await _controller.GetDanhMucNgoaiNgu();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucNgoaiNguResponses, okResult.Value);

            // In danh sách ngoại ngữ
            Console.WriteLine("Danh sách ngoại ngữ:");
            foreach (var nn in _danhMucNgoaiNguResponses)
            {
                Console.WriteLine($"Id: {nn.Id}, Tên: {nn.Ten}");
            }
        }

        // Get by Id
        [Test]
        public async Task GetDanhMucNgoaiNguById_ReturnsOkResult_WithNgoaiNgu()
        {
            int id = 2;
            // Arrange
            var ngoaiNgu = _danhMucNgoaiNguResponses.FirstOrDefault(c => c.Id == id);
            _danhMucNgoaiNguServiceMock.Setup(s => s.GetDanhMucNgoaiNguById(id)).ReturnsAsync(ngoaiNgu);

            // Act
            var result = await _controller.GetDanhMucNgoaiNguById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(ngoaiNgu, okResult.Value);

            // In thông tin ngoại ngữ với Id tương ứng
            Console.WriteLine($"Ngoại ngữ Id: {ngoaiNgu.Id}, Tên: {ngoaiNgu.Ten}");
        }

        // Add NgoaiNgu
        [Test]
        public async Task AddDanhMucNgoaiNgu_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new DanhMucNgoaiNguRequest { Ten = "Tiếng Hàn" };

            // Act
            var result = await _controller.AddDanhMucNgoaiNgu(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Thêm thành công", objectResult.Value);

            // Thêm ngoại ngữ mới vào danh sách
            var newId = _danhMucNgoaiNguResponses.Max(c => c.Id) + 1;
            var newNgoaiNgu = new DanhMucNgoaiNguResponse { Id = newId, Ten = req.Ten };
            _danhMucNgoaiNguResponses.Add(newNgoaiNgu);

            // In danh sách ngoại ngữ sau khi thêm mới
            Console.WriteLine("Danh sách ngoại ngữ sau khi thêm mới:");
            foreach (var nn in _danhMucNgoaiNguResponses)
            {
                Console.WriteLine($"Id: {nn.Id}, Tên: {nn.Ten}");
            }
        }

        // Update NgoaiNgu
        [Test]
        public async Task UpdateDanhMucNgoaiNgu_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 3;
            // Arrange
            var req = new DanhMucNgoaiNguRequest { Ten = "Tiếng Tây Ban Nha" };

            // Act
            var result = await _controller.UpdateDanhMucNgoaiNgu(req, id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Sửa thành công", objectResult.Value);

            // Cập nhật ngoại ngữ trong danh sách
            var updatedNgoaiNgu = _danhMucNgoaiNguResponses.FirstOrDefault(c => c.Id == id);
            if (updatedNgoaiNgu != null)
            {
                updatedNgoaiNgu.Ten = req.Ten;
            }

            // In danh sách ngoại ngữ sau khi cập nhật
            Console.WriteLine("Danh sách ngoại ngữ sau khi cập nhật:");
            foreach (var nn in _danhMucNgoaiNguResponses)
            {
                Console.WriteLine($"Id: {nn.Id}, Tên: {nn.Ten}");
            }
        }

        // Delete NgoaiNgu
        [Test]
        public async Task DeleteDanhMucNgoaiNgu_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            int id = 4;
            // Act
            var result = await _controller.DeleteDanhMucNgoaiNgu(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa thành công", objectResult.Value);

            // Xóa ngoại ngữ có Id = 4 khỏi danh sách
            var deletedNgoaiNgu = _danhMucNgoaiNguResponses.FirstOrDefault(c => c.Id == id);
            _danhMucNgoaiNguResponses.Remove(deletedNgoaiNgu);

            // In lại danh sách ngoại ngữ sau khi xóa
            Console.WriteLine("Danh sách ngoại ngữ sau khi xóa:");
            foreach (var nn in _danhMucNgoaiNguResponses)
            {
                Console.WriteLine($"Id: {nn.Id}, Tên: {nn.Ten}");
            }
        }
    }
}

using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucToControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IDanhMucToService> _danhMucToServiceMock;
        private DanhMucToController _controller;
        private List<DanhMucToResponse> _danhMucToResponses;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _danhMucToServiceMock = new Mock<IDanhMucToService>();
            _controller = new DanhMucToController(_danhMucToServiceMock.Object, _contextMock.Object);

            // Khai báo danh sách tổ dưới dạng DTO
            _danhMucToResponses = new List<DanhMucToResponse>
            {
                new DanhMucToResponse { Id = 1, Ten = "Tổ 1" },
                new DanhMucToResponse { Id = 2, Ten = "Tổ 2" },
                new DanhMucToResponse { Id = 3, Ten = "Tổ 3" }
            };

            // Setup mock service trả về danh sách DTO
            _danhMucToServiceMock.Setup(s => s.GetDanhMucTo()).ReturnsAsync(_danhMucToResponses);
        }

        [Test]
        public async Task GetDanhMucTo_ReturnsOkResult_WithListOfDanhMucTo()
        {
            // Act
            var result = await _controller.GetDanhMucTo();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucToResponses, okResult.Value);

            // In danh sách tổ
            Console.WriteLine("Danh sách tổ:");
            foreach (var to in _danhMucToResponses)
            {
                Console.WriteLine($"Id: {to.Id}, Tên Tổ: {to.Ten}");
            }
        }

        [Test]
        public async Task GetDanhMucToById_ReturnsOkResult_WithDanhMucTo()
        {
            int id = 1;
            // Arrange
            var danhMucTo = _danhMucToResponses.FirstOrDefault(d => d.Id == id);
            _danhMucToServiceMock.Setup(s => s.GetDanhMucToById(id)).ReturnsAsync(danhMucTo);

            // Act
            var result = await _controller.GetDanhMucToById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(danhMucTo, okResult.Value);

            // In thông tin tổ với Id tương ứng
            Console.WriteLine($"Tổ Id: {danhMucTo.Id}, Tên: {danhMucTo.Ten}");
        }

        [Test]
        public async Task DeleteDanhMucTo_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 1;

            // Act
            var result = await _controller.DeleteDanhMucTo(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa thành công", objectResult.Value);

            // Xóa tổ có Id = 1 khỏi danh sách
            var deletedDanhMucTo = _danhMucToResponses.FirstOrDefault(d => d.Id == id);
            _danhMucToResponses.Remove(deletedDanhMucTo);

            // In lại danh sách tổ sau khi xóa
            Console.WriteLine("Danh sách tổ sau khi xóa:");
            foreach (var to in _danhMucToResponses)
            {
                Console.WriteLine($"Id: {to.Id}, Tên Tổ: {to.Ten}");
            }
        }

        [Test]
        public async Task UpdateDanhMucTo_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new DanhMucToRequest { Ten = "Tổ 1 Cập Nhật" };

            // Act
            var result = await _controller.UpdateDanhMucTo(req, id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Sửa thành công", objectResult.Value);

            // Cập nhật tổ trong danh sách
            var updatedDanhMucTo = _danhMucToResponses.FirstOrDefault(d => d.Id == id);
            if (updatedDanhMucTo != null)
            {
                updatedDanhMucTo.Ten = req.Ten;
            }

            // In lại danh sách tổ sau khi cập nhật
            Console.WriteLine("Danh sách tổ sau khi cập nhật:");
            foreach (var to in _danhMucToResponses)
            {
                Console.WriteLine($"Id: {to.Id}, Tên Tổ: {to.Ten}");
            }
        }

        [Test]
        public async Task AddDanhMucTo_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new DanhMucToRequest { Ten = "Tổ 4" };

            // Act
            var result = await _controller.AddDanhMucTo(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Thêm thành công", objectResult.Value);

            // Thêm tổ mới vào danh sách
            var newId = _danhMucToResponses.Max(d => d.Id) + 1;
            var newDanhMucTo = new DanhMucToResponse { Id = newId, Ten = req.Ten };
            _danhMucToResponses.Add(newDanhMucTo);

            // In danh sách tổ sau khi thêm mới
            Console.WriteLine("Danh sách tổ sau khi thêm mới:");
            foreach (var to in _danhMucToResponses)
            {
                Console.WriteLine($"Id: {to.Id}, Tên Tổ: {to.Ten}");
            }
        }
    }
}

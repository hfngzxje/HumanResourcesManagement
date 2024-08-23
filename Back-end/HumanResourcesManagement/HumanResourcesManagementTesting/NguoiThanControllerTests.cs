using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class NguoiThanControllerTests
    {
        private Mock<INguoiThanService> _nguoiThanServiceMock;
        private NguoiThanController _controller;
        private List<TblDanhMucNguoiThan> _dmNguoiThanResponses;
        private List<TblNguoiThan> _nguoiThanResponses;

        [SetUp]
        public void Setup()
        {
            _nguoiThanServiceMock = new Mock<INguoiThanService>();
            _controller = new NguoiThanController(_nguoiThanServiceMock.Object);

            // Khai báo danh sách người thân
            _dmNguoiThanResponses = new List<TblDanhMucNguoiThan>
            {
                new TblDanhMucNguoiThan { Id = 1, Ten = "Người Thân A" },
                new TblDanhMucNguoiThan { Id = 2, Ten = "Người Thân B" },
                new TblDanhMucNguoiThan { Id = 3, Ten = "Người Thân C" }
            };

            _nguoiThanResponses = new List<TblNguoiThan>
            {
                new TblNguoiThan { Id = 1, Ten = "Người Thân A" },
                new TblNguoiThan { Id = 2, Ten = "Người Thân B" },
                new TblNguoiThan { Id = 3, Ten = "Người Thân C" }
            };

            // Setup mock service trả về danh sách người thân
            _nguoiThanServiceMock.Setup(s => s.GetDanhMucNguoiThan()).ReturnsAsync(_dmNguoiThanResponses);
        }

        // Get all
        [Test]
        public async Task GetDanhMucNguoiThan_ReturnsOkResult_WithListOfNguoiThan()
        {
            // Act
            var result = await _controller.GetDanhMucNguoiThan();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_dmNguoiThanResponses, okResult.Value);

            // In danh sách người thân
            Console.WriteLine("Danh sách người thân:");
            foreach (var nt in _dmNguoiThanResponses)
            {
                Console.WriteLine($"Id: {nt.Id}, Tên: {nt.Ten}");
            }
        }

        // Get by Id
        [Test]
        public async Task GetNguoiThanById_ReturnsOkResult_WithNguoiThan()
        {
            int id = 2;
            // Arrange
            var nguoiThan = _nguoiThanResponses.FirstOrDefault(c => c.Id == id);
            _nguoiThanServiceMock.Setup(s => s.GetNguoiThanById(id)).ReturnsAsync(nguoiThan);

            // Act
            var result = await _controller.GetNguoiThanById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(nguoiThan, okResult.Value);

            // In thông tin người thân với Id tương ứng
            Console.WriteLine($"Người thân Id: {nguoiThan.Id}, Tên: {nguoiThan.Ten}");
        }

        // Add NguoiThan
        [Test]
        public async Task AddNguoiThan_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new InsertNguoiThanRequest { Ten = "Người Thân D" };

            // Act
            var result = await _controller.AddNguoiThan(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Thêm người thân thành công.", objectResult.Value);

            // Thêm người thân mới vào danh sách
            var newId = _nguoiThanResponses.Max(c => c.Id) + 1;
            var newNguoiThan = new TblNguoiThan { Id = newId, Ten = req.Ten };
            _nguoiThanResponses.Add(newNguoiThan);

            // In danh sách người thân sau khi thêm mới
            Console.WriteLine("Danh sách người thân sau khi thêm mới:");
            foreach (var nt in _nguoiThanResponses)
            {
                Console.WriteLine($"Id: {nt.Id}, Tên: {nt.Ten}");
            }
        }

        // Update NguoiThan
        [Test]
        public async Task UpdateNguoiThan_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 3;
            // Arrange
            var req = new UpdateNguoiThanRequest { Ten = "Người Thân E" };

            // Act
            var result = await _controller.UpdateNguoiThan(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Cập nhật thông tin người thân thành công.", objectResult.Value);

            // Cập nhật người thân trong danh sách
            var updatedNguoiThan = _nguoiThanResponses.FirstOrDefault(c => c.Id == id);
            if (updatedNguoiThan != null)
            {
                updatedNguoiThan.Ten = req.Ten;
            }

            // In danh sách người thân sau khi cập nhật
            Console.WriteLine("Danh sách người thân sau khi cập nhật:");
            foreach (var nt in _nguoiThanResponses)
            {
                Console.WriteLine($"Id: {nt.Id}, Tên: {nt.Ten}");
            }
        }

        // Delete NguoiThan
        [Test]
        public async Task DeleteNguoiThan_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            int id = 3;
            // Act
            var result = await _controller.DeleteNguoiThan(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa người thân thành công.", objectResult.Value);

            // Xóa người thân có Id = 3 khỏi danh sách
            var deletedNguoiThan = _nguoiThanResponses.FirstOrDefault(c => c.Id == id);
            _nguoiThanResponses.Remove(deletedNguoiThan);

            // In lại danh sách người thân sau khi xóa
            Console.WriteLine("Danh sách người thân sau khi xóa:");
            foreach (var nt in _nguoiThanResponses)
            {
                Console.WriteLine($"Id: {nt.Id}, Tên: {nt.Ten}");
            }
        }
    }
}

using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucQuanHeControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IDanhMucQuanHeService> _danhMucQuanHeServiceMock;
        private DanhMucQuanHeController _controller;
        private List<TblDanhMucNguoiThan> _danhMucQuanHes;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _danhMucQuanHeServiceMock = new Mock<IDanhMucQuanHeService>();
            _controller = new DanhMucQuanHeController(_contextMock.Object, _danhMucQuanHeServiceMock.Object);

            // Khai báo danh sách quan hệ
            _danhMucQuanHes = new List<TblDanhMucNguoiThan>
            {
                new TblDanhMucNguoiThan { Id = 1, Ten = "Bố" },
                new TblDanhMucNguoiThan { Id = 2, Ten = "Mẹ" },
                new TblDanhMucNguoiThan { Id = 3, Ten = "Ông" },
                new TblDanhMucNguoiThan { Id = 4, Ten = "Bà"}
            };

            // Setup mock service trả về danh sách
            _danhMucQuanHeServiceMock.Setup(s => s.GetAllQuanHe()).ReturnsAsync(_danhMucQuanHes);
        }

        // Get all
        [Test]
        public async Task GetDanhMucQuanHe_ReturnsOkResult_WithListOfQuanHe()
        {
            // Act
            var result = await _controller.GetDanhMucQuanHe();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucQuanHes, okResult.Value);

            // In danh sách quan hệ
            Console.WriteLine("Danh sách quan hệ:");
            foreach (var qh in _danhMucQuanHes)
            {
                Console.WriteLine($"Id: {qh.Id}, Tên: {qh.Ten}");
            }
        }

        // Get by Id
        [Test]
        public async Task GetDanhMucQuanHeById_ReturnsOkResult_WithQuanHe()
        {
            int id = 2;
            // Arrange
            var quanHe = _danhMucQuanHes.FirstOrDefault(q => q.Id == id);
            _danhMucQuanHeServiceMock.Setup(s => s.GetQuanHeById(id)).ReturnsAsync(quanHe);

            // Act
            var result = await _controller.GetDanhMucQuanHeById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(quanHe, okResult.Value);

            // In thông tin quan hệ với Id tương ứng
            Console.WriteLine($"Quan hệ Id: {quanHe.Id}, Tên: {quanHe.Ten}");
        }

        // Add QuanHe
        [Test]
        public async Task AddQuanHe_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new QuanHeRequest { Ten = "Con" };

            // Act
            var result = await _controller.AddQuanHe(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Thêm danh mục quan hệ thành công.", objectResult.Value);

            // Thêm quan hệ mới vào danh sách
            var newId = _danhMucQuanHes.Max(q => q.Id) + 1;
            var newQuanHe = new TblDanhMucNguoiThan { Id = newId, Ten = req.Ten };
            _danhMucQuanHes.Add(newQuanHe);

            // In danh sách quan hệ sau khi thêm mới
            Console.WriteLine("Danh sách quan hệ sau khi thêm mới:");
            foreach (var qh in _danhMucQuanHes)
            {
                Console.WriteLine($"Id: {qh.Id}, Tên: {qh.Ten}");
            }
        }

        // Update QuanHe
        [Test]
        public async Task UpdateQuanHe_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new QuanHeRequest { Ten = "Ông" };

            // Act
            var result = await _controller.UpdateQuanHe(id, req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Cập nhật danh mục quan hệ thành công.", objectResult.Value);

            // Cập nhật quan hệ trong danh sách
            var updatedQuanHe = _danhMucQuanHes.FirstOrDefault(q => q.Id == id);
            if (updatedQuanHe != null)
            {
                updatedQuanHe.Ten = req.Ten;
            }

            // In danh sách quan hệ sau khi cập nhật
            Console.WriteLine("Danh sách quan hệ sau khi cập nhật:");
            foreach (var qh in _danhMucQuanHes)
            {
                Console.WriteLine($"Id: {qh.Id}, Tên: {qh.Ten}");
            }
        }

        // Delete QuanHe
        [Test]
        public async Task RemoveQuanHe_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            int id = 1;
            // Act
            var result = await _controller.RemoveQuanHe(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa danh mục quan hệ thành công.", objectResult.Value);

            // Xóa quan hệ có Id = 1 khỏi danh sách
            var deletedQuanHe = _danhMucQuanHes.FirstOrDefault(q => q.Id == id);
            _danhMucQuanHes.Remove(deletedQuanHe);

            // In lại danh sách quan hệ sau khi xóa
            Console.WriteLine("Danh sách quan hệ sau khi xóa:");
            foreach (var qh in _danhMucQuanHes)
            {
                Console.WriteLine($"Id: {qh.Id}, Tên: {qh.Ten}");
            }
        }
    }
}

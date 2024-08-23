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
    public class DanhMucTonGiaoControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IDanhMucTonGiaoService> _danhMucTonGiaoServiceMock;
        private DanhMucTonGiaoController _controller;
        private List<TblDanhMucTonGiao> _danhMucTonGiaos;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _danhMucTonGiaoServiceMock = new Mock<IDanhMucTonGiaoService>();
            _controller = new DanhMucTonGiaoController(_contextMock.Object, _danhMucTonGiaoServiceMock.Object);

            // Khai báo danh sách tôn giáo
            _danhMucTonGiaos = new List<TblDanhMucTonGiao>
            {
                new TblDanhMucTonGiao { Id = 1, Ten = "Phật giáo" },
                new TblDanhMucTonGiao { Id = 2, Ten = "Công giáo" },
                new TblDanhMucTonGiao { Id = 3, Ten = "Hồi giáo" },
                new TblDanhMucTonGiao { Id = 4, Ten = "Đạo Cao Đài" }
            };

            // Setup mock service trả về danh sách
            _danhMucTonGiaoServiceMock.Setup(s => s.GetAllTonGiao()).ReturnsAsync(_danhMucTonGiaos);
        }

        // Get all
        [Test]
        public async Task GetDanhMucTonGiao_ReturnsOkResult_WithListOfTonGiao()
        {
            // Act
            var result = await _controller.GetDanhMucTonGiao();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucTonGiaos, okResult.Value);

            // In danh sách tôn giáo
            Console.WriteLine("Danh sách tôn giáo:");
            foreach (var tg in _danhMucTonGiaos)
            {
                Console.WriteLine($"Id: {tg.Id}, Tên: {tg.Ten}");
            }
        }

        // Get by Id
        [Test]
        public async Task GetDanhMucTonGiaoById_ReturnsOkResult_WithTonGiao()
        {
            int id = 2;
            // Arrange
            var tonGiao = _danhMucTonGiaos.FirstOrDefault(t => t.Id == id);
            _danhMucTonGiaoServiceMock.Setup(s => s.GetTonGiaoById(id)).ReturnsAsync(tonGiao);

            // Act
            var result = await _controller.GetDanhMucTonGiaoById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(tonGiao, okResult.Value);

            // In thông tin tôn giáo với Id tương ứng
            Console.WriteLine($"Tôn giáo Id: {tonGiao.Id}, Tên: {tonGiao.Ten}");
        }

        // Add TonGiao
        [Test]
        public async Task AddTonGiao_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new InsertTonGiaoRequest { Ten = "Tin Lành" };

            // Act
            var result = await _controller.AddTonGiao(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("add ton giao thanh cong", objectResult.Value);

            // Thêm tôn giáo mới vào danh sách
            var newId = _danhMucTonGiaos.Max(t => t.Id) + 1;
            var newTonGiao = new TblDanhMucTonGiao { Id = newId, Ten = req.Ten };
            _danhMucTonGiaos.Add(newTonGiao);

            // In danh sách tôn giáo sau khi thêm mới
            Console.WriteLine("Danh sách tôn giáo sau khi thêm mới:");
            foreach (var tg in _danhMucTonGiaos)
            {
                Console.WriteLine($"Id: {tg.Id}, Tên: {tg.Ten}");
            }
        }

        // Update TonGiao
        [Test]
        public async Task UpdateTonGiao_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 3;
            // Arrange
            var req = new UpdateTonGiaoRequest { Id = id, Ten = "Đạo Tin Lành" };

            // Act
            var result = await _controller.UpdateTonGiao(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("cap nhat ton giao thanh cong", objectResult.Value);

            // Cập nhật tôn giáo trong danh sách
            var updatedTonGiao = _danhMucTonGiaos.FirstOrDefault(t => t.Id == id);
            if (updatedTonGiao != null)
            {
                updatedTonGiao.Ten = req.Ten;
            }

            // In danh sách tôn giáo sau khi cập nhật
            Console.WriteLine("Danh sách tôn giáo sau khi cập nhật:");
            foreach (var tg in _danhMucTonGiaos)
            {
                Console.WriteLine($"Id: {tg.Id}, Tên: {tg.Ten}");
            }
        }

        // Delete TonGiao
        [Test]
        public async Task RemoveTonGiao_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            int id = 4;
            // Act
            var result = await _controller.RemoveTonGiao(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("xoa ton giao thanh cong", objectResult.Value);

            // Xóa tôn giáo có Id = 4 khỏi danh sách
            var deletedTonGiao = _danhMucTonGiaos.FirstOrDefault(t => t.Id == id);
            _danhMucTonGiaos.Remove(deletedTonGiao);

            // In lại danh sách tôn giáo sau khi xóa
            Console.WriteLine("Danh sách tôn giáo sau khi xóa:");
            foreach (var tg in _danhMucTonGiaos)
            {
                Console.WriteLine($"Id: {tg.Id}, Tên: {tg.Ten}");
            }
        }
    }
}

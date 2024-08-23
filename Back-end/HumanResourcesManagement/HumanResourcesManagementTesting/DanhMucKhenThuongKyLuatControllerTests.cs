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
    public class DanhMucKhenThuongKyLuatControllerTests
    {
        private Mock<IDanhMucKhenThuongKyLuatService> _danhMucKhenThuongKyLuatServiceMock;
        private Mock<NhanSuContext> _contextMock;
        private DanhMucKhenThuongKyLuatController _controller;
        private List<DanhMucKhenThuongKyLuatResponse> _danhMucKhenThuongKyLuats;

        [SetUp]
        public void Setup()
        {
            _danhMucKhenThuongKyLuatServiceMock = new Mock<IDanhMucKhenThuongKyLuatService>();
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _controller = new DanhMucKhenThuongKyLuatController(_danhMucKhenThuongKyLuatServiceMock.Object, _contextMock.Object);

            // Khai báo danh sách khen thưởng kỷ luật
            _danhMucKhenThuongKyLuats = new List<DanhMucKhenThuongKyLuatResponse>
            {
                new DanhMucKhenThuongKyLuatResponse { Id = 1, Ten = "Khen thưởng A", Ma = "KA1" },
                new DanhMucKhenThuongKyLuatResponse { Id = 2, Ten = "Khen thưởng B", Ma = "KB2" },
                new DanhMucKhenThuongKyLuatResponse { Id = 3, Ten = "Khen thưởng C", Ma = "KC3" }
            };

            // Setup mock service trả về danh sách
            _danhMucKhenThuongKyLuatServiceMock.Setup(s => s.GetDanhMucKhenThuongKyLuat()).ReturnsAsync(_danhMucKhenThuongKyLuats);
        }

        [Test]
        public async Task GetDanhMucKhenThuongKyLuat_ReturnsOkResult_WithListOfDanhMucKhenThuongKyLuat()
        {
            // Act
            var result = await _controller.GetDanhMucKhenThuongKyLuat();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucKhenThuongKyLuats, okResult.Value);

            // In danh sách khen thưởng kỷ luật
            Console.WriteLine("Danh sách khen thưởng kỷ luật:");
            foreach (var item in _danhMucKhenThuongKyLuats)
            {
                Console.WriteLine($"Id: {item.Id}, Tên: {item.Ten}, Mã: {item.Ma}");
            }
        }

        [Test]
        public async Task GetDanhMucKhenThuongKyLuatById_ReturnsOkResult_WithDanhMucKhenThuongKyLuat()
        {
            // Arrange
            var danhMucKhenThuongKyLuat = _danhMucKhenThuongKyLuats.FirstOrDefault(d => d.Id == 1);
            _danhMucKhenThuongKyLuatServiceMock.Setup(s => s.GetDanhMucKhenThuongKyLuatById(1)).ReturnsAsync(danhMucKhenThuongKyLuat);

            // Act
            var result = await _controller.GetDanhMucKhenThuongKyLuatById(1);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(danhMucKhenThuongKyLuat, okResult.Value);

            // In thông tin khen thưởng kỷ luật với Id tương ứng
            Console.WriteLine($"Khen thưởng kỷ luật Id: {danhMucKhenThuongKyLuat.Id}, Tên: {danhMucKhenThuongKyLuat.Ten}, Mã: {danhMucKhenThuongKyLuat.Ma}");
        }

        [Test]
        public async Task AddDanhMucKhenThuongKyLuat_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new DanhMucKhenThuongKyLuatRequest { Ten = "Khen thưởng D" };

            // Act
            var result = await _controller.AddDanhMucKhenThuongKyLuat(req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Thêm khen thưởng kỷ luật mới vào danh sách
            var newId = _danhMucKhenThuongKyLuats.Max(d => d.Id) + 1;
            var newDanMucKhenThuongKyLuat = new DanhMucKhenThuongKyLuatResponse { Id = newId, Ten = req.Ten, Ma = "KD" + newId };
            _danhMucKhenThuongKyLuats.Add(newDanMucKhenThuongKyLuat);

            // In danh sách khen thưởng kỷ luật sau khi thêm mới
            Console.WriteLine("Danh sách khen thưởng kỷ luật sau khi thêm mới:");
            foreach (var item in _danhMucKhenThuongKyLuats)
            {
                Console.WriteLine($"Id: {item.Id}, Tên: {item.Ten}, Mã: {item.Ma}");
            }
        }

        [Test]
        public async Task UpdateDanhMucKhenThuongKyLuat_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new DanhMucKhenThuongKyLuatRequest { Ten = "Khen thưởng E" };

            // Act
            var result = await _controller.UpdateDanhMucKhenThuongKyLuat(req, id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Cập nhật khen thưởng kỷ luật trong danh sách
            var updatedDanMucKhenThuongKyLuat = _danhMucKhenThuongKyLuats.FirstOrDefault(d => d.Id == id);
            if (updatedDanMucKhenThuongKyLuat != null)
            {
                updatedDanMucKhenThuongKyLuat.Ten = req.Ten;
                updatedDanMucKhenThuongKyLuat.Ma = "KE" + id;
            }

            // In danh sách khen thưởng kỷ luật sau khi cập nhật
            Console.WriteLine("Danh sách khen thưởng kỷ luật sau khi cập nhật:");
            foreach (var item in _danhMucKhenThuongKyLuats)
            {
                Console.WriteLine($"Id: {item.Id}, Tên: {item.Ten}, Mã: {item.Ma}");
            }
        }

        [Test]
        public async Task DeleteDanhMucKhenThuongKyLuat_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 2;

            // Act
            var result = await _controller.DeleteDanhMucKhenThuongKyLuat(id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Xóa khen thưởng kỷ luật có Id = 2 khỏi danh sách
            var deletedDanMucKhenThuongKyLuat = _danhMucKhenThuongKyLuats.FirstOrDefault(d => d.Id == id);
            _danhMucKhenThuongKyLuats.Remove(deletedDanMucKhenThuongKyLuat);

            // In danh sách khen thưởng kỷ luật sau khi xóa
            Console.WriteLine("Danh sách khen thưởng kỷ luật sau khi xóa:");
            foreach (var item in _danhMucKhenThuongKyLuats)
            {
                Console.WriteLine($"Id: {item.Id}, Tên: {item.Ten}, Mã: {item.Ma}");
            }
        }
    }
}

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
    public class DanhMucPhongBanControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IPhongBanService> _phongBanServiceMock;
        private PhongBanController _controller;
        private List<TblDanhMucPhongBan> _phongBans;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _phongBanServiceMock = new Mock<IPhongBanService>();
            _controller = new PhongBanController(_contextMock.Object, _phongBanServiceMock.Object);

            // Khai báo danh sách phòng ban
            _phongBans = new List<TblDanhMucPhongBan>
            {
                new TblDanhMucPhongBan { Id = 1, Ten = "Phòng Kế toán" },
                new TblDanhMucPhongBan { Id = 2, Ten = "Phòng Nhân Sự" },
                new TblDanhMucPhongBan { Id = 3, Ten = "Phòng Kinh Doanh" }
            };

            // Setup mock service trả về danh sách
            _phongBanServiceMock.Setup(s => s.GetAllPhongBan()).ReturnsAsync(_phongBans);
        }

        [Test]
        public async Task GetAllPhongBan_ReturnsOkResult_WithListOfPhongBan()
        {
            // Act
            var result = await _controller.GetAllPhongBan();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_phongBans, okResult.Value);

            // In danh sách phòng ban
            Console.WriteLine("Danh sách phòng ban:");
            foreach (var pb in _phongBans)
            {
                Console.WriteLine($"Id: {pb.Id}, Tên: {pb.Ten}");
            }
        }

        [Test]
        public async Task GetPhongBanById_ReturnsOkResult_WithPhongBan()
        {
            // Arrange
            var phongBan = _phongBans.FirstOrDefault(p => p.Id == 1);
            _phongBanServiceMock.Setup(s => s.GetPhongBanById(1)).ReturnsAsync(phongBan);

            // Act
            var result = await _controller.GetPhongBanById(1);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(phongBan, okResult.Value);

            // In thông tin phòng ban với Id tương ứng
            Console.WriteLine($"Phòng ban Id: {phongBan.Id}, Tên: {phongBan.Ten}");
        }

        [Test]
        public async Task AddPhongBan_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new InsertPhongBan { Ten = "Phong Ban D" };

            // Act
            var result = await _controller.AddPhongBan(req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Thêm phòng ban mới vào danh sách
            var newId = _phongBans.Max(p => p.Id) + 1;
            var newPhongBan = new TblDanhMucPhongBan { Id = newId, Ten = req.Ten };
            _phongBans.Add(newPhongBan);

            // In danh sách phòng ban sau khi thêm mới
            Console.WriteLine("Danh sách phòng ban sau khi thêm mới:");
            foreach (var pb in _phongBans)
            {
                Console.WriteLine($"Id: {pb.Id}, Tên: {pb.Ten}");
            }
        }


        [Test]
        public async Task RemovePhongBan_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 2;

            // Act
            var result = await _controller.RemovePhongBan(id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Xóa phòng ban có Id = 2 khỏi danh sách
            var deletedPhongBan = _phongBans.FirstOrDefault(p => p.Id == id);
            _phongBans.Remove(deletedPhongBan);

            // In danh sách phòng ban sau khi xóa
            Console.WriteLine("Danh sách phòng ban sau khi xóa:");
            foreach (var pb in _phongBans)
            {
                Console.WriteLine($"Id: {pb.Id}, Tên: {pb.Ten}");
            }
        }


        [Test]
        public async Task UpdatePhongBan_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new InsertPhongBan { Ten = "Phong Ban E" };

            // Act
            var result = await _controller.UpdatePhongBan(id, req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Cập nhật phòng ban trong danh sách
            var updatedPhongBan = _phongBans.FirstOrDefault(p => p.Id == id);
            if (updatedPhongBan != null)
            {
                updatedPhongBan.Ten = req.Ten;
            }

            // In danh sách phòng ban sau khi cập nhật
            Console.WriteLine("Danh sách phòng ban sau khi cập nhật:");
            foreach (var pb in _phongBans)
            {
                Console.WriteLine($"Id: {pb.Id}, Tên: {pb.Ten}");
            }
        }

    }
}

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

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucLoaiHopDongControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<ILoaiHopDongService> _loaiHopDongServiceMock;
        private LoaiHopDongController _controller;
        private List<TblDanhMucLoaiHopDong> _loaiHopDongs;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>();
            _loaiHopDongServiceMock = new Mock<ILoaiHopDongService>();
            _controller = new LoaiHopDongController(_contextMock.Object, _loaiHopDongServiceMock.Object);

            // Khai báo danh sách loại hợp đồng
            _loaiHopDongs = new List<TblDanhMucLoaiHopDong>
            {
                new TblDanhMucLoaiHopDong { Id = 1, Ten = "Hợp đồng toàn thời gian" },
                new TblDanhMucLoaiHopDong { Id = 2, Ten = "Hợp đồng bán thời gian" },
                new TblDanhMucLoaiHopDong { Id = 3, Ten = "Hợp đồng theo mùa" }
            };

            // Setup mock service trả về danh sách
            _loaiHopDongServiceMock.Setup(s => s.GetAllLoaiHopDong()).ReturnsAsync(_loaiHopDongs);
            _loaiHopDongServiceMock.Setup(s => s.GetLoaiHopDongById(It.IsAny<int>())).ReturnsAsync((int id) => _loaiHopDongs.FirstOrDefault(l => l.Id == id));
        }

        [Test]
        public async Task GetLoaiHopDong_ReturnsOkResult_WithListOfLoaiHopDong()
        {
            // Act
            var result = await _controller.GetLoaiHopDong();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var resultList = okResult.Value as IEnumerable<TblDanhMucLoaiHopDong>;
            Assert.IsNotNull(resultList);
            Assert.AreEqual(_loaiHopDongs.Count, resultList.Count());

            // In danh sách loại hợp đồng
            Console.WriteLine("Danh sách loại hợp đồng:");
            foreach (var lh in resultList)
            {
                Console.WriteLine($"Id: {lh.Id}, Tên: {lh.Ten}");
            }
        }

        [Test]
        public async Task GetLoaiHopDongById_ReturnsOkResult_WithLoaiHopDong()
        {
            int id = 1;
            // Act
            var result = await _controller.GetLoaiHopDongById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var resultLoaiHopDong = okResult.Value as TblDanhMucLoaiHopDong;
            Assert.IsNotNull(resultLoaiHopDong);
            Assert.AreEqual(id, resultLoaiHopDong.Id);

            // In thông tin loại hợp đồng với Id tương ứng
            Console.WriteLine($"Loại hợp đồng Id: {resultLoaiHopDong.Id}, Tên: {resultLoaiHopDong.Ten}");
        }

        [Test]
        public async Task AddLoaiHopDong_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new InsertLoaiHopDongRequest { Ten = "Hợp đồng mới" };

            // Act
            var result = await _controller.AddLoaiHopDong(req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Thêm loại hợp đồng mới vào danh sách
            var newId = _loaiHopDongs.Max(l => l.Id) + 1;
            var newLoaiHopDong = new TblDanhMucLoaiHopDong { Id = newId, Ten = req.Ten };
            _loaiHopDongs.Add(newLoaiHopDong);

            // In danh sách loại hợp đồng sau khi thêm mới
            Console.WriteLine("Danh sách loại hợp đồng sau khi thêm mới:");
            foreach (var lh in _loaiHopDongs)
            {
                Console.WriteLine($"Id: {lh.Id}, Tên: {lh.Ten}");
            }
        }

        [Test]
        public async Task RemoveLoaiHopDong_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 2;

            // Act
            var result = await _controller.RemoveLoaiHopDong(id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Xóa loại hợp đồng khỏi danh sách
            var deletedLoaiHopDong = _loaiHopDongs.FirstOrDefault(l => l.Id == id);
            _loaiHopDongs.Remove(deletedLoaiHopDong);

            // In danh sách loại hợp đồng sau khi xóa
            Console.WriteLine("Danh sách loại hợp đồng sau khi xóa:");
            foreach (var lh in _loaiHopDongs)
            {
                Console.WriteLine($"Id: {lh.Id}, Tên: {lh.Ten}");
            }
        }

        [Test]
        public async Task UpdateLoaiHopDong_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            // Arrange
            int id = 1;
            var req = new InsertLoaiHopDongRequest { Ten = "Hợp đồng đã cập nhật" };

            // Act
            var result = await _controller.UpdateLoaiHopDong(id, req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Cập nhật loại hợp đồng trong danh sách
            var updatedLoaiHopDong = _loaiHopDongs.FirstOrDefault(l => l.Id == id);
            if (updatedLoaiHopDong != null)
            {
                updatedLoaiHopDong.Ten = req.Ten;
            }

            // In danh sách loại hợp đồng sau khi cập nhật
            Console.WriteLine("Danh sách loại hợp đồng sau khi cập nhật:");
            foreach (var lh in _loaiHopDongs)
            {
                Console.WriteLine($"Id: {lh.Id}, Tên: {lh.Ten}");
            }
        }
    }
}

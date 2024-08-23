using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucNhomLuongControllerTests
    {
        private Mock<IDanhMucNhomLuongService> _nhomLuongServiceMock;
        private DanhMucNhomLuongController _controller;
        private List<DanhMucNhomLuongResponse> _nhomLuongs;

        [SetUp]
        public void Setup()
        {
            _nhomLuongServiceMock = new Mock<IDanhMucNhomLuongService>();
            _controller = new DanhMucNhomLuongController(_nhomLuongServiceMock.Object, null);

            _nhomLuongs = new List<DanhMucNhomLuongResponse>
            {
                new DanhMucNhomLuongResponse { Nhomluong = 1, Bacluong = 2000000, Ghichu = "Ghi chú 1", Hesoluong = 1.5, Luongcoban = 5000000, Ngachcongchuc = 1, TenNgachCongChuc = "Phó phòng" },
                new DanhMucNhomLuongResponse { Nhomluong = 2, Bacluong = 3000000, Ghichu = "Ghi chú 2", Hesoluong = 2.0, Luongcoban = 6000000, Ngachcongchuc = 2, TenNgachCongChuc = "Trưởng phòng" }
            };
        }

        [Test]
        public async Task GetAllQuanHe_ReturnsOkResult_WithListOfNhomLuong()
        {
            // Arrange
            _nhomLuongServiceMock.Setup(s => s.GetAllNhomLuongAsync()).ReturnsAsync(_nhomLuongs);

            // Act
            var result = await _controller.GetAllQuanHe();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var resultList = okResult.Value as IEnumerable<DanhMucNhomLuongResponse>;
            Assert.IsNotNull(resultList);
            Assert.AreEqual(_nhomLuongs.Count, resultList.Count());

            // In danh sách nhóm lương
            Console.WriteLine("Danh sách nhóm lương:");
            foreach (var nhomLuong in resultList)
            {
                Console.WriteLine($"Nhóm lương: {nhomLuong.Nhomluong}, Bậc lương: {nhomLuong.Bacluong}, Hệ số lương: {nhomLuong.Hesoluong}, Lương cơ bản: {nhomLuong.Luongcoban}");
            }
        }

        /*[Test]
        public async Task GetQuanHeById_ReturnsOkResult_WithNhomLuong()
        {
            // Arrange
            int id = 1;
            var nhomLuong = new DanhMucNhomLuongResponse { Nhomluong = 1, Bacluong = 3000000, Ghichu = "Ghi chú 1", Hesoluong = 1.5, Luongcoban = 5000000, Ngachcongchuc = 1, TenNgachCongChuc = "Trưởng" };
            _nhomLuongServiceMock.Setup(s => s.GetNhomLuongByIdAsync(id)).Returns(Task.FromResult(nhomLuong));

            // Act
            var result = await _controller.GetQuanHeById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var resultNhomLuong = okResult.Value as DanhMucNhomLuongResponse;
            Assert.IsNotNull(resultNhomLuong);
            Assert.AreEqual(id, resultNhomLuong.Nhomluong);

            // In thông tin nhóm lương
            Console.WriteLine($"Nhóm lương Id: {resultNhomLuong.Nhomluong}, Tên nhóm lương: {resultNhomLuong.Ghichu}");
        }*/

        [Test]
        public async Task AddQuanHe_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var request = new DanhMucNhomLuongRequest { Hesoluong = 1.8, Bacluong = 3, Ghichu = "Ghi chú thêm", Ngachcongchuc = 3, Luongcoban = 7000000 };
            _nhomLuongServiceMock.Setup(s => s.AddNhomLuong(request)).ReturnsAsync(new TblDanhMucNhomLuong { Nhomluong = 3 });

            // Act
            var result = await _controller.AddQuanHe(request);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // In thông báo khi thêm nhóm lương thành công
            Console.WriteLine("Thêm nhóm lương thành công.");
        }

        [Test]
        public async Task UpdateQuanHe_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            // Arrange
            int id = 1;
            var request = new DanhMucNhomLuongRequest { Hesoluong = 2.0, Bacluong = 2, Ghichu = "Ghi chú sửa", Ngachcongchuc = 2, Luongcoban = 6000000 };
            _nhomLuongServiceMock.Setup(s => s.UpdateNhomLuongAsync(id, request)).ReturnsAsync(new TblDanhMucNhomLuong { Nhomluong = 1 });

            // Act
            var result = await _controller.UpdateQuanHe(id, request);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // In thông báo khi sửa nhóm lương thành công
            Console.WriteLine("Sửa nhóm lương thành công.");
        }

        [Test]
        public async Task DeleteQuanHe_ReturnsNoContent_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 1;
            _nhomLuongServiceMock.Setup(s => s.DeleteNhomLuongAsync(id)).ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteQuanHe(id);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);

            // In thông báo khi xóa nhóm lương thành công
            Console.WriteLine("Xóa nhóm lương thành công.");
        }

        [Test]
        public async Task DeleteQuanHe_ReturnsNotFound_WhenDeletionFails()
        {
            // Arrange
            int id = 1;
            _nhomLuongServiceMock.Setup(s => s.DeleteNhomLuongAsync(id)).ThrowsAsync(new KeyNotFoundException("Nhóm lương không tồn tại."));

            // Act
            var result = await _controller.DeleteQuanHe(id);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
            var notFoundResult = result as NotFoundObjectResult;
            Assert.AreEqual("Nhóm lương không tồn tại.", notFoundResult.Value);

            // In thông báo khi không tìm thấy nhóm lương để xóa
            Console.WriteLine("Nhóm lương không tồn tại.");
        }
    }
}

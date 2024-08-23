/*using NUnit.Framework;
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
    public class DanhSachLenLuongControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IDanhSachLenLuongService> _danhSachLenLuongServiceMock;
        private DanhSachLenLuongController _controller;
        private List<DanhSachLenLuongResponse> _danhSachLenLuongs;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _danhSachLenLuongServiceMock = new Mock<IDanhSachLenLuongService>();
            _controller = new DanhSachLenLuongController(_contextMock.Object, _danhSachLenLuongServiceMock.Object);

            // Khai báo danh sách lên lương
            _danhSachLenLuongs = new List<DanhSachLenLuongResponse>
            {
                new DanhSachLenLuongResponse { MaNV = "NV1", TenNV = "John Doe", TenChucVu = "Developer", TenPhongBan = "IT", TenTo = "A" },
                new DanhSachLenLuongResponse { MaNV = "NV2", TenNV = "Jane Doe", TenChucVu = "Tester", TenPhongBan = "QA", TenTo = "B" }
            };

            // Setup mock service trả về danh sách
            _danhSachLenLuongServiceMock.Setup(s => s.getDanhSachNhanVienLenLuong()).ReturnsAsync(_danhSachLenLuongs);
        }

        // Get all
        [Test]
        public async Task GetDanhSachLenLuong_ReturnsOkResult_WithListOfNhanVien()
        {
            // Act
            var result = await _controller.GetDanhSachLenLuong();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhSachLenLuongs, okResult.Value);

            // In danh sách nhân viên lên lương
            Console.WriteLine("Danh sách nhân viên lên lương:");
            foreach (var nv in _danhSachLenLuongs)
            {
                Console.WriteLine($"MaNV: {nv.MaNV}, Tên: {nv.TenNV}, Chức vụ: {nv.TenChucVu}, Phòng ban: {nv.TenPhongBan}, Tổ: {nv.TenTo}");
            }
        }

        // Get by ID (Replace with appropriate method if necessary)
        [Test]
        public async Task GetDanhSachLenLuongById_ReturnsOkResult_WithNhanVien()
        {
            string mNV = "NV1";
            // Arrange
            var nhanVien = _danhSachLenLuongs.FirstOrDefault(nv => nv.MaNV == mNV);
            _danhSachLenLuongServiceMock.Setup(s => s.GetDanhSachLenLuongById(mNV)).ReturnsAsync(nhanVien);

            // Act
            var result = await _controller.GetDanhSachLenLuongById(mNV);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(nhanVien, okResult.Value);

            // In thông tin nhân viên
            Console.WriteLine($"Nhân viên MaNV: {nhanVien.MaNV}, Tên: {nhanVien.TenNV}, Chức vụ: {nhanVien.TenChucVu}");
        }

        // Add
        [Test]
        public async Task AddDanhSachLenLuong_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new InsertHoSoLuongKhongActive { Mahopdong = "HD123", Nhomluong = id };
            _danhSachLenLuongServiceMock.Setup(s => s.TaoVaThemDanhSachNangLuong(req)).ReturnsAsync(1);

            // Act
            var result = await _controller.TaoVaThemDanhSachNangLuong(req);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var objectResult = result as OkObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual(1, ((dynamic)objectResult.Value).Id);

            // In thông báo thêm thành công
            Console.WriteLine("Thêm danh sách nhân viên lên lương thành công với ID: " + id);
        }

        // Update (if applicable)
        [Test]
        public async Task UpdateDanhSachLenLuong_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int maNV = 1;
            var req = new UpdateHoSoLuongRequest { Mahopdong = "HD123", Nhomluong = "Group2" };

            _danhSachLenLuongServiceMock.Setup(s => s.UpdateDanhSachNangLuong(maNV, req)).ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateDanhSachLenLuong(maNV, req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Update thành công", objectResult.Value);

            // In thông báo cập nhật thành công
            Console.WriteLine("Cập nhật danh sách nhân viên lên lương thành công");
        }

        // Delete
        [Test]
        public async Task RemoveDanhSachLenLuong_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int maNV = 1;
            _danhSachLenLuongServiceMock.Setup(s => s.RemoveDanhSachNangLuong(maNV)).ReturnsAsync(true);

            // Act
            var result = await _controller.RemoveDanhSachLenLuong(maNV);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa thành công", objectResult.Value);

            // In thông báo xóa thành công
            Console.WriteLine($"Xóa nhân viên lên lương với MaNV: {maNV} thành công");
        }
    }
}
*/
/*using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class HoSoLuongControllerTests
    {
        private Mock<IHoSoLuongService> _hoSoLuongServiceMock;
        private HoSoLuongController _controller;
        private List<TblDanhMucNhomLuong> _danhMucNhomLuongs;

        [SetUp]
        public void Setup()
        {
            _hoSoLuongServiceMock = new Mock<IHoSoLuongService>();
            _controller = new HoSoLuongController(_hoSoLuongServiceMock.Object, new Mock<NhanSuContext>().Object);

            // Example data setup
            _danhMucNhomLuongs = new List<TblDanhMucNhomLuong>
            {
                new TblDanhMucNhomLuong { Ngachcongchuc = 1, Bacluong = 1, Nhomluong = 1, Hesoluong = 1000, Luongcoban = 2000 },
                new TblDanhMucNhomLuong { Ngachcongchuc = 2, Bacluong = 2, Nhomluong = 2,  Hesoluong = 2000,Luongcoban = 1000 }
            };

            // Setup mock service
            _hoSoLuongServiceMock.Setup(s => s.GetBacLuongByChucDanhAsync(It.IsAny<int>())).ReturnsAsync(_danhMucNhomLuongs);
            _hoSoLuongServiceMock.Setup(s => s.GetLuongDetailsAsync(It.IsAny<int?>(), It.IsAny<int?>())).ReturnsAsync(_danhMucNhomLuongs);
            _hoSoLuongServiceMock.Setup(s => s.getChucDanhByHopDong(It.IsAny<string>())).Returns(new IdAndName { Id = 1, Ten = "Chức danh 1" });
            _hoSoLuongServiceMock.Setup(s => s.getPhuCapByChucDanh(It.IsAny<int>())).Returns(new TblDanhMucChucDanh { Id = 1, Ten = "Phụ cấp 1" });
        }

        // Create HoSoLuong
        [Test]
        public async Task TaoMoiHoSoLuong_ReturnsOkResult_WhenAdditionIsSuccessful()
        {
            var request = new InsertHoSoLuong { *//* Fill in properties *//* };

            var result = await _controller.TaoMoiHoSoLuong(request);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Them ho so luong thanh cong!!", okResult.Value);
        }

        // Calculate Salary
        [Test]
        public async Task TinhLuong_ReturnsOkResult_WithCalculatedSalary()
        {
            var request = new TinhLuongRequest { Hesoluong = 1000, Mahopdong = "HD01", Phucapkhac = 10000, Phucaptrachnhiem = 2000 };
            var expectedLuong = new TblLuong { Nhomluong = 1000, Phucaptrachnhiem = 1000, Thoihanlenluong = "5", Phucapkhac = 1000,
            Id = 1, Mahopdong = "HD01", Tongluong = 1000, Trangthai = 1000, 
            };

            _hoSoLuongServiceMock.Setup(s => s.tinhLuong(request)).Returns(expectedLuong);

            var result = await _controller.TinhLuong(request);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(expectedLuong, okResult.Value);
        }

        // Update HoSoLuong
        [Test]
        public async Task ChinhSuaHoSoLuong_ReturnsOkResult_WhenUpdateIsSuccessful()
        {
            int id = 1;
            var request = new InsertHoSoLuong { *//* Fill in properties *//* };

            var result = await _controller.ChinhSuaHoSoLuong(id, request);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Update thanh cong!", okResult.Value);
        }

        // Delete HoSoLuong
        [Test]
        public async Task XoaHoSoLuong_ReturnsOkResult_WhenDeletionIsSuccessful()
        {
            int id = 1;

            var result = await _controller.XoaHoSoLuong(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Xóa hồ sơ lương thành công.", okResult.Value);
        }

        // Get All Luong By MaNV
        [Test]
        public async Task GetAllLuongByMaNV_ReturnsOkResult_WithLuongList()
        {
            string maNV = "NV001";
            var hoSoLuong = new List<TblHopDong> { *//* Fill in properties *//* };
            _hoSoLuongServiceMock.Setup(s => s.getAllHoSoLuongByMaNV(maNV)).ReturnsAsync(hoSoLuong);

            var result = await _controller.GetAllLuongByMaNV(maNV);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(hoSoLuong, okResult.Value);
        }

        // Get Luong By Id
        [Test]
        public async Task GetLuongById_ReturnsOkResult_WithLuong()
        {
            int id = 1;
            var hoSoLuong = new TblHopDong { *//* Fill in properties *//* };
            _hoSoLuongServiceMock.Setup(s => s.getHoSoLuongById(id)).ReturnsAsync(hoSoLuong);

            var result = await _controller.GetLuongById(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(hoSoLuong, okResult.Value);
        }

        // Get ChucDanh By HopDong
        [Test]
        public void GetChucDanhByHopDong_ReturnsOkResult_WithChucDanh()
        {
            string maHopDong = "HD001";
            var chucDanh = new IdAndName { Id = 1, Name = "Chức danh 1" };
            _hoSoLuongServiceMock.Setup(s => s.getChucDanhByHopDong(maHopDong)).Returns(chucDanh);

            var result = _controller.GetChucDanhByHopDong(maHopDong);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(chucDanh, okResult.Value);
        }

        // Get PhuCap By ChucDanh
        [Test]
        public void GetPhuCapByChucDanh_ReturnsOkResult_WithPhuCap()
        {
            int id = 1;
            var phuCap = new TblDanhMucChucDanh { Id = 1, Ten = "Phụ cấp 1" };
            _hoSoLuongServiceMock.Setup(s => s.getPhuCapByChucDanh(id)).Returns(phuCap);

            var result = _controller.GetPhuCapByChucDanh(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(phuCap, okResult.Value);
        }

        // Get BacLuong By NgachCongChuc
        [Test]
        public async Task GetBacLuongByNgachCongChuc_ReturnsOkResult_WithBacLuongList()
        {
            int ngachCongChucId = 1;
            var bacLuongs = new List<TblDanhMucNhomLuong> { *//* Fill in properties *//* };

            var result = await _controller.GetBacLuongByChucDanh(ngachCongChucId);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(bacLuongs, okResult.Value);
        }

        // Get Luong Details
        [Test]
        public async Task GetLuongDetails_ReturnsOkResult_WithLuongList()
        {
            int? ngachCongChucId = 1;
            int? bacLuongId = 1;
            var luongs = new List<TblDanhMucNhomLuong> { *//* Fill in properties *//* };

            var result = await _controller.GetLuongDetails(ngachCongChucId, bacLuongId);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(luongs, okResult.Value);
        }

        // Get NhomLuong By ChucDanh And BacLuong
        [Test]
        public void GetNhomLuongByChucDanhAndBacLuong_ReturnsOkResult_WithNhomLuong()
        {
            int chucdanh = 1;
            double bacluong = 1;
            var nhomLuong = "Nhóm 1";

            var result = _controller.GetNhomLuongByChucDanhAndBacLuong(chucdanh, bacluong);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(nhomLuong, okResult.Value);
        }
    }
}
*/
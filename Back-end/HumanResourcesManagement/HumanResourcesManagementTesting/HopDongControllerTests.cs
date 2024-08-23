/*using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class HopDongControllerTests
    {
        private Mock<IHopDongService> _hopDongServiceMock;
        private HopDongController _controller;
        private List<TblHopDong> _hopDongResponses;
        private List<TblDanhMucLoaiHopDong> _loaiHopDongResponses;
        private List<TblDanhMucChucDanh> _chucDanhResponses;

        [SetUp]
        public void Setup()
        {
            _hopDongServiceMock = new Mock<IHopDongService>();
            _controller = new HopDongController(_hopDongServiceMock.Object, null);

            // Khai báo danh sách hợp đồng
            _hopDongResponses = new List<TblHopDong>
            {
                new TblHopDong { Mahopdong = "HD001", Loaihopdong = 1, Chucdanh = 1, Hopdongtungay = DateTime.Now, Hopdongdenngay = DateTime.Now.AddYears(1), Ghichu = "Ghi chú A", Ma = "NV001", TrangThai = 1 },
                new TblHopDong { Mahopdong = "HD002", Loaihopdong = 2, Chucdanh = 2, Hopdongtungay = DateTime.Now, Hopdongdenngay = DateTime.Now.AddYears(2), Ghichu = "Ghi chú B", Ma = "NV002", TrangThai = 1 }
            };

            // Khai báo danh sách loại hợp đồng
            _loaiHopDongResponses = new List<TblDanhMucLoaiHopDong>
            {
                new TblDanhMucLoaiHopDong { Id = 1, Ten = "Loại A", Ma = "LA" },
                new TblDanhMucLoaiHopDong { Id = 2, Ten = "Loại B", Ma = "LB" }
            };

            // Khai báo danh sách chức danh
            _chucDanhResponses = new List<TblDanhMucChucDanh>
            {
                new TblDanhMucChucDanh { Id = 1, Ten = "Chức Danh A", Ma = "CDA" },
                new TblDanhMucChucDanh { Id = 2, Ten = "Chức Danh B", Ma = "CDB" }
            };

            // Setup mock service trả về danh sách hợp đồng
            _hopDongServiceMock.Setup(s => s.GetAllHopDong()).ReturnsAsync(_hopDongResponses);
            _hopDongServiceMock.Setup(s => s.GetHopDongByMaHopDong(It.IsAny<string>())).ReturnsAsync((string id) => _hopDongResponses.FirstOrDefault(hd => hd.Mahopdong == id));
            _hopDongServiceMock.Setup(s => s.GetAllHopDongByMaNV(It.IsAny<string>())).ReturnsAsync(_hopDongResponses);
            _hopDongServiceMock.Setup(s => s.GetAllHopDongByActiveMaNV(It.IsAny<string>())).ReturnsAsync(_hopDongResponses);
            _hopDongServiceMock.Setup(s => s.GetAllLoaiHopDong()).ReturnsAsync(_loaiHopDongResponses);
            _hopDongServiceMock.Setup(s => s.GetAllChucDanh()).ReturnsAsync(_chucDanhResponses);
        }

        // Create HopDong
        [Test]
        public async Task CreateHopDong_ReturnsStatusCode200_WhenCreationIsSuccessful()
        {
            // Arrange
            var request = new InsertHopDongRequest { *//* populate with necessary data *//* };

            // Act
            var result = await _controller.CreateHopDong(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Tạo hợp đồng thành công!!", result.StatusCode.ToString());

            // Verify the service was called
            _hopDongServiceMock.Verify(s => s.TaoHopDong(It.IsAny<InsertHopDongRequest>()), Times.Once);
        }

        // Update HopDong
        [Test]
        public async Task UpdateHopDong_ReturnsOkResult_WhenUpdateIsSuccessful()
        {
            // Arrange
            var id = "HD001";
            var request = new UpdateHopDongRequest { *//* populate with necessary data *//* };

            // Act
            var result = await _controller.UpdateHopDong(id, request) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Update thanh cong!", result.Value);

            // Verify the service was called
            _hopDongServiceMock.Verify(s => s.SuaHopDong(It.IsAny<string>(), It.IsAny<UpdateHopDongRequest>()), Times.Once);
        }

        // Delete HopDong
        [Test]
        public async Task DeleteHopDong_ReturnsOkResult_WhenDeletionIsSuccessful()
        {
            // Arrange
            var id = "HD001";

            // Act
            var result = await _controller.DeleteHopDong(id) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Xóa hợp đồng thành công.", result.Value);

            // Verify the service was called
            _hopDongServiceMock.Verify(s => s.XoaHopDong(It.IsAny<string>()), Times.Once);
        }

        // Get All HopDong
        [Test]
        public async Task GetAllHopDong_ReturnsOkResult_WithListOfHopDong()
        {
            // Act
            var result = await _controller.GetAllHopDong() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(_hopDongResponses, result.Value);
        }

        // Get HopDong By MaHopDong
        [Test]
        public async Task GetHopDongByMaHopDong_ReturnsOkResult_WithHopDong()
        {
            // Arrange
            var id = "HD001";
            var expectedHopDong = _hopDongResponses.FirstOrDefault(hd => hd.Mahopdong == id);
            _hopDongServiceMock.Setup(s => s.GetHopDongByMaHopDong(id)).ReturnsAsync(expectedHopDong);

            // Act
            var result = await _controller.GetHopDongByMaHopDong(id) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedHopDong, result.Value);
        }

        // Get HopDong By MaNV
        [Test]
        public async Task GetHopDongByMaNV_ReturnsOkResult_WithListOfHopDong()
        {
            // Arrange
            var maNV = "NV001";

            // Act
            var result = await _controller.GetHopDongByMaNV(maNV) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(_hopDongResponses, result.Value);
        }

        // Get HopDong Active By MaNV
        [Test]
        public async Task GetHopDongActiveByMaNV_ReturnsOkResult_WithListOfActiveHopDong()
        {
            // Arrange
            var maNV = "NV001";

            // Act
            var result = await _controller.GetHopDongActiveByMaNV(maNV) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(_hopDongResponses, result.Value);
        }

        // Get All LoaiHopDong
        [Test]
        public async Task GetAllLoaiHopDong_ReturnsOkResult_WithListOfLoaiHopDong()
        {
            // Act
            var result = await _controller.GetAllLoaiHopDong() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(_loaiHopDongResponses, result.Value);
        }

        // Get All ChucDanh
        [Test]
        public async Task GetAllChucDanh_ReturnsOkResult_WithListOfChucDanh()
        {
            // Act
            var result = await _controller.GetAllChucDanh() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(_chucDanhResponses, result.Value);
        }
    }
}
*/
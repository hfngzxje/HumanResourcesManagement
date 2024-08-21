/*using Moq;
using NUnit.Framework;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using HumanResourcesManagement.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucQuanHeControllerTests
    {
        private Mock<IDanhMucQuanHeService> _danhMucQuanHeServiceMock;
        private DanhMucQuanHeController _controller;
        private Mock<NhanSuContext> _contextMock;

        // Đưa biến quanHeList ra ngoài các phương thức
        private List<TblDanhMucNguoiThan> quanHeList;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>();
            _danhMucQuanHeServiceMock = new Mock<IDanhMucQuanHeService>();
            _controller = new DanhMucQuanHeController(_contextMock.Object, _danhMucQuanHeServiceMock.Object);

            // Khởi tạo quanHeList trong phương thức Setup
            quanHeList = new List<TblDanhMucNguoiThan>
            {
                new TblDanhMucNguoiThan { Id = 1, Ten = "Mẹ", Ma = "QH1" },
                new TblDanhMucNguoiThan { Id = 2, Ten = "Bố", Ma = "QH2" }
            };
        }

        [Test]
        public async Task GetDanhMucQuanHe()
        {
            // Arrange
            _danhMucQuanHeServiceMock.Setup(service => service.GetAllQuanHe())
                                     .ReturnsAsync(quanHeList);

            // Act
            var result = await _controller.GetDanhMucQuanHe();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(quanHeList, okResult.Value);
            string json = JsonConvert.SerializeObject(okResult.Value, Formatting.Indented);
            Console.WriteLine($"Status Code: {okResult.StatusCode}");
            Console.WriteLine($"Response Value: {json}");
        }

        [Test]
        public async Task GetDanhMucQuanHeById()
        {
            // Arrange
            var quanHe = new TblDanhMucNguoiThan
            {
                Id = 1,
                Ten = "Mẹ",
                Ma = "QH1"
            };
            int id = 2; // Sử dụng id phù hợp với danh sách quanHeList
            _danhMucQuanHeServiceMock.Setup(service => service.GetQuanHeById(id))
                                     .ReturnsAsync(quanHe);

            // Act
            var result = await _controller.GetDanhMucQuanHeById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(quanHe, okResult.Value);
            string json = JsonConvert.SerializeObject(okResult.Value, Formatting.Indented);
            Console.WriteLine($"Status Code: {okResult.StatusCode}");
            Console.WriteLine($"Response Value: {json}");
        }

        [Test]
        public async Task AddQuanHe()
        {
            // Arrange
            var request = new QuanHeRequest { Ten = null};
            var quanHe = new TblDanhMucNguoiThan
            {
                Id = 1,
                Ten = "Bố",
                Ma = "QH1"
            };// Tạo một đối tượng TblDanhMucNguoiThan mẫu
            _danhMucQuanHeServiceMock.Setup(service => service.AddQuanHe(request))
                                     .ReturnsAsync(quanHe); // Trả về Task<TblDanhMucNguoiThan>

            // Act
            var result = await _controller.AddQuanHe(request);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var statusCodeResult = result as ObjectResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);
            Assert.AreEqual("Thêm danh mục quan hệ thành công.", statusCodeResult.Value);
            string json = JsonConvert.SerializeObject(statusCodeResult.Value, Formatting.Indented);
            Console.WriteLine($"Status Code: {statusCodeResult.StatusCode}");
            Console.WriteLine($"Response Value: {json}");
        }

        [Test]
        public async Task RemoveQuanHe()
        {
            // Arrange
            int id = 1;
            _danhMucQuanHeServiceMock.Setup(service => service.DeleteQuanHe(id))
                                     .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.RemoveQuanHe(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var statusCodeResult = result as ObjectResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);
            Assert.AreEqual("Xóa danh mục quan hệ thành công.", statusCodeResult.Value);
        }

        [Test]
        public async Task UpdateQuanHe()
        {
            // Arrange
            int id = 100;
            var request = new QuanHeRequest();
            var quanHe = new TblDanhMucNguoiThan(); // Tạo một đối tượng TblDanhMucNguoiThan mẫu
            _danhMucQuanHeServiceMock.Setup(service => service.UpdateQuanHe(id, request))
                                     .ReturnsAsync(quanHe); // Trả về Task<TblDanhMucNguoiThan>

            // Act
            var result = await _controller.UpdateQuanHe(id, request);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var statusCodeResult = result as ObjectResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);
            Assert.AreEqual("Cập nhật danh mục quan hệ thành công.", statusCodeResult.Value);
        }
    }
}
*/
/*using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucNgoaiNguControllerTests
    {

        private Mock<IDanhMucNgoaiNguService> _danhMucNgoaiNguServiceMock;
        private DanhMucNgoaiNguController _controller;
        private Mock<NhanSuContext> _contextMock;
        private readonly NhanSuContext _context;

        public DanhMucNgoaiNguControllerTests()
        {
            var options = new DbContextOptionsBuilder<NhanSuContext>()
                            .UseInMemoryDatabase(databaseName: "NhanSu")
                            .Options;

            _context = new NhanSuContext(options); // Khởi tạo _context với InMemory Database
            _danhMucNgoaiNguServiceMock = new Mock<IDanhMucNgoaiNguService>();
            _controller = new DanhMucNgoaiNguController(_danhMucNgoaiNguServiceMock.Object, _context);
        }

        [SetUp]
        public void Setup()
        {
            _danhMucNgoaiNguServiceMock = new Mock<IDanhMucNgoaiNguService>();
            _contextMock = new Mock<NhanSuContext>(); // Tạo mock cho NhanSuContext nếu cần thiết.
            _controller = new DanhMucNgoaiNguController(_danhMucNgoaiNguServiceMock.Object, _contextMock.Object);
        }

        [Test]
        public async Task GetDanhMucNgoaiNgu()
        {
            // Arrange
            var danhMucList = new List<DanhMucNgoaiNguResponse> { new DanhMucNgoaiNguResponse { Id = 1,
                Ten = "Tiếng Anh",
                Ma = "TA1"},
            new DanhMucNgoaiNguResponse {Id = 2,
                Ten = "Tiếng Phasp",
                Ma = "TA2" }};
            _danhMucNgoaiNguServiceMock.Setup(service => service.GetDanhMucNgoaiNgu())
                                       .ReturnsAsync(danhMucList);

            // Act
            var result = await _controller.GetDanhMucNgoaiNgu();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(danhMucList, okResult.Value);
            string json = JsonConvert.SerializeObject(okResult.Value, Formatting.Indented);
            Console.WriteLine($"Status Code: {okResult.StatusCode}");
            Console.WriteLine($"Response Value: {json}");
        }

        [Test]
        public async Task GetDanhMucNgoaiNguById()
        {
            // Arrange
            var danhMuc = new DanhMucNgoaiNguResponse
            {
                Id = 1,
                Ten = "Tiếng Anh",
                Ma = "TA1"
            };
            _danhMucNgoaiNguServiceMock.Setup(service => service.GetDanhMucNgoaiNguById(It.IsAny<int>()))
                                       .ReturnsAsync(danhMuc);

            // Act
            var result = await _controller.GetDanhMucNgoaiNguById(1);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(danhMuc, okResult.Value);
            string json = JsonConvert.SerializeObject(okResult.Value, Formatting.Indented);
            Console.WriteLine($"Status Code: {okResult.StatusCode}");
            Console.WriteLine($"Response Value: {json}");
        }

        [Test]
        public async Task AddDanhMucNgoaiNgu()
        {
            // Arrange
            var request = new DanhMucNgoaiNguRequest { Ten =  };
            _danhMucNgoaiNguServiceMock.Setup(service => service.AddDanhMucNgoaiNgu(request))
                                       .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.AddDanhMucNgoaiNgu(request);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var statusCodeResult = result as ObjectResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);
            Assert.AreEqual("Thêm thành công", statusCodeResult.Value);
        }

        [Test]
        public async Task UpdateDanhMucNgoaiNgu()
        {
            // Arrange
            var request = new DanhMucNgoaiNguRequest { Ten = "Haha" };
            _danhMucNgoaiNguServiceMock.Setup(service => service.UpdateDanhMucNgoaiNgu(request, It.IsAny<int>()))
                                       .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.UpdateDanhMucNgoaiNgu(request, 1);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var statusCodeResult = result as ObjectResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);
            Assert.AreEqual("Sửa thành công", statusCodeResult.Value);
        }

        [Test]
        public async Task DeleteDanhMucNgoaiNgu()
        {
            // Arrange
            _danhMucNgoaiNguServiceMock.Setup(service => service.DeleteDanhMucNgoaiNgu(It.IsAny<int>()))
                                       .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteDanhMucNgoaiNgu(100);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var statusCodeResult = result as ObjectResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);
            Assert.AreEqual("Xóa thành công", statusCodeResult.Value);
        }
    }
}*/
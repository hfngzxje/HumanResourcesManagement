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
using HumanResourcesManagement.DTOS.Response;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucHinhThucDaoTaoControllerTests
    {
        private Mock<IDanhMucHinhThucDaoTaoService> _danhMucHinhThucDaoTaoServiceMock;
        private DanhMucHinhThucDaoTaoController _controller;
        private List<TblHinhThucDaoTao> _danhMucHinhThucDaoTaos;

        [SetUp]
        public void Setup()
        {
            _danhMucHinhThucDaoTaoServiceMock = new Mock<IDanhMucHinhThucDaoTaoService>();
            _controller = new DanhMucHinhThucDaoTaoController(_danhMucHinhThucDaoTaoServiceMock.Object, null);

            // Khai báo danh sách hình thức đào tạo
            _danhMucHinhThucDaoTaos = new List<TblHinhThucDaoTao>
    {
        new TblHinhThucDaoTao { Id = 1, Ten = "Đào tạo dài hạn" },
        new TblHinhThucDaoTao { Id = 2, Ten = "Đào tạo ngắn hạn" }
    };

            // Chuyển đổi danh sách hình thức đào tạo thành kiểu trả về mong đợi
            var danhMucHinhThucDaoTaosResponse = _danhMucHinhThucDaoTaos.Select(d => new HinhThucDaoTaoResponse
            {
                Id = d.Id,
                Ten = d.Ten
            });

            // Setup mock service trả về danh sách
            _danhMucHinhThucDaoTaoServiceMock.Setup(s => s.GetDanhMucHinhThucDaoTao())
                .ReturnsAsync(danhMucHinhThucDaoTaosResponse);
        }

        // Get all
        [Test]
        public async Task GetDanhMucHinhThucDaoTao_ReturnsOkResult_WithListOfHinhThucDaoTao()
        {
            // Act
            var result = await _controller.GetDanhMucHinhThucDaoTao();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucHinhThucDaoTaos, okResult.Value);

            // In danh sách hình thức đào tạo
            Console.WriteLine("Danh sách hình thức đào tạo:");
            foreach (var ht in _danhMucHinhThucDaoTaos)
            {
                Console.WriteLine($"Id: {ht.Id}, Tên: {ht.Ten}");
            }
        }

        // Get by id
        [Test]
        public async Task GetDanhMucHinhThucDaoTaoById_ReturnsOkResult_WithDanhMucHinhThucDaoTao()
        {
            int id = 1;
            // Arrange
            var hinhThucDaoTaoResponse = new HinhThucDaoTaoResponse
            {
                Id = id,
                Ten = _danhMucHinhThucDaoTaos.FirstOrDefault(d => d.Id == id)?.Ten,
                Ma = _danhMucHinhThucDaoTaos.FirstOrDefault(d => d.Id == id)?.Ma
            };

            _danhMucHinhThucDaoTaoServiceMock
                .Setup(s => s.GetDanhMucHinhThucDaoTaoById(id))
                .ReturnsAsync(hinhThucDaoTaoResponse);

            // Act
            var result = await _controller.GetDanhMucHinhThucDaoTaoById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(hinhThucDaoTaoResponse, okResult.Value);

            // In thông tin hình thức đào tạo với Id tương ứng
            Console.WriteLine($"Hình thức đào tạo Id: {hinhThucDaoTaoResponse.Id}, Tên: {hinhThucDaoTaoResponse.Ten}");
        }


        [Test]
        public async Task AddDanhMucHinhThucDaoTao_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new HinhThucDaoTaoRequest { Ten = "Đào tạo từ xa" };

            // Act
            var result = await _controller.AddDanhMucHinhThucDaoTao(req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Thêm hình thức đào tạo mới vào danh sách
            var newId = _danhMucHinhThucDaoTaos.Max(d => d.Id) + 1;
            var newHinhThucDaoTao = new TblHinhThucDaoTao { Id = newId, Ten = req.Ten };
            _danhMucHinhThucDaoTaos.Add(newHinhThucDaoTao);

            // In danh sách hình thức đào tạo sau khi thêm mới
            Console.WriteLine("Danh sách hình thức đào tạo sau khi thêm mới:");
            foreach (var ht in _danhMucHinhThucDaoTaos)
            {
                Console.WriteLine($"Id: {ht.Id}, Tên: {ht.Ten}");
            }
        }

        [Test]
        public async Task UpdateDanhMucHinhThucDaoTao_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new HinhThucDaoTaoRequest { Ten = "Đào tạo cấp tốc" };

            // Act
            var result = await _controller.UpdateDanhMucHinhThucDaoTao(req, id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Cập nhật hình thức đào tạo trong danh sách
            var updatedHinhThucDaoTao = _danhMucHinhThucDaoTaos.FirstOrDefault(d => d.Id == id);
            if (updatedHinhThucDaoTao != null)
            {
                updatedHinhThucDaoTao.Ten = req.Ten;
            }

            // In lại danh sách hình thức đào tạo sau khi cập nhật
            Console.WriteLine("Danh sách hình thức đào tạo sau khi cập nhật:");
            foreach (var ht in _danhMucHinhThucDaoTaos)
            {
                Console.WriteLine($"Id: {ht.Id}, Tên: {ht.Ten}");
            }
        }

        [Test]
        public async Task RemoveDanhMucHinhThucDaoTao_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 2;

            // Act
            var result = await _controller.DeleteDanhMucHinhThucDaoTao(id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(200, statusCodeResult.StatusCode);

            // Xóa hình thức đào tạo khỏi danh sách
            var deletedHinhThucDaoTao = _danhMucHinhThucDaoTaos.FirstOrDefault(d => d.Id == id);
            _danhMucHinhThucDaoTaos.Remove(deletedHinhThucDaoTao);

            // In lại danh sách hình thức đào tạo sau khi xóa
            Console.WriteLine("Danh sách hình thức đào tạo sau khi xóa:");
            foreach (var ht in _danhMucHinhThucDaoTaos)
            {
                Console.WriteLine($"Id: {ht.Id}, Tên: {ht.Ten}");
            }
        }
    }
}

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
    public class DanhMucNgachCongChucControllerTests
    {
        private Mock<INgachCongChucService> _ngachCongChucServiceMock;
        private DanhMucNgachCongChucController _controller;
        private List<TblDanhMucNgachCongChuc> _ngachCongChucs;

        [SetUp]
        public void Setup()
        {
            _ngachCongChucServiceMock = new Mock<INgachCongChucService>();
            _controller = new DanhMucNgachCongChucController(_ngachCongChucServiceMock.Object);

            // Khai báo danh sách NgachCongChuc dưới dạng Model
            _ngachCongChucs = new List<TblDanhMucNgachCongChuc>
            {
                new TblDanhMucNgachCongChuc { Id = 1, Ten = "Ngạch 1" },
                new TblDanhMucNgachCongChuc { Id = 2, Ten = "Ngạch 2" },
                new TblDanhMucNgachCongChuc { Id = 3, Ten = "Ngạch 3" }
            };

            // Setup mock service trả về danh sách Model
            _ngachCongChucServiceMock.Setup(s => s.GetAllNgachCongChuc())
                .ReturnsAsync(_ngachCongChucs);
        }

        [Test]
        public async Task GetAllNgachCongChuc_ReturnsOkResult_WithListOfNgachCongChuc()
        {
            // Act
            var result = await _controller.GetAllNgachCongChuc();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_ngachCongChucs, okResult.Value);

            // In danh sách NgachCongChuc
            Console.WriteLine("Danh sách NgachCongChuc:");
            foreach (var ngach in _ngachCongChucs)
            {
                Console.WriteLine($"Id: {ngach.Id}, Tên: {ngach.Ten}");
            }
        }

        [Test]
        public async Task GetNgachCongChucById_ReturnsOkResult_WithNgachCongChuc()
        {
            int id = 1;
            // Arrange
            var ngachCongChuc = _ngachCongChucs.FirstOrDefault(n => n.Id == id);
            _ngachCongChucServiceMock.Setup(s => s.GetNgachCongChucById(id))
                .ReturnsAsync(ngachCongChuc);

            // Act
            var result = await _controller.GetNgachCongChucById(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(ngachCongChuc, okResult.Value);

            // In thông tin NgachCongChuc với Id tương ứng
            Console.WriteLine($"NgachCongChuc Id: {ngachCongChuc.Id}, Tên: {ngachCongChuc.Ten}");
        }

        [Test]
        public async Task AddNgachCongChuc_ReturnsOkResult_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new InsertNgachCongChuc { Ten = "Ngạch 4" };
            var newNgachCongChuc = new TblDanhMucNgachCongChuc { Id = 4, Ten = "Ngạch 4" };
            _ngachCongChucServiceMock.Setup(s => s.AddNgachCongChuc(req))
                .ReturnsAsync(newNgachCongChuc);

            // Act
            var result = await _controller.AddNgachCongChuc(req);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(newNgachCongChuc, okResult.Value);

            // Thêm NgachCongChuc mới vào danh sách
            _ngachCongChucs.Add(newNgachCongChuc);

            // In danh sách NgachCongChuc sau khi thêm mới
            Console.WriteLine("Danh sách NgachCongChuc sau khi thêm mới:");
            foreach (var ngach in _ngachCongChucs)
            {
                Console.WriteLine($"Id: {ngach.Id}, Tên: {ngach.Ten}");
            }
        }

        [Test]
        public async Task UpdateNgachCongChuc_ReturnsOkResult_WhenUpdateIsSuccessful()
        {
            int id = 1;
            var req = new UpdateNgachCongChucRequest { Ten = "Ngạch 1 Cập Nhật" };

            // Act
            var result = await _controller.UpdateNgachCongChuc(req);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual("Sửa thành công", okResult.Value);

            // Cập nhật NgachCongChuc trong danh sách
            var updatedNgachCongChuc = _ngachCongChucs.FirstOrDefault(n => n.Id == id);
            if (updatedNgachCongChuc != null)
            {
                updatedNgachCongChuc.Ten = req.Ten;
            }

            // In lại danh sách NgachCongChuc sau khi cập nhật
            Console.WriteLine("Danh sách NgachCongChuc sau khi cập nhật:");
            foreach (var ngach in _ngachCongChucs)
            {
                Console.WriteLine($"Id: {ngach.Id}, Tên: {ngach.Ten}");
            }
        }

        [Test]
        public async Task DeleteNgachCongChuc_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            int id = 1;

            // Act
            var result = await _controller.DeleteNgachCongChuc(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("Xóa thành công", objectResult.Value);

            // Xóa NgachCongChuc có Id = 1 khỏi danh sách
            var deletedNgachCongChuc = _ngachCongChucs.FirstOrDefault(n => n.Id == id);
            _ngachCongChucs.Remove(deletedNgachCongChuc);

            // In danh sách NgachCongChuc sau khi xóa
            Console.WriteLine("Danh sách NgachCongChuc sau khi xóa:");
            foreach (var ngach in _ngachCongChucs)
            {
                Console.WriteLine($"Id: {ngach.Id}, Tên: {ngach.Ten}");
            }
        }
    }
}

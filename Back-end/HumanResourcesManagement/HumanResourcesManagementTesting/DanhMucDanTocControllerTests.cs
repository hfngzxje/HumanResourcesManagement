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
    public class DanhMucDanTocControllerTests
    {
        private Mock<NhanSuContext> _contextMock;
        private Mock<IDanhMucDanTocService> _danhMucDanTocServiceMock;
        private DanhMucDanTocController _controller;
        private List<TblDanhMucDanToc> _danhMucDanTocs;

        [SetUp]
        public void Setup()
        {
            _contextMock = new Mock<NhanSuContext>(new DbContextOptions<NhanSuContext>());
            _danhMucDanTocServiceMock = new Mock<IDanhMucDanTocService>();
            _controller = new DanhMucDanTocController(_contextMock.Object, _danhMucDanTocServiceMock.Object);

            // Khai báo danh sách dân tộc
            _danhMucDanTocs = new List<TblDanhMucDanToc>
            {
                new TblDanhMucDanToc { Id = 1, Ten = "Kinh" },
                new TblDanhMucDanToc { Id = 2, Ten = "Tày" },
                new TblDanhMucDanToc { Id = 3, Ten = "Mường" }
            };

            // Setup mock service trả về danh sách
            _danhMucDanTocServiceMock.Setup(s => s.GetAllDanToc()).ReturnsAsync(_danhMucDanTocs);
        }
        //Get all
        [Test]
        public async Task GetDanhMucDanToc_ReturnsOkResult_WithListOfDanToc()
        {
            // Act
            var result = await _controller.GetDanhMucDanToc();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(_danhMucDanTocs, okResult.Value);

            // In danh sách dân tộc
            Console.WriteLine("Danh sách dân tộc:");
            foreach (var dt in _danhMucDanTocs)
            {
                Console.WriteLine($"Id: {dt.Id}, Tên: {dt.Ten}");
            }
        }
        //get by id
        [Test]
        public async Task GetDanhMucDanTocById_ReturnsOkResult_WithDanhMucDanToc()
        {
            // Arrange
            var danhMucDanToc = _danhMucDanTocs.FirstOrDefault(d => d.Id == 1);
            _danhMucDanTocServiceMock.Setup(s => s.GetDanTocById(1)).ReturnsAsync(danhMucDanToc);

            // Act
            var result = await _controller.GetDanhMucDanTocById(1);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(danhMucDanToc, okResult.Value);

            // In thông tin dân tộc với Id tương ứng
            Console.WriteLine($"Dân tộc Id: {danhMucDanToc.Id}, Tên: {danhMucDanToc.Ten}");
        }

        [Test]
        public async Task RemoveDanToc_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Act
            int id = 4;
            var result = await _controller.RemoveDanToc(id);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("xoa dan toc thanh cong", objectResult.Value);

            // Xóa dân tộc có Id = 1 khỏi danh sách
            var deletedDanToc = _danhMucDanTocs.FirstOrDefault(d => d.Id == id);
            _danhMucDanTocs.Remove(deletedDanToc);

            // In lại danh sách dân tộc sau khi xóa
            Console.WriteLine("Danh sách dân tộc sau khi xóa:");
            foreach (var dt in _danhMucDanTocs)
            {
                Console.WriteLine($"Id: {dt.Id}, Tên: {dt.Ten}");
            }
        }
       
        //Update success
        [Test]
        public async Task UpdateDanToc_ReturnsStatusCode200_WhenUpdateIsSuccessful()
        {
            int id = 1;
            // Arrange
            var req = new UpdateDanTocRequest { Id = id, Ten = "Tà Ôi" };

            // Act
            var result = await _controller.UpdateDanToc(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("cap nhat dan toc thanh cong", objectResult.Value);

            // Cập nhật dân tộc trong danh sách
            var updatedDanToc = _danhMucDanTocs.FirstOrDefault(d => d.Id == id);
            if (updatedDanToc != null)
            {
                updatedDanToc.Ten = req.Ten;
            }

            // In lại danh sách dân tộc sau khi cập nhật
            Console.WriteLine("Danh sách dân tộc sau khi cập nhật:");
            foreach (var dt in _danhMucDanTocs)
            {
                Console.WriteLine($"Id: {dt.Id}, Tên: {dt.Ten}");
            }
        }

        [Test]
        public async Task AddDanToc_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new InsertDanTocRequest { Ten = "Kinh" };

            // Act
            var result = await _controller.AddDanToc(req);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(200, objectResult.StatusCode);
            Assert.AreEqual("add thanh cong", objectResult.Value);

            // Thêm dân tộc mới vào danh sách
            var newId = _danhMucDanTocs.Max(d => d.Id) + 1;
            var newDanToc = new TblDanhMucDanToc { Id = newId, Ten = req.Ten };
            _danhMucDanTocs.Add(newDanToc);

            // In danh sách dân tộc sau khi thêm mới
            Console.WriteLine("Danh sách dân tộc sau khi thêm mới:");
            foreach (var dt in _danhMucDanTocs)
            {
                Console.WriteLine($"Id: {dt.Id}, Tên: {dt.Ten}");
            }
        }
    }
}
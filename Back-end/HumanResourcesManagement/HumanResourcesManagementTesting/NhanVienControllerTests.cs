using Moq;
using NUnit.Framework;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Tests
{
    [TestFixture]
    public class NhanVienControllerTests
    {
        private Mock<INhanVienService> _mockNhanVienService;
        private NhanVienController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockNhanVienService = new Mock<INhanVienService>();
            _controller = new NhanVienController(_mockNhanVienService.Object);
        }

        [Test]
        public async Task GetAllNhanVien_ShouldReturnOkResult()
        {
            // Arrange
            var mockNhanViens = new List<NhanVienResponse> { new NhanVienResponse() };
            _mockNhanVienService.Setup(service => service.GetAllNhanVien()).ReturnsAsync(mockNhanViens);

            // Act
            var result = await _controller.GetAllNhanVien() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(mockNhanViens, result.Value);
        }

        [Test]
        public async Task CreateNhanVien_ShouldReturnOkResult()
        {
            // Arrange
            var request = new NhanVienRequest();
            _mockNhanVienService.Setup(service => service.AddNhanVienAsync(request)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.CreateNhanVien(request) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Thêm mới nhân viên thành công!!", result.Value);
        }

        [Test]
        public void UpdateNhanVien_ShouldReturnOkResult()
        {
            // Arrange
            var id = "1";
            var request = new NhanVienRequest();
            _mockNhanVienService.Setup(service => service.UpdateNhanVien(id, request)).Verifiable();

            // Act
            var result = _controller.UpdateNhanVien(id, request) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Update thanh cong!", result.Value);
            _mockNhanVienService.Verify();
        }

        [Test]
        public async Task GetById_ShouldReturnOkResult()
        {
            // Arrange
            var id = "1";
            var response = new NhanVienResponse();
            _mockNhanVienService.Setup(service => service.GetNhanVienByIdAsync(id)).ReturnsAsync(response);

            // Act
            var result = await _controller.GetById(id) as ActionResult<NhanVienResponse>;

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(response, okResult.Value);
        }


        [Test]
        public async Task GetById_InvalidId_ShouldReturnBadRequest()
        {
            // Act
            var result = await _controller.GetById("") as ActionResult<NhanVienResponse>;

            // Assert
            var badRequest = result.Result as BadRequestObjectResult;
            Assert.IsNotNull(badRequest);
            Assert.AreEqual(400, badRequest.StatusCode);
            Assert.AreEqual("Mã nhân viên không được để trống.", badRequest.Value);
        }



        [Test]
        public void DeleteNhanVien_ShouldReturnOkResult()
        {
            // Arrange
            var id = "1";
            _mockNhanVienService.Setup(service => service.DeleteNhanVien(id)).Verifiable();

            // Act
            var result = _controller.DeleteNhanVien(id) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Xóa nhân viên thành công.", result.Value);
            _mockNhanVienService.Verify();
        }

        [Test]
        public async Task GetAllDanToc_ShouldReturnOkResult()
        {
            // Arrange
            var mockDanTocs = new List<TblDanhMucDanToc> { new TblDanhMucDanToc() };
            _mockNhanVienService.Setup(service => service.GetAllDanToc()).Returns(mockDanTocs);

            // Act
            var result = _controller.GetAllDanToc() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(mockDanTocs, result.Value);
        }

        /*[Test]
        public async Task GetByPhongBan_ShouldReturnOkResult()
        {
            // Arrange
            var idPhong = 1;
            var gioiTinh = true;
            var mockNhanViens = new List<NhanVienResponse> { new NhanVienResponse() };
            _mockNhanVienService.Setup(service => service.getNhanVienByPhongBan(idPhong, gioiTinh)).ReturnsAsync(mockNhanViens);

            // Act
            var result = await _controller.GetByPhongBan(idPhong, gioiTinh) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(mockNhanViens, result.Value);
        }
*/

        [Test]
        public async Task SyncAdmin_ShouldReturnOkResult()
        {
            // Arrange
            _mockNhanVienService.Setup(service => service.SyncAdminAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.SyncAdmin() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Tao thành công.", result.Value);
        }
    }
}

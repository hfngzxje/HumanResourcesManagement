using NUnit.Framework;
using Moq;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagementTesting
{
    [TestFixture]
    public class TrinhDoVanHoaControllerTests
    {
        private TrinhDoVanHoaController _controller;
        private Mock<ITrinhDoVanHoaService> _mockService;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<ITrinhDoVanHoaService>();
            _controller = new TrinhDoVanHoaController(_mockService.Object, null);
        }

        [Test]
        public async Task GetTrinhDoVanHoaByMaNV_ReturnsOkResult_WithValidData()
        {
            // Arrange
            var response = new List<TrinhDoVanHoaDto>
            {
                new TrinhDoVanHoaDto
                {
                    Id = 1,
                    Tentruong = "Truong1",
                    Chuyennganh = 1,
                    tenChuyenNganh = "ChuyenNganh1",
                    Tuthoigian = DateTime.Now.AddYears(-2),
                    Denthoigian = DateTime.Now,
                    Hinhthucdaotao = 1,
                    tenHinhThuc = "HinhThuc1",
                    Trinhdo = 1,
                    tenTrinhDo = "TrinhDo1",
                    Ma = "NV001"
                }
            };

            _mockService.Setup(service => service.GetTrinhDoVanHoaByMaNV(It.IsAny<string>())).ReturnsAsync(response);

            // Act
            var result = await _controller.GetTrinhDoVanHoaByMaNV("NV001") as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(response, result.Value);
        }

        [Test]
        public async Task GetTrinhDoVanHoaByMaNV_ReturnsBadRequest_WithArgumentException()
        {
            // Arrange
            _mockService.Setup(service => service.GetTrinhDoVanHoaByMaNV(It.IsAny<string>())).ThrowsAsync(new ArgumentException("Invalid argument"));

            // Act
            var result = await _controller.GetTrinhDoVanHoaByMaNV("NV001") as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual("Invalid argument", ((dynamic)result.Value).message);
        }

        [Test]
        public async Task GetTrinhDoVanHoaByMaNV_ReturnsNotFound_WithKeyNotFoundException()
        {
            // Arrange
            _mockService.Setup(service => service.GetTrinhDoVanHoaByMaNV(It.IsAny<string>())).ThrowsAsync(new KeyNotFoundException("Not found"));

            // Act
            var result = await _controller.GetTrinhDoVanHoaByMaNV("NV001") as NotFoundObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(404, result.StatusCode);
            Assert.AreEqual("Not found", ((dynamic)result.Value).message);
        }

        [Test]
        public async Task GetTrinhDoVanHoaById_ReturnsOkResult_WithValidData()
        {
            // Arrange
            var response = new TrinhDoVanHoaDto
            {
                Id = 1,
                Tentruong = "Truong1",
                Chuyennganh = 1,
                tenChuyenNganh = "ChuyenNganh1",
                Tuthoigian = DateTime.Now.AddYears(-2),
                Denthoigian = DateTime.Now,
                Hinhthucdaotao = 1,
                tenHinhThuc = "HinhThuc1",
                Trinhdo = 1,
                tenTrinhDo = "TrinhDo1",
                Ma = "NV001"
            };

            _mockService.Setup(service => service.GetTrinhDoVanHoaById(It.IsAny<int>())).ReturnsAsync(response);

            // Act
            var result = await _controller.GetTrinhDoVanHoaById(1) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(response, result.Value);
        }

        [Test]
        public async Task GetTrinhDoVanHoaById_ReturnsStatusCode501_WithException()
        {
            // Arrange
            _mockService.Setup(service => service.GetTrinhDoVanHoaById(It.IsAny<int>())).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.GetTrinhDoVanHoaById(1) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task AddTrinhDoVanHoa_ReturnsStatusCode200_WithValidRequest()
        {
            // Arrange
            var request = new InsertTrinhDoVanHoaRequest
            {
                Ma = "NV001",
                Tentruong = "Truong1",
                Chuyennganh = 1,
                Tuthoigian = DateTime.Now.AddYears(-2),
                Denthoigian = DateTime.Now,
                Hinhthucdaotao = 1,
                Trinhdo = 1
            };

            _mockService.Setup(service => service.AddTrinhDoVanHoa(It.IsAny<InsertTrinhDoVanHoaRequest>())).ReturnsAsync(new TblTrinhDoVanHoa());

            // Act
            var result = await _controller.AddTrinhDoVanHoa(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task AddTrinhDoVanHoa_ReturnsStatusCode501_WithKeyNotFoundException()
        {
            // Arrange
            var request = new InsertTrinhDoVanHoaRequest
            {
                Ma = "NV001",
                Tentruong = "Truong1",
                Chuyennganh = 1,
                Tuthoigian = DateTime.Now.AddYears(-2),
                Denthoigian = DateTime.Now,
                Hinhthucdaotao = 1,
                Trinhdo = 1
            };

            _mockService.Setup(service => service.AddTrinhDoVanHoa(It.IsAny<InsertTrinhDoVanHoaRequest>())).ThrowsAsync(new KeyNotFoundException("Not found"));

            // Act
            var result = await _controller.AddTrinhDoVanHoa(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task AddTrinhDoVanHoa_ReturnsStatusCode502_WithException()
        {
            // Arrange
            var request = new InsertTrinhDoVanHoaRequest
            {
                Ma = "NV001",
                Tentruong = "Truong1",
                Chuyennganh = 1,
                Tuthoigian = DateTime.Now.AddYears(-2),
                Denthoigian = DateTime.Now,
                Hinhthucdaotao = 1,
                Trinhdo = 1
            };

            _mockService.Setup(service => service.AddTrinhDoVanHoa(It.IsAny<InsertTrinhDoVanHoaRequest>())).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.AddTrinhDoVanHoa(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(502, result.StatusCode);
        }

        [Test]
        public async Task DeleteTrinhDoVanHoa_ReturnsStatusCode200_WithValidId()
        {
            // Arrange
            _mockService.Setup(service => service.DeleteTrinhDoVanHoa(It.IsAny<int>())).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteTrinhDoVanHoa(1) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task DeleteTrinhDoVanHoa_ReturnsStatusCode501_WithKeyNotFoundException()
        {
            // Arrange
            _mockService.Setup(service => service.DeleteTrinhDoVanHoa(It.IsAny<int>())).ThrowsAsync(new KeyNotFoundException("Not found"));

            // Act
            var result = await _controller.DeleteTrinhDoVanHoa(1) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task DeleteTrinhDoVanHoa_ReturnsStatusCode500_WithException()
        {
            // Arrange
            _mockService.Setup(service => service.DeleteTrinhDoVanHoa(It.IsAny<int>())).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.DeleteTrinhDoVanHoa(1) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
        }

        [Test]
        public async Task UpdateTrinhDoVanHoa_ReturnsStatusCode200_WithValidRequest()
        {
            // Arrange
            var request = new UpdateTrinhDoVanHoaRequest
            {
                Id = 1,
                Tentruong = "Truong1",
                Chuyennganh = 1,
                Tuthoigian = DateTime.Now.AddYears(-2),
                Denthoigian = DateTime.Now,
                Hinhthucdaotao = 1,
                Trinhdo = 1
            };

            _mockService.Setup(service => service.UpdateTrinhDoVanHoa(It.IsAny<UpdateTrinhDoVanHoaRequest>())).ReturnsAsync(new TblTrinhDoVanHoa());

            // Act
            var result = await _controller.UpdateTrinhDoVanHoa(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task UpdateTrinhDoVanHoa_ReturnsStatusCode500_WithException()
        {
            // Arrange
            var request = new UpdateTrinhDoVanHoaRequest
            {
                Id = 1,
                Tentruong = "Truong1",
                Chuyennganh = 1,
                Tuthoigian = DateTime.Now.AddYears(-2),
                Denthoigian = DateTime.Now,
                Hinhthucdaotao = 1,
                Trinhdo = 1
            };

            _mockService.Setup(service => service.UpdateTrinhDoVanHoa(It.IsAny<UpdateTrinhDoVanHoaRequest>())).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.UpdateTrinhDoVanHoa(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
        }
    }
}

using Moq;
using NUnit.Framework;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagementTesting
{
    [TestFixture]
    public class DieuChuyenControllerTests
    {
        private Mock<IDieuChuyenService> _mockService;
        private DieuChuyenController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockService = new Mock<IDieuChuyenService>();
            _controller = new DieuChuyenController(_mockService.Object, null);
        }

        [Test]
        public async Task GetCongViecHienTai_ReturnsOkResult_WithValidData()
        {
            // Arrange
            var maNV = "NV001";
            var congViecDto = new CongViecHienTaiDto
            {
                Ma = maNV,
                Chucvuhientai = "ChucVu",
                Ngaychinhthuc = DateTime.Now,
                Phong = "Phong",
                To = "To"
            };

            _mockService.Setup(service => service.GetCongViecHienTai(maNV)).ReturnsAsync(congViecDto);

            // Act
            var result = await _controller.GetCongViecHienTai(maNV) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(congViecDto, result.Value);
        }

        [Test]
        public async Task GetCongViecHienTai_ReturnsStatusCode501_WithException()
        {
            // Arrange
            var maNV = "NV001";
            _mockService.Setup(service => service.GetCongViecHienTai(maNV)).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.GetCongViecHienTai(maNV) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task LuuDieuChuyen_ReturnsOkResult_WithSuccess()
        {
            // Arrange
            var request = new InsertDieuChuyenRequest
            {
                Ma = "NV001",
                Phong = 1,
                To = 1,
                Chucvu = 1,
                NgayHieuLuc = DateTime.Now.AddDays(1),
                ChiTiet = "Details"
            };

            _mockService.Setup(service => service.AddDieuChuyen(request)).ReturnsAsync(new TblDieuChuyen());

            // Act
            var result = await _controller.LuuDieuChuyen(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task LuuDieuChuyen_ReturnsStatusCode501_WithException()
        {
            // Arrange
            var request = new InsertDieuChuyenRequest
            {
                Ma = "NV001",
                Phong = 1,
                To = 1,
                Chucvu = 1,
                NgayHieuLuc = DateTime.Now.AddDays(1),
                ChiTiet = "Details"
            };

            _mockService.Setup(service => service.AddDieuChuyen(request)).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.LuuDieuChuyen(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task DieuChuyen_ReturnsOkResult_WithSuccess()
        {
            // Arrange
            var maNV = "NV001";
            var id = 1;

            _mockService.Setup(service => service.DieuChuyenNhanVien(maNV, id)).ReturnsAsync(new TblNhanVien());

            // Act
            var result = await _controller.DieuChuyen(maNV, id) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task DieuChuyen_ReturnsStatusCode501_WithException()
        {
            // Arrange
            var maNV = "NV001";
            var id = 1;

            _mockService.Setup(service => service.DieuChuyenNhanVien(maNV, id)).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.DieuChuyen(maNV, id) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task HuyDieuChuyen_ReturnsOkResult_WithSuccess()
        {
            // Arrange
            var idDieuChuyen = 1;

            _mockService.Setup(service => service.HuyDieuChuyen(idDieuChuyen)).ReturnsAsync(new TblLichSuDieuChuyen());

            // Act
            var result = await _controller.HuyDieuChuyen(idDieuChuyen) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task HuyDieuChuyen_ReturnsStatusCode501_WithException()
        {
            // Arrange
            var idDieuChuyen = 1;

            _mockService.Setup(service => service.HuyDieuChuyen(idDieuChuyen)).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.HuyDieuChuyen(idDieuChuyen) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task GetLichSuDieuChuyen_ReturnsOkResult_WithValidData()
        {
            // Arrange
            var maNV = "NV001";
            var lichSuDto = new List<DieuChuyenResponseDto>
            {
                new DieuChuyenResponseDto
                {
                    Id = 1,
                    IdDieuChuyen = 1,
                    Ma = maNV,
                    NgayDieuChuyen = "01/01/2024",
                    tuPhong = "Phong1",
                    denPhong = "Phong2",
                    tuTo = "To1",
                    denTo = "To2",
                    tuChucVu = "ChucVu1",
                    denChucVu = "ChucVu2",
                    ChiTiet = "Details",
                    trangThai = 0
                }
            };

            _mockService.Setup(service => service.getLichSuDieuChuyen(maNV)).ReturnsAsync(lichSuDto);

            // Act
            var result = await _controller.GetLichSuDieuChuyen(maNV) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(lichSuDto, result.Value);
        }

        [Test]
        public async Task GetLichSuDieuChuyen_ReturnsStatusCode501_WithException()
        {
            // Arrange
            var maNV = "NV001";
            _mockService.Setup(service => service.getLichSuDieuChuyen(maNV)).ThrowsAsync(new Exception("Error"));

            // Act
            var result = await _controller.GetLichSuDieuChuyen(maNV) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(501, result.StatusCode);
        }

        [Test]
        public async Task GetAll_ReturnsOkResult_WithValidData()
        {
            // Arrange
            var response = new List<LichSuDieuChuyenResponse>
    {
        new LichSuDieuChuyenResponse
        {
            Id = 1,
            IdDieuChuyen = 1,
            Ma = "NV001",
            NgayDieuChuyen = DateTime.Now,
            IdPhongCu = 1,
            TenPhongCu = "Phong1",
            IdPhongMoi = 2,
            TenPhongMoi = "Phong2",
            IdToCu = 1,
            TenToCu = "To1",
            IdToMoi = 2,
            TenToMoi = "To2",
            IdChucVuCu = 1,
            TenChucVuCu = "ChucVu1",
            IdChucVuMoi = 2,
            TenChucVuMoi = "ChucVu2",
            GhiChu = "Details",
            TrangThai = 0
        }
    };

            _mockService.Setup(service => service.GetAllAsync(It.IsAny<short?>(), It.IsAny<DateTime?>())).ReturnsAsync(response);

            // Act
            var actionResult = await _controller.GetAll(null, null) as ActionResult<IEnumerable<LichSuDieuChuyenResponse>>;

            // Assert
            Assert.IsNotNull(actionResult);
            var okResult = actionResult.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(response, okResult.Value);
        }

        [Test]
        public async Task GetAll_ReturnsStatusCode501_WithException()
        {
            // Arrange
            _mockService.Setup(service => service.GetAllAsync(It.IsAny<short?>(), It.IsAny<DateTime?>())).ThrowsAsync(new Exception("Error"));

            // Act
            var actionResult = await _controller.GetAll(null, null) as ActionResult<IEnumerable<LichSuDieuChuyenResponse>>;

            // Assert
            Assert.IsNotNull(actionResult);
            var statusCodeResult = actionResult.Result as StatusCodeResult;
            Assert.IsNotNull(statusCodeResult);
            Assert.AreEqual(501, statusCodeResult.StatusCode);
        }
    }
}

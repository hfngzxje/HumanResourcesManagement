using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Response;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class BaoCaoControllerTests
    {
        private Mock<IBaoCaoService> _baoCaoServiceMock;
        private BaoCaoController _controller;

        [SetUp]
        public void Setup()
        {
            _baoCaoServiceMock = new Mock<IBaoCaoService>();
            _controller = new BaoCaoController(_baoCaoServiceMock.Object);
        }

        // Test GetReportDanhSachNhanVien
        [Test]
        public async Task GetReportDanhSachNhanVien_ReturnsOkResult_WithListOfNhanVien()
        {
            // Arrange
            var request = new DanhSachNhanVienRequest();
            var mockList = new List<DanhSachNhanVienResponse>(); // Replace with actual list type
            _baoCaoServiceMock.Setup(s => s.getDanhSachNhanVien(request)).ReturnsAsync(mockList);

            // Act
            var result = await _controller.GetReportDanhSachNhanVien(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        // Test ExportBaoCaoNhanVienToExcel
        [Test]
        public async Task ExportBaoCaoNhanVienToExcel_ReturnsFileResult_WithExcelFile()
        {
            // Arrange
            var request = new DanhSachNhanVienRequest();
            var fileContent = new byte[] { 1, 2, 3 }; // Replace with actual byte array
            var fileName = "test.xlsx";
            _baoCaoServiceMock.Setup(s => s.ExportBaoCaoNhanVienToExcel(request)).ReturnsAsync((fileContent, fileName));

            // Act
            var result = await _controller.ExportBaoCaoNhanVien(request) as FileContentResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", result.ContentType);
            Assert.AreEqual(fileName, result.FileDownloadName);
        }

        // Test ExportBaoCaoNhanVienToPDF
        [Test]
        public async Task ExportBaoCaoNhanVienPDF_ReturnsFileResult_WithPdfFile()
        {
            // Arrange
            var request = new DanhSachNhanVienRequest();
            var fileContent = new byte[] { 1, 2, 3 }; // Replace with actual byte array
            var fileName = "test.pdf";
            _baoCaoServiceMock.Setup(s => s.ExportNhanVienToPdf(request)).ReturnsAsync((fileContent, fileName));

            // Act
            var result = await _controller.ExportBaoCaoNhanVienPDF(request) as FileContentResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("application/pdf", result.ContentType);
            Assert.AreEqual(fileName, result.FileDownloadName);
        }

        // Test GetReportDanhSachDangVien
        [Test]
        public async Task GetReportDanhSachDangVien_ReturnsOkResult_WithListOfDangVien()
        {
            // Arrange
            var request = new DanhSachDangVienRequest();
            var mockList = new List<DanhSachDangVienResponse>(); // Replace with actual list type
            _baoCaoServiceMock.Setup(s => s.getDanhSachDangVien(request)).ReturnsAsync(mockList);

            // Act
            var result = await _controller.GetReportDanhSachDangVien(request) as StatusCodeResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }
    }
}

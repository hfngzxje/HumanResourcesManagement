using NUnit.Framework;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using Microsoft.AspNetCore.Http;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class KhenThuongKiLuatControllerTests
    {
        private Mock<IKhenThuongKiLuatService> _khenThuongKiLuatServiceMock;
        private KhenThuongKiLuatController _controller;
        private List<TblKhenThuongKyLuat> _khenThuongKyLuatList;

        [SetUp]
        public void Setup()
        {
            _khenThuongKiLuatServiceMock = new Mock<IKhenThuongKiLuatService>();
            _controller = new KhenThuongKiLuatController(_khenThuongKiLuatServiceMock.Object, new Mock<NhanSuContext>().Object);

            // Sample data
            _khenThuongKyLuatList = new List<TblKhenThuongKyLuat>
            {
                new TblKhenThuongKyLuat { Id = 1, Ma = "NV001", Ngay = DateTime.Now, Noidung = "Khen thưởng xuất sắc", Lido = "Đạt chỉ tiêu", Khenthuongkiluat = 1, Ten = 1 },
                new TblKhenThuongKyLuat { Id = 2, Ma = "NV002", Ngay = DateTime.Now, Noidung = "Kỷ luật nhắc nhở", Lido = "Vắng mặt không lý do", Khenthuongkiluat = 0, Ten = 2 }
            };
        }

        [Test]
        public async Task GetKhenThuongKiLuatByMaNV_ReturnsOkResult_WithListOfKhenThuongKyLuat()
        {
            // Arrange
            var maNV = "NV001";
            var khenThuongOrKiLuat = "KhenThuong";
            var expectedList = _khenThuongKyLuatList.Where(x => x.Ma == maNV && x.Khenthuongkiluat == 1).Select(x => new KhenThuongKyLuatResponse
            {
                Id = x.Id,
                Ten = x.TenNavigation.Ten,
                Ngay = x.Ngay ?? DateTime.MinValue,
                Noidung = x.Noidung,
                Lido = x.Lido,
                Ma = x.Ma.Trim()
            }).ToList();

            _khenThuongKiLuatServiceMock.Setup(s => s.GetKhenThuongKyLuatByMaNV(maNV, khenThuongOrKiLuat))
                .ReturnsAsync(expectedList);

            // Act
            var result = await _controller.GetKhenThuongKiLuatByMaNV(maNV, khenThuongOrKiLuat);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(expectedList, okResult.Value);
        }

        [Test]
        public async Task GetAllKhenThuongKyLuat_ReturnsOkResult_WithListOfKhenThuongKyLuat()
        {
            // Arrange
            var expectedList = _khenThuongKyLuatList.Select(x => new KhenThuongKyLuatResponse
            {
                Id = x.Id,
                Ten = x.TenNavigation.Ten,
                Ngay = x.Ngay ?? DateTime.MinValue,
                Noidung = x.Noidung,
                Lido = x.Lido,
                Ma = x.Ma?.Trim()
            }).ToList();

            _khenThuongKiLuatServiceMock.Setup(s => s.GetAllKhenThuongKyLuat())
                .ReturnsAsync(expectedList);

            // Act
            var result = await _controller.GetAllKhenThuongKyLuat();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(expectedList, okResult.Value);
        }

        [Test]
        public async Task AddKhenThuongKiLuat_ReturnsStatusCode200_WhenAdditionIsSuccessful()
        {
            // Arrange
            var req = new KhenThuongKyLuatRequest { Ma = "NV003", Ngay = DateTime.Now, Noidung = "Khen thưởng năm", Lido = "Hoàn thành xuất sắc", Khenthuongkiluat = 1, Ten = 3 };

            // Act
            var result = await _controller.AddKhenThuongKiLuat(req);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(StatusCodes.Status200OK, statusCodeResult.StatusCode);
        }

        [Test]
        public async Task DeleteKhenThuongKiLuat_ReturnsStatusCode200_WhenDeletionIsSuccessful()
        {
            // Arrange
            var id = 1;

            // Act
            var result = await _controller.DeleteKhenThuongKiLuat(id);

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = result as StatusCodeResult;
            Assert.AreEqual(StatusCodes.Status200OK, statusCodeResult.StatusCode);
        }

        [Test]
        public async Task GetKhenThuongAsync_ReturnsOkResult_WithListOfKhenThuong()
        {
            // Arrange
            var fromDate = DateTime.Now.AddMonths(-1);
            var expectedList = _khenThuongKyLuatList.Where(x => x.Khenthuongkiluat == 1)
                .Select(x => new KhenThuongKyLuatListResponse
                {
                    Id = x.Id,
                    Ma = x.Ma,
                    TenNV = "Tên NV", // Mock the actual name based on your data setup
                    Ngay = x.Ngay,
                    Noidung = x.Noidung,
                    Lido = x.Lido,
                    TenId = x.Ten,
                    Ten = x.TenNavigation.Ten
                }).ToList();

            _khenThuongKiLuatServiceMock.Setup(s => s.GetKhenThuongAsync(fromDate))
                .ReturnsAsync(expectedList);

            // Act
            var result = await _controller.GetKhenThuongAsync(fromDate);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(expectedList, okResult.Value);
        }

        [Test]
        public async Task GetKyLuatAsync_ReturnsOkResult_WithListOfKyLuat()
        {
            // Arrange
            var fromDate = DateTime.Now.AddMonths(-1);
            var expectedList = _khenThuongKyLuatList.Where(x => x.Khenthuongkiluat == 0)
                .Select(x => new KhenThuongKyLuatListResponse
                {
                    Id = x.Id,
                    Ma = x.Ma,
                    TenNV = "dungnt", 
                    Ngay = x.Ngay,
                    Noidung = x.Noidung,
                    Lido = x.Lido,
                    TenId = x.Ten,
                    Ten = x.TenNavigation.Ten
                }).ToList();

            _khenThuongKiLuatServiceMock.Setup(s => s.GetKyLuatAsync(fromDate))
                .ReturnsAsync(expectedList);

            // Act
            var result = await _controller.GetKyLuatAsync(fromDate);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(expectedList, okResult.Value);
        }
    }
}

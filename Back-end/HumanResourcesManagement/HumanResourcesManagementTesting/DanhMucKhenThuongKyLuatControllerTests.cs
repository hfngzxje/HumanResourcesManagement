using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Config.Mapper;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucKhenThuongKyLuatControllerTests
    {
        private NhanSuContext _context;
        private IDanhMucKhenThuongKyLuatService _danhMucMucKhenThuongKyLuatService;
        private DanhMucKhenThuongKyLuatController _danhMucKhenThuongKyLuatController;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<NhanSuContext>()
                .UseInMemoryDatabase(databaseName: "NhanSu")
                .Options;

            _context = new NhanSuContext(options);

            _context.TblDanhMucKhenThuongKyLuats.AddRange(
                new TblDanhMucKhenThuongKyLuat { Id = 1, Ma = "KT1", Ten = "Nhân viên xuất sắc" },
                new TblDanhMucKhenThuongKyLuat { Id = 2, Ma = "KT1", Ten = "Đi làm muộn" }
            );
            _context.SaveChanges();

            var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile<NhanVienMapper>());
            var mapper = mapperConfig.CreateMapper();
            _danhMucMucKhenThuongKyLuatService = new DanhMucKhenThuongKyLuatService(mapper, _context);
            _danhMucKhenThuongKyLuatController = new DanhMucKhenThuongKyLuatController(_danhMucMucKhenThuongKyLuatService, _context);
        }

        [Test]
        public async Task GetDanhMucKhenThuongKyLuat_ShouldReturnAllKhenThuongKyLuats()
        {
            var result = await _danhMucKhenThuongKyLuatController.GetDanhMucKhenThuongKyLuat();

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var khenThuongKyLuats = okResult?.Value as IEnumerable<DanhMucKhenThuongKyLuatResponse>;
            Assert.AreEqual(2, khenThuongKyLuats?.Count());
        }

        [Test]
        public async Task GetDanhMucKhenThuongKyLuatById_ShouldReturnCorrectKhenThuongKyLuat()
        {
            var result = await _danhMucKhenThuongKyLuatController.GetDanhMucKhenThuongKyLuatById(1);
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var khenThuongKyLuat = okResult?.Value as DanhMucKhenThuongKyLuatResponse;
            Assert.AreEqual("KT1", khenThuongKyLuat?.Ma);
            Assert.AreEqual("Nhân viên xuất sắc", khenThuongKyLuat?.Ten);
        }

        [Test]
        public async Task AddDanhMucKhenThuongKyLuat_ShouldAddNewKhenThuongKyLuat()
        {
            var newKhenThuongKyLuat = new DanhMucKhenThuongKyLuatRequest { Ten = "Nhân viên giỏi" };

            var result = await _danhMucKhenThuongKyLuatController.AddDanhMucKhenThuongKyLuat(newKhenThuongKyLuat);

            Assert.IsInstanceOf<ObjectResult>(result);
            var okResult = result as ObjectResult;
            Assert.AreEqual(200, okResult?.StatusCode);

            var khenThuongKyLuats = await _context.TblDanhMucKhenThuongKyLuats.ToListAsync();
            Assert.AreEqual(3, khenThuongKyLuats.Count);
            Assert.IsTrue(khenThuongKyLuats.Any(ng => ng.Ten == "Nhân viên giỏi"));
        }

        [Test]
        public async Task DeleteDanhMucKhenThuongKyLuat_ShouldRemoveKhenThuongKyLuat()
        {
            var result = await _danhMucKhenThuongKyLuatController.DeleteDanhMucKhenThuongKyLuat(1);

            Assert.IsInstanceOf<ObjectResult>(result);
            var okResult = result as ObjectResult;
            Assert.AreEqual(200, okResult?.StatusCode);

            var khenThuongKyLuats = await _context.TblDanhMucKhenThuongKyLuats.ToListAsync();
            Assert.AreEqual(1, khenThuongKyLuats.Count);
            Assert.IsFalse(khenThuongKyLuats.Any(ng => ng.Id == 1));
        }

        [Test]
        public async Task UpdateDanhMucKhenThuongKyLuat_ShouldUpdateExistingKhenThuongKyLuat()
        {
            var updateRequest = new DanhMucKhenThuongKyLuatRequest { Ten = "Nhân viên giỏi" };

            var result = await _danhMucKhenThuongKyLuatController.UpdateDanhMucKhenThuongKyLuat(updateRequest, 2);

            Assert.IsInstanceOf<ObjectResult>(result);
            var okResult = result as ObjectResult;
            Assert.AreEqual(200, okResult?.StatusCode);

            var updatedKhenThuongKyLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(2);
            Assert.AreEqual("Nhân viên giỏi", updatedKhenThuongKyLuat.Ten);
        }
    }
}

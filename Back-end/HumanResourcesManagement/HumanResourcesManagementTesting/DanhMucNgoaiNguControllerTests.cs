using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using HumanResourcesManagement.Models;
using AutoMapper;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Config.Mapper;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class DanhMucNgoaiNguControllerTests
    {
        private NhanSuContext _context;
        private IDanhMucNgoaiNguService _danhMucNgoaiNguService;
        private DanhMucNgoaiNguController _danhMucNgoaiNguController;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<NhanSuContext>()
                .UseInMemoryDatabase(databaseName: "NhanSu")
                .Options;

            _context = new NhanSuContext(options);

            _context.TblDanhMucNgoaiNgus.AddRange(
                new TblDanhMucNgoaiNgu { Id = 1, Ma = "TA1", Ten = "Tiếng Anh" },
                new TblDanhMucNgoaiNgu { Id = 2, Ma = "TP1", Ten = "Tiếng Pháp" }
            );
            _context.SaveChanges();

            var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile<NhanVienMapper>());
            var mapper = mapperConfig.CreateMapper();
            _danhMucNgoaiNguService = new DanhMucNgoaiNguService(mapper, _context);
            _danhMucNgoaiNguController = new DanhMucNgoaiNguController(_danhMucNgoaiNguService, _context);
        }

        [Test]
        public async Task GetDanhMucNgoaiNgu_ShouldReturnAllNgoaiNgus()
        {
            var result = await _danhMucNgoaiNguController.GetDanhMucNgoaiNgu();

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var ngoaiNgus = okResult?.Value as IEnumerable<DanhMucNgoaiNguResponse>;
            Assert.AreEqual(2, ngoaiNgus?.Count());
        }

        [Test]
        public async Task GetDanhMucNgoaiNguById_ShouldReturnCorrectNgoaiNgu()
        {
            var result = await _danhMucNgoaiNguController.GetDanhMucNgoaiNguById(1);
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var ngoaiNgu = okResult?.Value as DanhMucNgoaiNguResponse;
            Assert.AreEqual("TA1", ngoaiNgu?.Ma);
            Assert.AreEqual("Tiếng Anh", ngoaiNgu?.Ten);
        }

        [Test]
        public async Task AddDanhMucNgoaiNgu_ShouldAddNewNgoaiNgu()
        {
            var newNgoaiNgu = new DanhMucNgoaiNguRequest { Ten = "Tiếng Nhật" };

            var result = await _danhMucNgoaiNguController.AddDanhMucNgoaiNgu(newNgoaiNgu);

            Assert.IsInstanceOf<ObjectResult>(result);
            var okResult = result as ObjectResult;
            Assert.AreEqual(200, okResult?.StatusCode);

            var ngoaiNgus = await _context.TblDanhMucNgoaiNgus.ToListAsync();
            Assert.AreEqual(3, ngoaiNgus.Count);
            Assert.IsTrue(ngoaiNgus.Any(ng => ng.Ten == "Tiếng Nhật"));
        }

        [Test]
        public async Task DeleteDanhMucNgoaiNgu_ShouldRemoveNgoaiNgu()
        {
            var result = await _danhMucNgoaiNguController.DeleteDanhMucNgoaiNgu(1);

            Assert.IsInstanceOf<ObjectResult>(result);
            var okResult = result as ObjectResult;
            Assert.AreEqual(200, okResult?.StatusCode);

            var ngoaiNgus = await _context.TblDanhMucNgoaiNgus.ToListAsync();
            Assert.AreEqual(1, ngoaiNgus.Count);
            Assert.IsFalse(ngoaiNgus.Any(ng => ng.Id == 1));
        }

        [Test]
        public async Task UpdateDanhMucNgoaiNgu_ShouldUpdateExistingNgoaiNgu()
        {
            var updateRequest = new DanhMucNgoaiNguRequest { Ten = "Tiếng Nhật" };

            var result = await _danhMucNgoaiNguController.UpdateDanhMucNgoaiNgu(updateRequest, 2);

            Assert.IsInstanceOf<ObjectResult>(result);
            var okResult = result as ObjectResult;
            Assert.AreEqual(200, okResult?.StatusCode);

            var updatedNgoaiNgu = await _context.TblDanhMucNgoaiNgus.FindAsync(2);
            Assert.AreEqual("Tiếng Nhật", updatedNgoaiNgu?.Ten);
        }
    }

}

using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Moq;

[TestFixture]
public class DanhMucTrinhDoControllerTests
{
    private Mock<NhanSuContext> _contextMock;
    private Mock<ITrinhDoService> _trinhDoServiceMock;
    private TrinhDoController _controller;
    private List<TblDanhMucTrinhDo> _trinhDos;

    [SetUp]
    public void Setup()
    {
        _contextMock = new Mock<NhanSuContext>();
        _trinhDoServiceMock = new Mock<ITrinhDoService>();
        _controller = new TrinhDoController(_trinhDoServiceMock.Object, _contextMock.Object);

        // Khai báo danh sách trình độ
        _trinhDos = new List<TblDanhMucTrinhDo>
        {
            new TblDanhMucTrinhDo { Id = 1, Ten = "Cử nhân" },
            new TblDanhMucTrinhDo { Id = 2, Ten = "Thạc sĩ" },
            new TblDanhMucTrinhDo { Id = 3, Ten = "Tiến sĩ" }
        };

        // Setup mock service trả về danh sách
        _trinhDoServiceMock.Setup(s => s.GetTrinhDo()).ReturnsAsync(_trinhDos.Select(td => new TrinhDoResponse
        {
            Id = td.Id,
            Ten = td.Ten,
            Ma = td.Ma
        }));
    }

    [Test]
    public async Task GetTrinhDo_ReturnsOkResult_WithListOfTrinhDo()
    {
        // Act
        var result = await _controller.GetTrinhDo();

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        var resultList = okResult.Value as IEnumerable<TrinhDoResponse>;
        Assert.IsNotNull(resultList);
        Assert.AreEqual(_trinhDos.Count, resultList.Count());

        // In danh sách trình độ
        Console.WriteLine("Danh sách trình độ:");
        foreach (var td in resultList)
        {
            Console.WriteLine($"Id: {td.Id}, Tên: {td.Ten}");
        }
    }

    [Test]
    public async Task GetTrinhDoById_ReturnsOkResult_WithTrinhDo()
    {
        int id = 1;
        // Arrange
        var trinhDo = _trinhDos.FirstOrDefault(t => t.Id == id);
        _trinhDoServiceMock.Setup(s => s.GetTrinhDoById(id)).ReturnsAsync(new TrinhDoResponse
        {
            Id = trinhDo.Id,
            Ten = trinhDo.Ten,
            Ma = trinhDo.Ma
        });

        // Act
        var result = await _controller.GetTrinhDoById(id);

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        var resultTrinhDo = okResult.Value as TrinhDoResponse;
        Assert.IsNotNull(resultTrinhDo);
        Assert.AreEqual(trinhDo.Id, resultTrinhDo.Id);
        Assert.AreEqual(trinhDo.Ten, resultTrinhDo.Ten);

        // In thông tin trình độ với Id tương ứng
        Console.WriteLine($"Trình độ Id: {resultTrinhDo.Id}, Tên: {resultTrinhDo.Ten}");
    }

    [Test]
    public async Task AddTrinhDo_ReturnsStatusCode200_WhenAdditionIsSuccessful()
    {
        // Arrange
        var req = new TrinhDoRequest { Ten = "Giáo Sư" };

        // Act
        var result = await _controller.AddTrinhDo(req);

        // Assert
        Assert.IsInstanceOf<StatusCodeResult>(result);
        var statusCodeResult = result as StatusCodeResult;
        Assert.AreEqual(200, statusCodeResult.StatusCode);

        // In danh sách trình độ sau khi thêm mới
        Console.WriteLine("Danh sách trình độ sau khi thêm mới:");
        foreach (var td in _trinhDos)
        {
            Console.WriteLine($"Id: {td.Id}, Tên: {td.Ten}");
        }
    }

    [Test]
    public async Task DeleteTrinhDo_ReturnsStatusCode200_WhenDeletionIsSuccessful()
    {
        // Arrange
        int id = 2;

        // Act
        var result = await _controller.DeleteTrinhDo(id);

        // Assert
        Assert.IsInstanceOf<StatusCodeResult>(result);
        var statusCodeResult = result as StatusCodeResult;
        Assert.AreEqual(200, statusCodeResult.StatusCode);

        // Xóa trình độ có Id = 2 khỏi danh sách
        var deletedTrinhDo = _trinhDos.FirstOrDefault(t => t.Id == id);
        _trinhDos.Remove(deletedTrinhDo);

        // In danh sách trình độ sau khi xóa
        Console.WriteLine("Danh sách trình độ sau khi xóa:");
        foreach (var td in _trinhDos)
        {
            Console.WriteLine($"Id: {td.Id}, Tên: {td.Ten}");
        }
    }

    [Test]
    public async Task UpdateTrinhDo_ReturnsStatusCode200_WhenUpdateIsSuccessful()
    {
        int id = 1;
        // Arrange
        var req = new TrinhDoRequest { Ten = "Giáo Sư" };

        // Act
        var result = await _controller.UpdateTrinhDo(req, id);

        // Assert
        Assert.IsInstanceOf<StatusCodeResult>(result);
        var statusCodeResult = result as StatusCodeResult;
        Assert.AreEqual(200, statusCodeResult.StatusCode);

        // Cập nhật trình độ trong danh sách
        var updatedTrinhDo = _trinhDos.FirstOrDefault(t => t.Id == id);
        if (updatedTrinhDo != null)
        {
            updatedTrinhDo.Ten = req.Ten;
        }

        // In danh sách trình độ sau khi cập nhật
        Console.WriteLine("Danh sách trình độ sau khi cập nhật:");
        foreach (var td in _trinhDos)
        {
            Console.WriteLine($"Id: {td.Id}, Tên: {td.Ten}");
        }
    }
}

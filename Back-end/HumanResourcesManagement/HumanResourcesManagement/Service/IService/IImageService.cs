using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IImageService
    {
        Task<string> UploadImage(UploadImageRequest req);
        Task<string> GetImageByMaNV(string maNV);
    }
}

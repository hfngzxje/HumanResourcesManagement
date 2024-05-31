using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class ImageService : IImageService
    {
        private readonly NhanSuContext _context;
        public ImageService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<string> UploadImage(UploadImageRequest req)
        {
            if (req.file == null || req.file.Length == 0)
            {
                throw new Exception("please select a valid image");
            }
            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
            var extension = Path.GetExtension(req.file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(extension))
            {
                throw new Exception("Invalid file type. Only .png, .jpg, and .jpeg files are allowed.");
            }
            var allowedMimeTypes = new[] { "image/png", "image/jpeg" };
            if (!allowedMimeTypes.Contains(req.file.ContentType.ToLowerInvariant()))
            {
                throw new Exception("Invalid file type. Only .png, .jpg, and .jpeg files are allowed.");
            }

            try
            {
                using (var ms = new MemoryStream())
                {
                    await req.file.CopyToAsync(ms);
                    var base64String = Convert.ToBase64String(ms.ToArray());
                    var nv = await _context.TblNhanViens.FirstOrDefaultAsync(x => x.Ma == req.maNV);
                    nv.Anh = base64String;
                    _context.TblNhanViens.Update(nv);
                    _context.Entry(nv).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return nv.Anh;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetImageByMaNV(string MaNV)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(n => n.Ma == MaNV);
            return nv.Anh;
        }

    }
}

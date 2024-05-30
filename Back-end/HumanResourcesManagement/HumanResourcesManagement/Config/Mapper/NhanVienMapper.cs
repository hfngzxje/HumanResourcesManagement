using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using System.Net;

namespace HumanResourcesManagement.Config.Mapper
{
    public class NhanVienMapper : Profile
    {
        public NhanVienMapper()
        {

            CreateMap<NhanVienRequest, TblNhanVien>()
                .ForMember(dest => dest.Ma, opt => opt.Ignore());

            CreateMap<TblNhanVien, NhanVienResponse>();
            CreateMap<ChuyenMonRequest, TblDanhMucChuyenMon>();
            CreateMap<TblDanhMucChuyenMon, ChuyenMonResponse>();
            CreateMap<TrinhDoRequest, TblDanhMucTrinhDo>();
            CreateMap<TblDanhMucTrinhDo, TrinhDoResponse>();
        }
    }
}

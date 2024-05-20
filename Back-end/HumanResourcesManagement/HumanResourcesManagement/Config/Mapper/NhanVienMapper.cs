using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using System.Net;

namespace HumanResourcesManagement.Config.Mapper
{
    public class NhanVienMapper : Profile
    {
        public NhanVienMapper()
        {
            CreateMap<NhanVienRequest, TblNhanVien>();

            CreateMap<NhanVienRequest, TblNhanVien>()
                .ForMember(dest => dest.Ma, opt => opt.Ignore());
        }
    }
}

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

            CreateMap<DanhMucNgoaiNguRequest, TblDanhMucNgoaiNgu>();
            CreateMap<TblDanhMucNgoaiNgu, DanhMucNgoaiNguResponse>();

            CreateMap<DanhMucToRequest, TblDanhMucTo>();
            CreateMap<TblDanhMucTo, DanhMucToResponse>();

            CreateMap<DanhMucToRequest, TblDanhMucTo>();
            CreateMap<TblDanhMucTo, DanhMucToResponse>();

            CreateMap<DanhMucKhenThuongKyLuatRequest, TblDanhMucKhenThuongKyLuat>();
            CreateMap<TblDanhMucKhenThuongKyLuat, DanhMucKhenThuongKyLuatResponse>();

            CreateMap<HinhThucDaoTaoRequest, TblHinhThucDaoTao>();
            CreateMap<TblHinhThucDaoTao, HinhThucDaoTaoResponse>();

            CreateMap<KhenThuongKyLuatRequest, TblKhenThuongKyLuat>();
            CreateMap<TblKhenThuongKyLuat, KhenThuongKyLuatResponse>();
        }
    }
}

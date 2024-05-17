using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class UserService : IUserService
    {
        private readonly NhanSuContext _context;

        public UserService(NhanSuContext context)
        {
            _context = context;
        }

        public List<TblUser> GetAllUsers()
        {
            return _context.TblUsers.ToList();
        }


    }
}

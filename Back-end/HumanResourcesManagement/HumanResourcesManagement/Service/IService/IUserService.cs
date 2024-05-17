using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IUserService
    {
        List<TblUser> GetAllUsers();
    }
}

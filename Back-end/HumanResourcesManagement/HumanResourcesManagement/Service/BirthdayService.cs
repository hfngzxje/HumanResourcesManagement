using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service
{
    public class BirthdayService
    {
        private readonly EmailService _emailService;
        private readonly NhanSuContext _context;

        public BirthdayService(EmailService emailService, NhanSuContext context)
        {
            _emailService = emailService;
            _context = context;
        }

        public void CheckAndSendBirthdayEmails()
        {
            var today = DateTime.Today;
            var employeesWithBirthdayToday = _context.TblNhanViens.Where(e => e.Ngaysinh.Value.Month == today.Month && e.Ngaysinh.Value.Day == today.Day).ToList();

            foreach (var employee in employeesWithBirthdayToday)
            {
                _emailService.SendBirthdayEmail(employee.Email, employee.Ten);
                SaveEmailHistory(employee, today);
            }
        }

        private void SaveEmailHistory(TblNhanVien employee, DateTime sentDateTime)
        {
            _context.EmailHistories.Add(new EmailHistory
            {
                Ma = employee.Ma,
                Email = employee.Email,
                SentDateTime = sentDateTime,
                Greeting = string.Format("Chúc mừng sinh nhật {0}!", employee.Ten)
            });
            _context.SaveChanges();
        }

        public IEnumerable<EmailHistory> GetEmailHistories(DateTime? startDate = null, DateTime? endDate = null, string? employeeId = null)
        {
            var query = _context.EmailHistories.AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(eh => eh.SentDateTime >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(eh => eh.SentDateTime <= endDate.Value);
            }

            if (!string.IsNullOrEmpty(employeeId))
            {
                query = query.Where(eh => eh.Ma == employeeId);
            }

            return query.ToList();
        }
    }
}

using HumanResourcesManagement.Service;

namespace HumanResourcesManagement.Config
{
    public class BirthdayCheckHostedService : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly BirthdayService _birthdayService;

        public BirthdayCheckHostedService(BirthdayService birthdayService)
        {
            _birthdayService = birthdayService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(CheckBirthdays, null, GetInitialDelay(), TimeSpan.FromDays(1));
            return Task.CompletedTask;
        }

        private void CheckBirthdays(object state)
        {
            _birthdayService.CheckAndSendBirthdayEmails();
        }

        private TimeSpan GetInitialDelay()
        {
            var now = DateTime.Now;
            var nextRunTime = new DateTime(now.Year, now.Month, now.Day, 8, 0, 0, 0);

            if (now > nextRunTime)
            {
                nextRunTime = nextRunTime.AddDays(1);
            }

            return nextRunTime - now;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}

using HumanResourcesManagement.Service;

namespace HumanResourcesManagement.Config
{
    public class BirthdayEmailBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private Timer _timer;

        public BirthdayEmailBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var currentTime = DateTime.Now;
            var scheduledTime = new DateTime(currentTime.Year, currentTime.Month, currentTime.Day, 8, 0, 0);

            if (currentTime > scheduledTime)
            {
                scheduledTime = scheduledTime.AddDays(1);
            }

            var initialDelay = scheduledTime - currentTime;
            _timer = new Timer(DoWork, null, initialDelay, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var birthdayService = scope.ServiceProvider.GetRequiredService<BirthdayService>();
                birthdayService.CheckAndSendBirthdayEmails();
            }
        }

        public override Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _timer?.Dispose();
            base.Dispose();
        }
    }
}

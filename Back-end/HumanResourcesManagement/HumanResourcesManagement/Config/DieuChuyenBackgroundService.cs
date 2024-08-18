using HumanResourcesManagement.Service;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Config
{
    public class DieuChuyenBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private Timer _timer;

        public DieuChuyenBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var currentTime = DateTime.Now;
            var scheduledTime = new DateTime(currentTime.Year, currentTime.Month, currentTime.Day, 3, 0, 0);
            {
                scheduledTime = scheduledTime.AddDays(1);
            }

            var initialDelay = scheduledTime - currentTime;
            _timer = new Timer(DoWork, null, initialDelay, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dieuChuyenService = scope.ServiceProvider.GetRequiredService<DieuChuyenService>();
                    dieuChuyenService.CheckAndProcessDieuChuyen().Wait(); 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
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

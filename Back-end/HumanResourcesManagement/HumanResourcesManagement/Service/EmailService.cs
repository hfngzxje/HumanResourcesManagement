using HumanResourcesManagement.Config;
using HumanResourcesManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace HumanResourcesManagement.Service
{
    public class EmailService
    {
        private static readonly List<string> BirthdayMessages = new List<string>
        {
            "Chúc mừng sinh nhật {0}! Chúc bạn có một ngày thật vui vẻ và hạnh phúc. Hy vọng rằng mọi điều tốt đẹp nhất sẽ đến với bạn trong năm tới. Hãy tiếp tục tỏa sáng như bạn đã luôn làm và đạt được nhiều thành công hơn nữa trong công việc và cuộc sống.",
            "Sinh nhật vui vẻ nhé {0}! Chúc bạn luôn tràn đầy năng lượng và thành công trong mọi việc. Hy vọng rằng bạn sẽ có nhiều khoảnh khắc đáng nhớ và những trải nghiệm tuyệt vời trong tuổi mới. Cảm ơn bạn đã là một phần quan trọng của đội ngũ chúng ta.",
            "Chúc mừng sinh nhật {0}! Chúc bạn một sinh nhật tuyệt vời và nhiều niềm vui. Mong rằng bạn sẽ luôn giữ được nụ cười trên môi và lòng nhiệt huyết trong công việc. Chúng tôi rất may mắn khi có bạn trong công ty và hy vọng rằng năm tới sẽ mang lại nhiều thành công và hạnh phúc cho bạn.",
            "Chúc mừng sinh nhật {0}! Chúc bạn sức khỏe, hạnh phúc và thành công trong cuộc sống. Hãy dành thời gian để tận hưởng những điều giản dị và đẹp đẽ xung quanh. Chúng tôi trân trọng tất cả những đóng góp của bạn và mong rằng bạn sẽ tiếp tục phát triển và thăng tiến trong sự nghiệp.",
            "Hôm nay là ngày đặc biệt, sinh nhật của {0}! Chúc bạn những điều tuyệt vời nhất. Hy vọng rằng bạn sẽ được bao quanh bởi những người yêu thương và có một ngày thật đáng nhớ. Cảm ơn bạn vì tất cả những nỗ lực và sự cống hiến không ngừng của bạn. Chúc bạn mọi điều tốt đẹp và thành công rực rỡ trong tương lai."
        };

        public void SendBirthdayEmail(string toEmail, string employeeName)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("buiduchung300802@gmail.com", "ocpb abuz ztmj gmkc"),
                Port = 587,
                EnableSsl = true
            };

            var random = new Random();
            var messageIndex = random.Next(BirthdayMessages.Count);
            var messageBody = string.Format(BirthdayMessages[messageIndex], employeeName);

            var mailMessage = new MailMessage
            {
                From = new MailAddress("buiduchung300802@gmail.com"),
                Subject = "Chúc Mừng Sinh Nhật",
                Body = messageBody,
                IsBodyHtml = false,
            };
            mailMessage.To.Add(toEmail);

            smtpClient.Send(mailMessage);
        }
    }
}

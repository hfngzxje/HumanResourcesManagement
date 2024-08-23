using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using HumanResourcesManagement.Controllers;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HumanResourcesManagement.Tests.Controllers
{
    [TestFixture]
    public class BirthdayControllerTests
    {
        private Mock<BirthdayService> _birthdayServiceMock;
        private BirthdayController _controller;
        private List<EmailHistory> _emailHistories; // Declare this as a class-level field

        [SetUp]
        public void Setup()
        {
            _birthdayServiceMock = new Mock<BirthdayService>();
            _controller = new BirthdayController(_birthdayServiceMock.Object);

            // Initialize the list of email histories
            _emailHistories = new List<EmailHistory>
            {
                new EmailHistory { Id = 1, Ma = "NV001", Email = "nv001@example.com", SentDateTime = DateTime.Now, Greeting = "Chúc mừng sinh nhật NV001!" },
                new EmailHistory { Id = 2, Ma = "NV002", Email = "nv002@example.com", SentDateTime = DateTime.Now, Greeting = "Chúc mừng sinh nhật NV002!" }
            };

            // Setup mock service to return the list of email histories
            _birthdayServiceMock.Setup(s => s.GetEmailHistories(It.IsAny<DateTime?>(), It.IsAny<DateTime?>(), It.IsAny<string>()))
                                .Returns((DateTime? startDate, DateTime? endDate, string? employeeId) =>
                                    _emailHistories.Where(eh => (startDate == null || eh.SentDateTime >= startDate) &&
                                                                 (endDate == null || eh.SentDateTime <= endDate) &&
                                                                 (employeeId == null || eh.Ma == employeeId))
                                );
        }

        // Test CheckAndSendBirthdayEmails method
        [Test]
        public void CheckAndSendBirthdayEmails_ReturnsOkResult_WhenServiceCallIsSuccessful()
        {
            // Arrange
            _birthdayServiceMock.Setup(s => s.CheckAndSendBirthdayEmails());

            // Act
            var result = _controller.CheckAndSendBirthdayEmails() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Gửi email thành công!!", result.Value);

            // Verify the service was called
            _birthdayServiceMock.Verify(s => s.CheckAndSendBirthdayEmails(), Times.Once);
        }

        [Test]
        public void CheckAndSendBirthdayEmails_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            _birthdayServiceMock.Setup(s => s.CheckAndSendBirthdayEmails()).Throws(new Exception("Service error"));

            // Act
            var result = _controller.CheckAndSendBirthdayEmails() as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual("Service error", result.Value);

            // Verify the service was called
            _birthdayServiceMock.Verify(s => s.CheckAndSendBirthdayEmails(), Times.Once);
        }

        // Test GetEmailHistories method
        [Test]
        public void GetEmailHistories_ReturnsOkResult_WithListOfEmailHistories()
        {
            // Act
            var result = _controller.GetEmailHistories(null, null, null) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(_emailHistories, result.Value);
        }

        [Test]
        public void GetEmailHistories_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            var startDate = new DateTime(2024, 1, 1);
            var endDate = new DateTime(2024, 12, 31);
            var employeeId = "EMP001";
            _birthdayServiceMock.Setup(s => s.GetEmailHistories(startDate, endDate, employeeId)).Throws(new Exception("Service error"));

            // Act
            var result = _controller.GetEmailHistories(startDate, endDate, employeeId) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual("Service error", result.Value);

            // Verify the service was called
            _birthdayServiceMock.Verify(s => s.GetEmailHistories(startDate, endDate, employeeId), Times.Once);
        }
    }
}

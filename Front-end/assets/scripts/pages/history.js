function displayActivityHistory() {
    const activityHistory = JSON.parse(localStorage.getItem('activityHistory')) || [];
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
    
    // Đảo ngược mảng để thêm bản ghi mới nhất lên trên cùng
    activityHistory.reverse().forEach(entry => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const actionCell = document.createElement('td');

        dateCell.style.padding = '12px'; // Khoảng cách trong các ô
        timeCell.style.padding = '12px'; // Khoảng cách trong các ô
        actionCell.style.padding = '12px'; // Khoảng cách trong các ô

        const [date, time] = entry.timestamp.split(', ');
        dateCell.textContent = date;
        timeCell.textContent = time;
        actionCell.textContent = `${entry.action}: ${entry.details}`;

        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(actionCell);

        activityList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', displayActivityHistory);

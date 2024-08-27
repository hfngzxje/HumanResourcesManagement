const maDetail = localStorage.getItem('maDetail')

function navigateTo(page) {
    window.location.href = page;
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
            item.style.height = 'auto';
        } else {
            item.style.display = 'none';
            item.style.height = '0';
        }
    });
});


document.addEventListener("DOMContentLoaded",async () => {
    await checkIsUpdateResume()
    await checkIsCreatedLabor()
    await checkIsCreatedSalary()
});

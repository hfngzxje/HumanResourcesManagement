function navigateTo(page) {
    window.location.href = page;
}

// const searchInput = document.getElementById('search-input');
// searchInput.addEventListener('input', function () {
//     const searchTerm = searchInput.value.toLowerCase();
//     const categoryItems = document.querySelectorAll('.category-item');
//     categoryItems.forEach(item => {
//         const text = item.textContent.toLowerCase();
//         if (text.includes(searchTerm)) {
//             item.style.display = 'flex';
//         } else {
//             item.style.display = 'none';
//         }
//     });
// });



// function navigateTo(page) {
//     window.location.href = page;
// }

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
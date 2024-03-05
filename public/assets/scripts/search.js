const searchInput = document.getElementById('search');
const userRows = document.querySelectorAll('.user-row');

searchInput.addEventListener('input', function () {
    const search = searchInput.value.toLowerCase();
    userRows.forEach(function (row) {
        const userName = row.querySelector('td:first-child').textContent.toLowerCase();
        if (userName.includes(search)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
            }
    });
});
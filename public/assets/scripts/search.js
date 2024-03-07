const searchInput = document.querySelector('#search');
const userRows = document.querySelectorAll('.user-row');

searchInput.addEventListener('input', () => {
    const search = searchInput.value.toLowerCase();
    userRows.forEach((row) => {
        const userName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (userName.includes(search)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
            }
    });
});
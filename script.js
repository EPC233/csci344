    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    dropdownBtns.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
        });
    });
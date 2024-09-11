const dropdownBtns = document.querySelectorAll('.dropdown-btn');

dropdownBtns.forEach(button =>
{
    button.addEventListener('click', () =>
    {
        // Toggle the visibility of the next sibling element (dropdown content)
        const dropdownContent = button.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

        // Optional: Add smooth transition
        dropdownContent.style.transition = 'height 0.3s ease-out';
    });
});
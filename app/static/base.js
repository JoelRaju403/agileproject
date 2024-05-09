const hamburgerMenu = document.getElementById('hamburgerMenu');
const dropdownContent = document.getElementById('dropdownContent');
const closemenu = document.getElementById('closeMenu');

hamburgerMenu.addEventListener('click', function() {
  dropdownContent.classList.toggle('active');
})

closemenu.addEventListener('click', function() {
  dropdownContent.classList.remove('active'); // Remove the 'active' class
});

// Function to remove 'active' class from dropdown content
function hideDropdownContent() {
  dropdownContent.classList.remove('active');
}

// Function to handle window resize event
function handleWindowResize() {
  // Check window width
  if (window.innerWidth > 768) {
    // If window width is larger than 768px, hide dropdown content
    hideDropdownContent();
  }
}

// Add event listener for window resize event
window.addEventListener('resize', handleWindowResize);
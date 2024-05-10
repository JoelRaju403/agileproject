const hamburgerMenu = document.getElementById('hamburgerMenu');
const dropdownContent = document.getElementById('dropdownContent');
const closemenu = document.getElementById('closeMenu');
const profileDropdown = document.getElementById('fullscreenMenuDropdown');

hamburgerMenu.addEventListener('click', function() {
  dropdownContent.classList.toggle('active');
})

closemenu.addEventListener('click', function() {
  dropdownContent.classList.remove('active'); // Remove the 'active' class
});


// Function to handle window resize event
function handleWindowResize() {
  // Check window width
  if (window.innerWidth > 768) {
    dropdownContent.classList.remove('active');
  }
  else {
    profileDropdown.classList.toggle('show');
  }
 
}

// Add event listener for window resize event
window.addEventListener('resize', handleWindowResize);

const uploadCreate = document.getElementById("uploadOrCreate");
function uploadOrCreate() {;
  uploadCreate.style.display = "block";
}
  
function closePopup() {
  
  uploadCreate.style.display = "none";
}


function profileDrop() {
  profileDropdown.classList.toggle('show');
}

function darkmode() {
  const main = document.getElementById('main');
  main.classList.toggle('darkmode');

  
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  header.classList.toggle('darkhfmode');
  footer.classList.toggle('darkhfmode');

  const hrElements= document.querySelectorAll('hr');
  hrElements.forEach(hr => {
    hr.classList.toggle('darkHr');
  });

  const dropdown = document.getElementById("fullscreenMenuDropdown");
  dropdown.classList.toggle('darkhfmode');
  
  
  // Save the dark mode state to local storage
  let isDarkMode = main.classList.contains('darkmode');
  localStorage.setItem('darkModeEnabled', isDarkMode);

  const darkDropDown = document.getElementById("darkDropDown");
  const darktoggle = document.getElementById('DMtoggle');
  let isDarkModeToggled = localStorage.getItem('darkModeEnabled') === 'true';
  if (isDarkModeToggled) {

    darkDropDown.textContent = "Light Mode";
    darktoggle.checked = true;
  }
  else {
    darkDropDown.textContent = "Dark Mode";
    darktoggle.checked = false;
  }

}

function initialDarkMode() {
  let isDarkMode = localStorage.getItem('darkModeEnabled') === 'true';
  const darktoggle = document.getElementById('DMtoggle');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const hrElements = document.querySelectorAll('hr');
  const darkDropDown = document.getElementById("darkDropDown");
  const dropdown = document.getElementById("fullscreenMenuDropdown");
  const main = document.getElementById('main');
  
 
  if (isDarkMode) {
    main.classList.toggle('darkmode');
    header.classList.toggle('darkhfmode');
    footer.classList.toggle('darkhfmode');
    dropdown.classList.toogle('darkhfmode');
    darkDropDown.textContent = "Light Mode";
    hrElements.forEach(hr => {
      hr.classList.toggle('darkHr');
    });
    
  
    darktoggle.checked = true;
  } else {
    darkDropDown.textContent = "Dark Mode";
  }
}

window.addEventListener('load', initialDarkMode);
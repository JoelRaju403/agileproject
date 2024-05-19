document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const dropdownContent = document.getElementById('dropdownContent');
  const closemenu = document.getElementById('closeMenu');
  const profileDropdown = document.getElementById('fullscreenMenuDropdown');
  const createUpdate_button = document.getElementById('createUpdate_button');
  const menubar = document.getElementById('menubar');
  const darkDropDown = document.getElementById("darkDropDown");
  const darktoggle = document.getElementById('DMtoggle');
  const uploadCreate = document.getElementById("uploadOrCreate");



  hamburgerMenu.addEventListener('click', function () {
    dropdownContent.classList.toggle('active');
  })

  closemenu.addEventListener('click', function () {
    dropdownContent.classList.remove('active'); // Remove the 'active' class
  });

  createUpdate_button.addEventListener('click', upload_Create);

  menubar.addEventListener('click', profileDrop);

  darkDropDown.addEventListener('click', darkmode);

  darktoggle.addEventListener('click', darkmode);

  


  // Function to handle window resize event
  function handleWindowResize() {
    // Check window width
    if (window.innerWidth > 768) {
      dropdownContent.classList.remove('active');
    }
    else {
      profileDropdown.classList.remove('show');

    }

  }

  // Add event listener for window resize event
  window.addEventListener('resize', handleWindowResize);

  
  function upload_Create() {
    uploadCreate.classList.toggle('show');
  }


  function profileDrop() {
    profileDropdown.classList.toggle('show');
  }

  function darkmode() {
    const main = document.getElementById('main');
    main.classList.toggle('darkmode');


    const header = document.getElementById('header');

    header.classList.toggle('darkhfmode');


    const hrElements = document.querySelectorAll('hr');
    hrElements.forEach(hr => {
      hr.classList.toggle('darkHr');
    });

    const dropdown = document.getElementById("fullscreenMenuDropdown");
    dropdown.classList.toggle('darkhfmode');

    const upload_Create = document.getElementById("uploadOrCreate");
    upload_Create.classList.toggle('darkhfmode');


    // Save the dark mode state to local storage
    let isDarkMode = main.classList.contains('darkmode');
    localStorage.setItem('darkModeEnabled', isDarkMode);



    let isDarkModeToggled = localStorage.getItem('darkModeEnabled') === 'true';
    if (isDarkModeToggled) {

      darkDropDown.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
      darktoggle.checked = true;
    }
    else {
      darkDropDown.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
      darktoggle.checked = false;
    }

  }

  function initialDarkMode() {
    let isDarkMode = localStorage.getItem('darkModeEnabled') === 'true';

    const header = document.getElementById('header');

    const hrElements = document.querySelectorAll('hr');
    const darkDropDown = document.getElementById("darkDropDown");
    const dropdown = document.getElementById("fullscreenMenuDropdown");
    const main = document.getElementById('main');
    const upload_Create = document.getElementById("uploadOrCreate");



    if (isDarkMode) {
      main.classList.toggle('darkmode');
      header.classList.toggle('darkhfmode');

      dropdown.classList.toggle('darkhfmode');
      upload_Create.classList.toggle('darkhfmode');
      darkDropDown.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
      hrElements.forEach(hr => {
        hr.classList.toggle('darkHr');
      });


      darktoggle.checked = true;
    } else {
      darkDropDown.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
  }

  window.addEventListener('load', initialDarkMode);
})
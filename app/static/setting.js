function deleteAcc(userId) {
  if (confirm("Are you sure you want to delete your account?")) {
    fetch(`/delete_user/${userId}`, {
      method: 'DELETE'

  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/'; // Redirect to homepage
    }
    else {
      alert("Cannot delete user")
    }
  })
  .catch(error => console.error('Error:', error));
}

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
  
  
  // Save the dark mode state to local storage
  let isDarkMode = main.classList.contains('darkmode');
  localStorage.setItem('darkModeEnabled', isDarkMode);
}

function initialDarkMode() {
  let isDarkMode = localStorage.getItem('darkModeEnabled') === 'true';
  const darktoggle = document.getElementById('DMtoggle');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const hrElements = document.querySelectorAll('hr');
  const main = document.getElementById('main');
 
  if (isDarkMode) {
    main.classList.toggle('darkmode');
    header.classList.toggle('darkhfmode');
    footer.classList.toggle('darkhfmode');
    hrElements.forEach(hr => {
      hr.classList.toggle('darkHr');
    });
  
    darktoggle.checked = true;
  }
}

window.addEventListener('load', initialDarkMode);

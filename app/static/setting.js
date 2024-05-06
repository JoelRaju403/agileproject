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


  //save the dark mode state local storage
  let isDarkMode = main.classList.contains('darkmode');
  localStorage.setItem('darkModeEnabled', isDarkMode);
  
 
}

function initalDarkMode() {
  let isDarkMode = localStorage.getItem('darkModeEnabled') == 'true';
  const darktoggle = document.getElementById('DMtoggle');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  let main = document.getElementById('main');
  if (isDarkMode) {
    main.classList.toggle('darkmode');
    header.classList.toggle('darkhfmode');
    footer.classList.toggle('darkhfmode');
    darktoggle.checked = true;
  }
}

window.addEventListener('load', initalDarkMode);



  // Get the modal
  const modal = document.getElementById('login-modal');

  // Get the login button that opens the modal
 // const loginBtn = document.getElementById('login-btn');

  // Get the 'get started' button that opens the modal
  const loginBtn1 = document.getElementById('login-btn1');

  // Get the <span> element that closes the modal
  const closeBtn = document.getElementsByClassName('close')[0];

  const page = document.documentElement;

  // When the user clicks the get started button, open the modal 
  /*loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default click behavior
    modal.style.display = 'block';
    modal.classList.add('slide-up'); // Add slide-up class
    page.style.overflow ='hidden';
  });*/

  // When the user clicks the 'get started' button, open the modal 
  loginBtn1.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default click behavior
    modal.style.display = 'block';
    modal.classList.add('slide-up'); // Add slide-up class
  });

  

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
 
 
}

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  setTimeout(function() {
    // Perform login logic here
    console.log('Logging in...');
  }, 100); // Delay for 100 milliseconds
});

var dropdownMenu = document.getElementById("myDropdown");

function showMenu() {
  dropdownMenu.style.display = "block";
}

function hideMenu() {
  dropdownMenu.style.display = "none";
}


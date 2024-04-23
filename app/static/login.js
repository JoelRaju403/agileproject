// Get the modal
const modal = document.getElementById('login-modal');

// Get the button that opens the modal [NOT NEEDED IF WE HAVE A SEPERASTE HTML FOR LOGIN]
//const loginBtn = document.getElementById('login-btn');

// Get the <span> element that closes the modal [NOT NEEDED IF WE USE AN a TAG AND HREF]
//const closeBtn = document.getElementsByClassName('close')[0];


// When the user clicks the login button, open the modal [NOT NEEDED IF WE HAVE A SEPERASTE HTML FOR LOGIN]
/*loginBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default click behavior
  modal.style.display = 'block';
});*/

// When the user clicks on <span> (x), close the modal [NOT NEEDED IF WE USE AN a TAG AND HREF]
//closeBtn.onclick = function() {
// }

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  setTimeout(function() {
    // Perform login logic here
    console.log('Logging in...');
  }, 100); // Delay for 100 milliseconds
});
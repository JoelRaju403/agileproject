

  const modal = document.getElementById('login-modal');


 // const loginBtn = document.getElementById('login-btn');

  // Get the 'get started' button that opens the modal
  const loginBtn1 = document.getElementById('login-btn1');

  const closeBtn = document.getElementsByClassName('close')[0];

  const page = document.documentElement;


  // When the user clicks the 'get started' button, open the modal 
  loginBtn1.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default click behavior
    modal.style.display = 'block';
    modal.classList.add('slide-up'); // Add slide-up class
  });


  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };


 
  

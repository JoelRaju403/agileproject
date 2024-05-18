

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


 
  
    
  document.addEventListener('DOMContentLoaded', function() {
    const studyFeatures = document.querySelector('.studyFeatures');
    const scrollableContent = document.querySelector('.scrollableContent');
    const textBlocks = scrollableContent.querySelectorAll('div');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sectionTop = studyFeatures.offsetTop;

        textBlocks.forEach((textBlock, index) => {
            const textBlockTop = textBlock.offsetTop;
            const isVisible = textBlock.classList.contains('fadeOutUp');
            const isLastBlock = index === textBlocks.length ;

            if (scrollPosition >= sectionTop + textBlockTop && !isVisible && !isLastBlock) {
                setTimeout(() => {
                    textBlock.classList.add('fadeOutUp');
                    textBlocks[index + 1].style.display = 'block'; // Show the next block
                }, 500); // Adjust the delay time as needed (in milliseconds)
            } else {
                textBlock.classList.remove('fadeOutUp');
            }
        });
    });
});

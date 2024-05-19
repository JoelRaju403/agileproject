document.addEventListener('DOMContentLoaded', function(){
  const flashcards = document.getElementsByClassName("flashcards")[0];
  const textToType = "Flashcards are generating!!!!";
  $('#loadingContainer').hide();
  $('#outputContainer').hide();
  $('#AIContainer').hide();

  $('#transform-btn').one('click', function(event){
    event.preventDefault();  
    const promptText = $('#prompt-textarea').val();
    if(promptText == null || promptText.trim() == "") {
      $('#outputContainer').show();
      return;
    }
    $('#loadingContainer').show();
    typeTest();
    $.ajax({
      url: '/answer',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ prompt: promptText }),
      success: function(){
        window.location.href = '/explore';
      },
      error: function(xhr, status, error){
      $('#AIContainer').show();
        console.log(xhr,status, error);
      }
    });
  });

 

function typeTest(){
  let index = 0;
  let typingElement = document.getElementById('animatedText');
  let typingInterval = setInterval(function() {
    typingElement.textContent += textToType.charAt(index);
    index++;
    if(index >= textToType.length) {
      index = 0;
      typingElement.textContent = '';
    }
  }, 200);  

}
});






document.addEventListener('DOMContentLoaded', function() {
  const closeIcons = document.querySelectorAll('.closeIcon');
  closeIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const popup = this.closest('.errormessage, .popup');
      popup.classList.add('hidden');
      $('#outputContainer').hide();
      $('#AIContainer').hide();
      $('#loadingContainer').hide();


    });
  });
});



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

  function divMaker(text) {
    var div = document.createElement("div");
    var h2_question = document.createElement("h2");
    var h2_answer = document.createElement("h2");
    
    div.className = 'flashcard';

    h2_question.setAttribute('style',"border-top:1px solid red; padding: 15px; margin-top:30px");
    h2_question.textContent = text.my_question;

    h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
    h2_answer.textContent = text.my_answer;

    div.appendChild(h2_question);
    div.appendChild(h2_answer);
    
    div.addEventListener("click", function(){
      if(h2_answer.style.display == "none")
        h2_answer.style.display = "block";
      else
        h2_answer.style.display = 'none';
    });

    flashcards.appendChild(div);
  }

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



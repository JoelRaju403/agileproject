document.addEventListener('DOMContentLoaded', function(){
  const flashcards = document.getElementsByClassName("flashcards")[0];
  const textToType = "Flashcards are generating!!!!";
  $('#loadingContainer').hide();

  $('#transform-btn').one('click', function(event){
    event.preventDefault(); 
    //start the text typing
    
    //we have to check if the user has submitted data to create flashcards    
    const promptText = $('#prompt-textarea').val();
    if(promptText == null || promptText.trim() == "") {
      alert("The prompt is empty. Please enter some text.");
      return;
    }
    $('#loadingContainer').show();
    typeTest();

    // Send data to Flask route using AJAX
    $.ajax({
      url: '/answer',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ prompt: promptText }),
      success: function(response){
        $('#loadingContainer').hide();
        console.log(response.flashcards);
        var cards = response.flashcards;
        cards.forEach(divMaker);
      },
      error: function(xhr, status, error){
        // Handle error
        console.error('Failed to send prompt to Flask route:', xhr.responseText);
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

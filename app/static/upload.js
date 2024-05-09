  document.addEventListener('DOMContentLoaded', function(){
  const flashcards = document.getElementsByClassName("flashcards")[0];
  
  $('#transform-btn').click(function(event){
    event.preventDefault();  // Prevent default form submission
    
    // Get data from textarea
    const promptText = $('#prompt-textarea').val();
    
    // Send data to Flask route using AJAX
    $.ajax({
      url: '/answer',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ prompt: promptText }),
      
      success: function(response){
        // Handle success
      
        
        
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
    h2_question.innerHTML = text.my_question;
  
    h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
    h2_answer.innerHTML = text.my_answer;
  
  
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
  });


  



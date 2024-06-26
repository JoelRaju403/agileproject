const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const subject = document.getElementById("subject")
let contentArray = localStorage.getItem('items')?
JSON.parse(localStorage.getItem('items')) : [];

contentArray.forEach(divMaker);


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

const savingFlashcard = document.getElementById("Saving_flashcard");
savingFlashcard.addEventListener('click', addFlashcard);

function addFlashcard(){
  var checkbox = document.querySelector('.toggle input[type="checkbox"]'); // Select the checkbox element
  console.log('Checkbox checked:', checkbox.checked); // Log the state of the checkbox
  let scope;

  if (checkbox.checked) {
    scope = 1;
  } else {
    scope = 0;
  }
  console.log('Scope:', scope); // Log the value of scope

  var flashcard_info = {
    'my_question' : question.value,
    'my_answer' : answer.value,
    'subject' : subject.value,
    'title' : title.value,
    'public' : scope
  }

  console.log('Flashcard Info:', flashcard_info); // Log the flashcard information

  contentArray.push(flashcard_info);
  localStorage.setItem('items',JSON.stringify(contentArray));
  console.log('Stored in local storage:', contentArray); // Log the updated contentArray
  divMaker (contentArray[contentArray.length -1]);
  question.value = '';
  answer.value = '';

}

const deleting_flashcard = document.getElementById("deleting_flashcard");
deleting_flashcard.addEventListener('click', delFlashcards);

function delFlashcards(){
  localStorage.clear();
  flashcards.innerHTML= '';
  contentArray = [];
}

function showCreateCardBox(){
  createBox.style.display = "block"
}

function hideCreateBox(){
  createBox.style.display = "none";

}

$(document).ready(function(){
  $('#flashcard-form').click(function(event){
    
  var checkbox = document.querySelector('.toggle input[type="checkbox"]'); // Select the checkbox element
  console.log('Checkbox checked:', checkbox.checked); // Log the state of the checkbox
  let scope;

  if (checkbox.checked) {
    scope = 1;
  } else {
    scope = 0;
  }
  const subject = $('#subject').val();
  const title = $('#title').val();
  const jsonData = JSON.stringify({
    subject: subject,
    title: title,
    public: scope,
    flashcards: contentArray
  });

  delFlashcards()
  $.ajax({
    url: '/save_flashcards',
    type: 'POST',
    contentType: 'application/json',
    data: jsonData,
    success: function(response){
      $('#flashcard-message').text(response.message);
    },
    error: function(xhr, status, error){
      console.error('Failed to save flashcards;', error);
    }
  });
});
});

const publicCheckbox = document.getElementById("publicCheckbox");
publicCheckbox.addEventListener('click', SwitchPublic)

function SwitchPublic() {
  var privateElement = document.querySelector('.Private'); // Select the paragraph element with class 'Private'
  var checkbox = document.querySelector('.toggle input[type="checkbox"]'); // Select the checkbox element

  if (checkbox.checked) {
      privateElement.textContent = 'Public'; // Change the text content to 'Public' if the checkbox is checked
  } else {
      privateElement.textContent = 'Private'; // Change the text content to 'Private' if the checkbox is unchecked
  }
}



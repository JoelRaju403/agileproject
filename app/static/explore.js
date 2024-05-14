document.addEventListener('DOMContentLoaded', function () {
  const searchContainer = document.getElementsByClassName("searchContainer")[0];
  const searchInput = document.getElementById('searchInput');
  const myCardsHeading = document.getElementById('myCardsHeading');

  var myCardDiv = document.getElementsByClassName("myCards");
  addListeners();



  
    
  searchInput.addEventListener('keyup', function (event) {
      
    if (event.key === 'Enter') {
      event.preventDefault();
  
      
      const searchInputValue = $('#searchInput').val();
      const searchData= JSON.stringify({term: searchInputValue});
    
      $.ajax({
        url: '/search', 
        method: 'POST',
        contentType: 'application/json', 
        data: searchData,
        success: function (response) {
          if ($('.searchContainer').length != 0){ 
            clearBox(searchContainer);
          }
          
          console.log('Search results:', response);
          var result = response.results;
          
          var h1_heading = document.createElement('h1');
          h1_heading.innerHTML="Search Results";
          h1_heading.setAttribute('class', 'searchHeading');
          searchContainer.parentNode.insertBefore(h1_heading, searchContainer);

          const line = document.createElement('hr');
          line.setAttribute('class', 'undersearch');
          myCardsHeading.parentNode.insertBefore(line, myCardsHeading);
        
          result.forEach(divMaker);

          myCardDiv = document.getElementsByClassName("myCards");
          addListeners();

          
        },
        error: function (xhr, status, error) {
        // Handle errors if the request fails
          console.error('Error searching:', error);
        },
      });
    };
  });


  function divMaker(text) {
    var div = document.createElement("div");
    var h2_subject = document.createElement("h2");
    var h3_title = document.createElement("h3");
      
    div.className = 'myCards';
    div.setAttribute('id', text.id);
    div.setAttribute('onclick','sendID()');
    
    h2_subject.innerHTML = text.subject;
    
    h3_title.innerHTML = text.title;
    
    
    div.appendChild(h2_subject);
    div.appendChild(h3_title);
      
    
    searchContainer.appendChild(div);
    
  }

  function clearBox(className) { 
    while(className.firstChild) { 
      className.removeChild(className.firstChild); 
    } 
  }

  

  function addListeners(){
    for(let i = 0; i < myCardDiv.length; i++){
      myCardDiv[i].addEventListener('click',function (event){
        var id = myCardDiv[i].getAttribute("id");
        console.log(id);

        const toSend = JSON.stringify({id: id});
        console.log(toSend);

        $.ajax({
          url: '/sendId',
          method: 'POST',
          contentType: 'application/json',
          data: toSend,
          success: function(){
            console.log('success')
            window.location.href='/learn';
          },


          error: function (xhr, status, error){
            console.error('Error retrieving Cards:', error);
          }
        });
    
      




      });
    }
 }

    

    

    
});




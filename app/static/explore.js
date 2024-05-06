document.addEventListener('DOMContentLoaded', function () {
  const searchContainer = document.getElementsByClassName("searchContainer")[0];
  const searchInput = document.getElementById('searchInput');
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
          // Handle the successful response from the server
          // Display the search results or perform other actions
            console.log('Search results:', response);
            var result = response.results;
            var h1_heading = document.createElement('h1');
            h1_heading.innerHTML="Search Results";
            document.createElement('hr');
            result.forEach(divMaker);


            searchContainer.appendChild(h1_heading);
          },
          error: function (xhr, status, error) {
          // Handle errors if the request fails
            console.error('Error searching:', error);
          }
        });
      }
    });


    function divMaker(text) {
      var div = document.createElement("div");
      var h2_subject = document.createElement("h2");
      var h3_title = document.createElement("h3");
      
      div.className = 'myCards';
    
      h2_subject.innerHTML = text.subject;
    
      h3_title.innerHTML = text.title;
    
    
      div.appendChild(h2_subject);
      div.appendChild(h3_title);
      
    
      searchContainer.appendChild(div);
    
    
    
    }
});
  



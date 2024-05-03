document.addEventListener('DOMContentLoaded', function () {
    // Get the search input field
    var searchInput = document.getElementById('searchInput');
  
    // Add event listener for keydown event
    searchInput.addEventListener('keyup', function (event) {
      // Check if the pressed key is Enter (key code 13)
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior (form submission)
        
        // Get the search query from the input field
        var searchQuery = searchInput.value;
        
        // Perform the search
        searchDatabase(searchQuery);
      }
    });
  });
  
  function searchDatabase(query) {
    
    const searchData={ term: query };
    
    $.ajax({
      url: '/search', 
      method: 'POST', 
      data: JSON.stringify(searchData),
      success: function (response) {
        // Handle the successful response from the server
        // Display the search results or perform other actions
        console.log('Search results:', response);
      },
      error: function (xhr, status, error) {
        // Handle errors if the request fails
        console.error('Error searching:', error);
      }
    });
  }
  



    

    


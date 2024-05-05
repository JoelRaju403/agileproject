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
        console.log(response);
        
        // Display the response in the 'response' div
        $('#response').html(response.response);
      },
      error: function(xhr, status, error){
        // Handle error
        console.error('Failed to send prompt to Flask route:', xhr.responseText);
      }
    });
  });
  



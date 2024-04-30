

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=inspirational',
        headers: {'X-Api-key':'54BNuKnSnAeD1L+DHawYTw==4eLn0FXxFEnC1EmI'},
        contentType: 'application/json',
        success: function(result){

            document.getElementById("quote").innerHTML = result[0].quote;
            document.getElementById("author").innerHTML = result[0].author;
            console.log(result);
            
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });



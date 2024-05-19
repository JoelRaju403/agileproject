var cards = $(".card");
var cardIndex = 0;

$("#next").click(function() {
    $(cards[cardIndex]).fadeOut(1, function() {
        cardIndex = (cardIndex + 1) % cards.length;
        $(cards[cardIndex]).fadeIn(1);
    });
});

$("#prev").click(function() {
    $(cards[cardIndex]).fadeOut(1, function() {
        cardIndex = (cardIndex - 1 + cards.length) % cards.length;
        $(cards[cardIndex]).fadeIn(1);
    });
});

$(".card").click(function() {
    $(this).find(".answer").toggle();
});


document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase().trim();
    console.log(key);
    if(key =="ARROWRIGHT"){
        
            $(cards[cardIndex]).fadeOut(1, function() {
                cardIndex = (cardIndex + 1) % cards.length;
                $(cards[cardIndex]).fadeIn(1);
            });
      
    }

    if(key =="ARROWLEFT"){
        
            $(cards[cardIndex]).fadeOut(1, function() {
                cardIndex = (cardIndex + 1) % cards.length;
                $(cards[cardIndex]).fadeIn(1);
        });
    }

    if(key ==" "){
            $(this).find(".answer").toggle();
}
});
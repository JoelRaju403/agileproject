var cards = $(".card");
var cardIndex = 0;

$("#next").click(function() {
    $(cards[cardIndex]).fadeOut(200, function() {
        cardIndex = (cardIndex + 1) % cards.length;
        $(cards[cardIndex]).fadeIn(40);
    });
});

$("#prev").click(function() {
    $(cards[cardIndex]).fadeOut(200, function() {
        cardIndex = (cardIndex - 1 + cards.length) % cards.length;
        $(cards[cardIndex]).fadeIn(200);
    });
});

$(".card").click(function() {
    $(this).find(".answer").toggle();
});

$(document).ready(function() {

	$(document).keydown(function(e) {
		switch(e.which) {
			case 37: // left
			$('.active').next().addClass('active');
			$('.active').prev().removeClass('active').addClass('previous');
			break;

			case 38: // up
			break;

			case 39: // right
			$('.active').prev().removeClass('previous').addClass('active');
			$('.active').next().removeClass('active');
			break;

			case 40: // down
			$('.active').toggleClass('flipped');
			$('.active').find('p').toggleClass('show-text');
			break;

			default: return; // exit
		}
		e.preventDefault();
	});

});
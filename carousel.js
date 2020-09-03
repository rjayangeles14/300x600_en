var currentImageNum = 0;

$(document).ready(function() {
	$('.hero-nav').click(function() {		
		switchSlide($(this));
	});
});


// switch the slide being displayed (defaulted to previous/left image)
function switchSlide(that) {
	var maxImageIndex = 4;
	var transitionTime = 0.3;
	var currentImage = $('div[data-slideNum="' + currentImageNum + '"');
	var desiredImageNum = currentImageNum - 1;
	var desiredLeft = '-100%';
	var direction = '100%';
	
	// check if 'next' nav was clicked
	if(that.hasClass('next')) {
		desiredImageNum = currentImageNum + 1;
		desiredLeft = '100%';
		direction = '-100%';
	}
	
	// keep desiredImageNum positive (circular)
	if(desiredImageNum < 0)
		desiredImageNum = maxImageIndex;
	else if(desiredImageNum > maxImageIndex)
		desiredImageNum = 0;
	
	var desiredImage = $('div[data-slideNum="' + desiredImageNum + '"');
	desiredImage.css({'left': desiredLeft});

	// make sure none of the slides are tweening
	if(!(TweenMax.isTweening(currentImage) || TweenMax.isTweening(desiredImage))) {
		TweenMax.to(currentImage, transitionTime, { left: direction	});
		TweenMax.to(desiredImage, transitionTime, { left: 0 });

		currentImageNum = desiredImageNum;
	}
}// end switchSlide(that)
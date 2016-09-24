console.log('Loaded!');

// This moves the picture (element pict) to the right/left steadily when clicked
// will stop when reaches the end
var marginLeft = 0;
var right = false;
var interv;
function moveRight() {
	if (right) {
		if (marginLeft >= 150) {
			clearInterval(interv);
		}
		else {
			marginLeft += 2;
		}
	}
	else {
		if (marginLeft <= 0) {
			clearInterval(interv);
		}
		else {
			marginLeft -= 2;
		}
	}
	img.style.marginLeft = marginLeft + 'px';
}

var img = document.getElementById('pict');
img.onclick = function() {
	right = !right;
	interv = setInterval(moveRight, 50);
};

// This keeps flipping the text (element main_text) when clicked 10 times
var doc = document.getElementById('main_text');
var orig = true;
var sirv;
var count;

function changeText() {
	if (count > 10) {
		clearInterval(sirv);
	}
	if (orig) {
		doc.innerHTML = "<P>This is original text! (Count=" + count + ")</P>";
	}
	else {
		count++;
		doc.innerHTML = "<P>This is changed text! (Count=" + count + ")</P>";
	}
	orig = !orig;
}

doc.onclick = function() {
	count = 0;
	sirv = setInterval(changeText, 2000);
};
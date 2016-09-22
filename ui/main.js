console.log('Loaded!');
var marginLeft = 0;
function moveRight() {
	marginLeft += 2;
	img.style.marginLeft = marginLeft + 'px';
}

var img = document.getElementById('pict');
img.onclick = function() {
	var interv = setInterval(moveRight, 50);
}

var doc = document.getElementById('main_text');
var orig = true;

function changeText() {
	if (orig) {
		doc.innerHTML = "<P>This is original text!</P>";
	}
	else {
		doc.innerHTML = "<P>This is changed text!</P>";
	}
	orig = !orig;
}

doc.onclick = function() {
	var sirv = setInterval(changeText, 2000);
}
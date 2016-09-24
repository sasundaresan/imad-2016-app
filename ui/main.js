console.log('Loaded!');

// This moves the picture (element pict) to the right/left steadily when clicked
// will stop when reaches the end
var marginLeft = 0;
var right = false;
var interv;
var mov=false;
function moveRight() {
	if (right) {
		if (marginLeft >= 450) {
			clearInterval(interv);
			mov = false;
		}
		else {
			marginLeft += 2;
		}
	}
	else {
		if (marginLeft <= -450) {
			clearInterval(interv);
			mov = false;
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
    if (!mov) {
	    interv = setInterval(moveRight, 50);
	    mov = true;
    }
};

// This keeps flipping the text (element main_text) when clicked 5 times
var doc = document.getElementById('main_text');
var orig = true;
var swtch = false;
var sirv;
var count;

function changeText() {
	if (count > 5) {
		clearInterval(sirv);
		doc.innerHTML = "<P>Hi! Do you want a different cartoon? Click me!</P>";
		swtch = false;
	}
	else if (orig) {
		doc.innerHTML = "<P>This is a different cartoon! (Count=" + count + ")</P>";
	}
	else {
		doc.innerHTML = "<P>And this is the original cartoon! (Count=" + count + ")</P>";
		count++;
	}
	orig = !orig;
}

doc.onclick = function() {
    if (!swtch) {
	    count = 1;
	    sirv = setInterval(changeText, 2000);
	    swtch = true;
    }
};

var countBtn = document.getElementById('countBtn');
countBtn.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) { // 200 => successful
                var span = document.getElementById('countBtnNo');
                var countBtnNo = request.responseText;
                span.innerHTML = countBtnNo.toString();
            }
        }
    };
    request.open('GET', "http://sasundaresan.imad.hasura-app.io/counter");
    request.send();
};

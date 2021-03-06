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
var cart = document.getElementById('cartoon');
var orig = true;
var swtch = false;
var sirv;
var count;

function changeText() {
	if (count > 5) {
		clearInterval(sirv);
		doc.innerHTML = "<P>Hi! Do you want a different cartoon? Click me!</P>";
		cart.src = "/ui/D_Instructions.gif";
		swtch = false;
	}
	else if (orig) {
		doc.innerHTML = "<P>This is a different cartoon! (Count=" + count + ")</P>";
		cart.src = '/ui/D_IITHumility.gif';
	}
	else {
		doc.innerHTML = "<P>And this is the another cartoon! (Count=" + count + ")</P>";
		cart.src = '/ui/D_JargonWally2.gif';
		count++;
	}
	orig = !orig;
}

doc.onclick = function() {
    if (!swtch) {
	    count = 1;
	    sirv = setInterval(changeText, 5000);
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

var submitBtn = document.getElementById('submitBtn');
var commentInput = document.getElementById('comment');
submitBtn.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) { // 200 => successful
                var commentList = document.getElementById('commentList');
                var comments = request.responseText;
                comments = JSON.parse(comments);
                var listHtml = '';
                for (var ix=0; ix<comments.length; ix++) {
                    listHtml += '<li>' + comments[ix] + '</li>';
                }
                commentList.innerHTML = listHtml;
            }
        }
    };
    request.open('GET', "http://sasundaresan.imad.hasura-app.io/submit-comment?comment=" + commentInput.value);
    request.send();
};

var upsubmitBtn = document.getElementById('upsubmit_btn');
upsubmitBtn.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) { // 200 => successful
                console.log("User logged in");
				alert("Log in successful");
            } else if (request.status === 403) {
				console.log("authentication failure");
				alert("user name / password wrong!");
            } else if (request.status === 500) {
				console.log("some error at server");
				alert("unknown error - no login");
			}
        }
    };
	var username = document.getElementById('username').value;
	var passwd = document.getElementById('passwd').value;
	// just for debugging purposes
	console.log(username);
	console.log(passwd);
    request.open('POST', "http://sasundaresan.imad.hasura-app.io/login", true);
	request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, passwd: passwd}));
};
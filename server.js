var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one': {
		title: 'Joke One!',
		heading: 'Joke One on One',
		date: 'Mag 214, -313',
		content: '<P>Never put off until tomorrow what you can avoid altogether.',
		picture: '/ui/D_JargonWally2.gif'
	},
	'article-two': {
		title: 'Joke Two!',
		heading: 'Joke Two on One',
		date: 'Mag 428, -626',
		content: '<P>The light at the end of the tunnel has been turned off due to budget cuts.',
		picture: '/ui/D_Instructions.gif'
	},
	'article-three': {
		title: 'Joke Three!',
		heading: 'Joke Three on One',
		date: 'Mag 642, -939',
		content: '<P>The light at the end of the tunnel has been turned off due to budget cuts.',
		picture: '/ui/D_IITHumility.gif'
	}
};

function createTemplate(data) {
	var title=data.title;
	var heading = data.heading;
	var date = data.date;
	var pic = data.picture;
	var content = data.content;
	var htmlTemplate = `
	<html>
		<head>
			<title>
				${title}
			</title>
			<link href="/ui/style.css" rel="stylesheet" />
		</head>
		<body>
			<div class="container">
				<div>
					<a href="/">Home</a>&#09;
					<a href="/article-one">Article One</a>&#09;
					<a href="/article-two">Article Two</a>&#09;
					<a href="/article-three">Article Three</a>
				</div>
				<hr/>
				<h3>
					${heading}
				</h3>
				<div>
					${date}
				</div>
				<div class="center">
					<img src=${pic} class="img-medium"/>
				</div>

				<div>
					${content}
				</div>
			</div>
		</body>
	</html>
	`;
	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req, res) {
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/RKL07.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'RKL07.png'));
});

app.get('/ui/:fileName', function (req, res) {
	var fileName = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui', fileName));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

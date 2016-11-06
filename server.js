var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
	user: 'sasundaresan',
	database: 'sasundaresan',
	host: 'db.imad.hasura-app.io',
	port: '5432',
	password: process.env.DB_PASSWORD
};

var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one': {
		title: 'Joke One!',
		heading: 'Joke One on One',
		articledate: '2010-10-05',
		content: `<P>Never put off until tomorrow what you can avoid altogether.
		<P>An answering machine message "The number you have dialed is imaginary. Please rotate your phone 90 degrees and try again."`,
		picture: '/ui/D_JargonWally2.gif'
	},
	'article-two': {
		title: 'Joke Two!',
		heading: 'Joke Two on One',
		articledate: '2016-12-12',
		content: `<P>The light at the end of the tunnel has been turned off due to budget cuts.
		<P>Q: What caused the big bang?<BR>A: God divided by zero. Oops!`,
		picture: '/ui/D_Instructions.gif'
	},
	'article-three': {
		title: 'Joke Three!',
		heading: 'Joke Three on One',
		articledate: '2008-08-13',
		content: `<P>Pride, commitment, teamwork - words we use to get you to work for free.
		<P>"As long as algebra is taught in school, there will be prayer in school." <BR>- Cokie Roberts`,
		picture: '/ui/D_IITHumility.gif'
	}
};

function createTemplate(data) {
	var title=data.title;
	var heading = data.heading;
	var date = data.articledate;
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
					${date.toDateString()}
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

var countBtnNo=0;
app.get('/counter', function(req, res) {
    countBtnNo++;
    res.send(countBtnNo.toString());
});

var commentsList=[];
app.get('/submit-comment', function(req, res) {
    commentsList.push(req.query.comment);
    res.send(JSON.stringify(commentsList));
});

app.get('/jokes/:articleName', function(req, res) {
	pool.query("SELECT * FROM my_articles WHERE title = $1", [req.params.articleName], function(err, result) {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			if (result.rows.length === 0) {
				res.status(404).send('Joke Not Found!');
			} else {
				var articleData = result.rows[0];
				res.send(createTemplate(articleData));
			}
		}
	});
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

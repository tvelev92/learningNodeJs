var express = require('express');
var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
   // --default res.status(200);
    res.render('home');
});

app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune})
})
// custom 404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');

});
// custom 500 page
/*
Note that we no longer have to specify the content 
type or status code: the view engine will return a 
content type of text/html and a status code of 200 
by default. In the catch- all handler, which provides 
our custom 404 page, and the 500 handler, we have to 
set the status code explicitly.
*/
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});

var fortunes = [
"Conquer your fears or they will conquer you.", "Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.", "Whenever possible, keep it simple.",
];
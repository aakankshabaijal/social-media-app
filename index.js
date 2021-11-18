const express = require('express');
const app = express();
const port = 8000; //port 80 is for production/deployment
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./public')); //use static files
app.use(expressLayouts); //use layout for rendering views

//extract style and script from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//for using express router
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
	if (err) {
		console.log(`Error in running the server : ${err}`);
	}
	else {
		console.log(`Server is running on port ${port}`);
	}
});

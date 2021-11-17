const express = require('express');
const app = express();
const port = 8000;
//port 80 is for production/deployment

app.listen(port, (err) => {
	if (err) {
		console.log(`Error in running the server : ${err}`);
	}
	else {
		console.log(`Server is running on port ${port}`);
	}
});

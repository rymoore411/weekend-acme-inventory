const express = require('express');
const port = process.env.port || 3000;
const path = require('path');

const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


app.listen(port, ()=> console.log(`listening on port ${port}`));

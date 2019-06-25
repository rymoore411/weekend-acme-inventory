const express = require('express');
const port = process.env.port || 3000;
const path = require('path');
const { syncAndSeed, models} = require('./db')
const {Product, Inventory} = models;

syncAndSeed();

const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/statuses', async (req, res, next)=>{

  try{
    res.send(await Product.findAll({include: [Inventory]}));
  }
  catch(ex){
    next(ex);
  }

})


app.listen(port, ()=> console.log(`listening on port ${port}`));

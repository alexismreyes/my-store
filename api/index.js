const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const routerApi = require('./routes/index');
const path = require('path');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

app.use(express.json());

const whitelist = ['http://localhost:5500','https://myapp.co'];
const options = {
  origin: (origin, callback)=>{
    if(whitelist.includes(origin) || !origin){ //con !origin le decimos que permita las consultas desde el mismo dominio tambien
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors(options));


app.get('/api',(req,res)=>{
  //res.send("Hola mi server esta funcionando con express");
  res.sendFile(path.join(__dirname, 'index.html'));
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log("Listening in port->",port);
})

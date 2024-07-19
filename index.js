const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const routerApi = require('./api/routes/index');
const path = require('path');

const { logErrors, errorHandler, boomErrorHandler } = require('./api/middlewares/error.handler')

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


app.get('/',(req,res)=>{
  res.send(`
      <div>
    <p><h1>ESTE ES UN PROYECTO BACKEND</h1></p>
    <p>
      Utiliza los endpoints listados a continuación para interactuar con este backend:
      <br><br>

      GET (browser/postman/insonmia/thunder):<br>
      /api/v1/products/<br>
      /api/v1/products/{valid_uuid}<br>
      /api/v1/users?limit=10&offset=11 /* by now use any number for limit and offset, this endpoint has not been worked yet*/

      <br><br>
      POST (postman/insonmia/thunder):<br
      /api/v1/products/ <br>
        - send body { "name" : "productname", "price": 1000, "image": "imageuri" }

      <br><br>
      PATCH/UPDATE (postman/insonmia/thunder):<br>
      /api/v1/products/{valid_uuid}

      <br><br>
      DELETE (postman/insonmia/thunder):<br>
      /api/v1/products/{valid_uuid}

    </p>
  </div>
    `);
  //res.sendFile(path.join(__dirname,'index.html'));
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log("Listening in port->",port);
})

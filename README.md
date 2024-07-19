
## PROYECTO BACKEND MY-STORE:

### Pre-requisites:

***- Node.js***

***
### Stack used:

***- Javascript***

### Dependencies:

***- Express.js***

***- express.router()***

***- nodemon*** (for development hot reload)

***- faker*** (to autogenerate fake data)

***- middlewares*** (to manage errors)

***- boom*** (To manage status code in a better way)

***- joi*** (to validate entry data)

***- cors*** (to bypass cors policies)

*** DEPLOY to vercel***



### Disclaimer:  
This project is intented to test all this technologies, it just pretend to be a guideline o structure to test some features of each of these technologies, it doesn't pretend to resolve any specific requirement, i make it just to practice, however if anybody finds it useful feel free to use it as you need it.
***

### Current features:
The current project has the following endpoints:

***GET (browser/postman/insonmia/thunder):***

/api/v1/products/

/api/v1/products/{valid_uuid}

/api/v1/users?limit=10&offset=11 /* by now use any number for limit and offset, this endpoint has not been worked yet*/


***POST (postman/insonmia/thunder):***
- send body { "name" : "productname", "price": 1000, "image": "imageuri" }


***PATCH/UPDATE (postman/insonmia/thunder):***

/api/v1/products/{valid_uuid}

***DELETE (postman/insonmia/thunder):***

/api/v1/products/{valid_uuid}

***

### Steps to install:

1)  git clone  

2)  cd my-store

3) npm install

4) npm run dev

***

### URL

Frontend URL: http://localhost:3000

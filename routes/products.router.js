const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req,res)=>{
  const products = await service.getProducts();
  res.json(products);
})

router.get("/filter",(req,res)=>{
  res.send("Soy una pagina que usa un url similar al products/:productID")
})

router.get("/:productId",
  validatorHandler(getProductSchema,'params'), //aqui se incorpora el llamado al middleware para que evalue si los parametros enviados cumplen lo estable en getProductSchema, que sea un uuid()
  async(req,res,next)=>{
  try{
    const productId = req.params.productId;
    const product = await service.findById(productId);
    res.json(product);
  }
  catch(error){
    next(error);
  }
})


router.post('/',
  validatorHandler(createProductSchema,'body'), //valide antes de crear el producto que cumpla el esquema createProductSchema
  async(req,res)=>{

  const body = req.body;
  const newProduct = await service.create(body);

  if(newProduct){
    res.status(201).json({
      message: "Created",
      data: newProduct
    });
  }
  else
  {
    res.status(500).json({
      message: "No se pudo crear el recurso"
    });
  }
})


router.patch('/:productId',
  validatorHandler(getProductSchema,'params'), //en este caso particular se corren dos middlewares ya que se evaluara tanto el id como el body del request
  validatorHandler(updateProductSchema,'body'), //verifique que se cumpla el schema updateProductSchema antes de actualizar
  async(req,res,next)=>{

  try{
    const { productId } = req.params;
    const body = req.body;
    const productUpdated = await service.update(productId,body);

    res.status(200).json({
      message: "Product Updated",
      data: productUpdated
    });
  }
  catch(error){
    next(error);
  }
})


router.delete('/:productId',(req,res)=>{

  const { productId } = req.params;
  const deletedProduct = service.delete(productId);

  res.json({
    deletedProduct
  });
})


module.exports = router;

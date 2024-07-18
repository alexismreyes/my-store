const express = require('express');
const router = express.Router();

router.get("/:categoryId/products/:productId",(req,res)=>{
  const categoryId = req.params.categoryId;
  const productId = req.params.productId;

  res.json({
    categoryId,
    productId
  })

})

module.exports = router;

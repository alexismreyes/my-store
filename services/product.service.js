const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for(let index=0; index < limit; index++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
  }
  }

  create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }

    this.products.push(newProduct);
    return newProduct;
  }

  getProducts(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.products)
      },1000);
    });
    //return this.products;
  }

  findById(id){
    //const noexiste = this.funcionquenoexiste();
    const product = this.products.find( product => product.id === id );

    if(!product)
      throw boom.notFound("Product by id not found");

    if(product.isBlock){
      throw boom.conflict('Product is blocked');
    }
    return product;

  }

  update(id, changes){
    const index = this.products.findIndex(item => item.id === id);

    if(index === -1){
      //throw new Error('This time the product was not found');
      throw boom.notFound('product to update has been not found!!');
    }

    const oldProduct = this.products[index];
    this.products[index] = {
      ...oldProduct,
      ...changes
    }

    return this.products[index];

  }

  delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      //throw new Error('Product not found');
      throw boom.notFound('product to delete has been not found!!');
    }
    this.products.splice(index,1); //este comando lo que hace es encontrar el elemento en el array en la posicion index y eliminar un elemento a partir de esa posicion osea el mismo
    return id;
  }

}

module.exports = ProductsService

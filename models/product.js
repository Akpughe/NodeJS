const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true 
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl : {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;


// const db = require('../util/database');

// const Cart = require('./cart');

// // const getProductsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     return db.execute(
//       'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
//       [this.title, this.imageUrl, this.price, this.description]
//     );

//     console.log(values);
//     // products.push(this)

//     // getProductsFromFile(products => {
//     //   if (this.id) {
//     //       const existingProductIndex = products.findIndex(
//     //       prod => prod.id === this.id
//     //     );
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//     //       console.log(err);
//     //     });
//     //   } else {
//     //     products.push(this);
//     //     this.id = Math.random().toString();
//     //     fs.writeFile(p, JSON.stringify(products), err => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });
//     // fs.readFile(p, (err, fileContent) => {
//     //   let products = [];
//     //   if (!err) {
//     //     products = JSON.parse(fileContent);
//     //   }
//     // });
//   }

//   static deleteById(id) {
//     // getProductsFromFile(products => {
//     //   const product = products.find(prod => prod.id === id)
//     //   const updatedProducts =  products.filter(prod => prod.id !== id )
//     //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//     //     if(!err) {
//     //         Cart.deleteProduct(id, product.price)
//     //     }
//     //   })
//     // });
//   }

//   static fetchAll() {
//     // getProductsFromFile(cb);
//     return db.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id] )
//     // getProductsFromFile(products => {
//     //   const product = products.find(p => p.id === id);
//     //   cb(product);
//     // });
//   }
// };

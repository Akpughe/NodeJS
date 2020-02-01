const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = parseFloat(req.body.price);
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then(result => {
      console.log('Created product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

  // const product = new Product(null, title, price, description, imageUrl );

  // product
  //   .save()
  //   .then(() => {

  //     res.redirect('/');
  //   })
  //   .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
        // formsCSS: true,
        // productCSS: true,
        // activeAddProduct: true
      });
    })
    .catch(err => console.log(err));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};
//saving to db
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    prodId
  );

  product
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products',
  //     hasProducts: products.length > 0,
  //     activeShop: true,
  //     productCSS: true
  //   });
  // });
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

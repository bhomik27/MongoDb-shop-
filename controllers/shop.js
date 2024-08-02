const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items);
      const products = user.cart.items;
          res.render('shop/cart', {
            path: '/cart',  
            pageTitle: 'Your Cart',
            products: products 
          }); 
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      console.log()
    }
    )
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .removeFromCart(prodId)
//     .then(result => {
//       // console.log(result);
//       // res.redirect('/cart');
//     })
//     .catch(err =>
//       console.log(err));
// };


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  
  // Log the received productId for debugging
  console.log(`Attempting to delete product with ID: ${prodId}`);
  
  req.user
    .removeFromCart(prodId)
    .then(result => {
      // Log result after deletion for debugging
      console.log(`Product with ID ${prodId} removed successfully.`);
      console.log('Result:', result);
      // Redirect to the cart page after successful deletion
      res.redirect('/cart');
    })
    .catch(err => {
      // Log detailed error message
      console.error(`Error removing product with ID ${prodId}:`, err);
      // Optionally, redirect to an error page or show an error message
      res.redirect('/cart');  // Redirect to cart to handle errors gracefully
    });
};




exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

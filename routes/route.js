const router = require("express").Router();
const user = require('../Controllers/UserController.js')
const product = require('../Controllers/frantend/productController.js')
const DetailController = require('../Controllers/frantend/productDetailController.js')
const cart = require('../Controllers/frantend/cartController')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "@@gaurav@@"

const varifyToken = (req, res, next) => {
    if (req.headers['authorization']) {
        const bearerToken = req.headers['authorization'].split(' ')
        const token = bearerToken[1]
        jwt.verify(token, SECRET_KEY, (err, data) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.userData = data;
                next()
            }
        })
    } else {
        res.sendStatus(404)
    }
}

/*  Start user auth   */
router.post('/signup', user.signup)
router.post('/signin', user.signin)
router.post('/updateuser', varifyToken, user.updateuser)
/*  End user auth   */


/*  Start Main Page Route   */
router.post('/getproduct', product.product)
/*  End Main Page Route    */


/*  Start Product Detail Page Route   */
router.post('/product-detail', DetailController.detail)
/*  End Product Detail Page Route    */


/*Start route for cart */
router.post('/removeCart', varifyToken, cart.removeCart)
router.post('/updateCart', varifyToken, cart.updateCart)
router.post('/saveCart', varifyToken, cart.saveCart)
router.post('/addCart', varifyToken, cart.addCart)
router.post('/getCart', varifyToken, cart.getCart)
router.post('/getcartProduct', varifyToken, cart.getcartProduct)
router.post('/getcartProductWT', cart.getcartProductWT)
/*End route for cart  */


module.exports = router;
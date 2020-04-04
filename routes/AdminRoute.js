const router = require("express").Router();
const Category = require('../Controllers/backend/CategoryController.js')
const Subcategory = require('../Controllers/backend/SubcategoryController.js')
const Product = require('../Controllers/backend/AdminProductController.js')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "@@gaurav@@"
const Subcategory1 = require('../model/admin/subcategory.js')
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

/*Start Category Route*/
router.get('/addfield', async(req,res)=>{
    let data = await Subcategory1.update({},
                          {$set : {"status":"active"}},
                          {upsert:false,
                          multi:true}) 
    res.send(data)
})

router.post('/savecategory', Category.category)
router.get('/getallcategory', Category.getAllcategory)
router.post('/updatecategory', Category.updateCat)
router.post('/deletecat', Category.deleteCat)
/*End Category Route*/

/*Start Sub Category Route*/
router.post('/savesubcategory', Subcategory.subcategory)
router.get('/getallsubcategory', Subcategory.getAllsubcategory)
// router.post('/get_updateproduct', Product.get_updateproduct)
// router.put('/updateproduct', Product.updateproduct)
// router.delete('/deleteproduct/:id', Product.deleteproduct)
/*End Sub Category Route*/


/*Start Product Route*/
router.post('/subcat', Product.subcat)
router.post('/saveproduct', Product.saveproduct)
router.get('/getallproduct', Product.getallproduct)
router.post('/get_updateproduct', Product.get_updateproduct)
router.put('/updateproduct', Product.updateproduct)
router.delete('/deleteproduct/:id', Product.deleteproduct)
/*End Product Route*/

/*Start Product Image Route*/
router.post('/saveproduct_img/:pid', Product.saveproduct_image)
router.post('/get_productImg', Product.get_productImg)
/*End Product Image Route*/

module.exports = router;
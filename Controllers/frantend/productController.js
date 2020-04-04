const Products = require('../../model/admin/Product.js')

exports.product =async (req,res) =>{
    const product = await Products.find({ category: req.body.cat }).limit(8);
    res.send(product);
}



const Products = require('../../model/admin/Product.js')
const ObjectID = require('mongodb').ObjectID;

exports.detail =async (req,res) =>{
    const prod = await Products.findById(req.body.id);
    res.send(prod);
}
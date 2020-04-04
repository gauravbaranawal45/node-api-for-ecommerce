const ObjectID = require('mongodb').ObjectID;
const Cart = require('../../model/Cart.js')
const Products = require('../../model/admin/Product.js')
const InactiveCart = require('../../model/InactiveCart.js')

exports.updateCart = async (req, res) => {
    const getCart = await Cart.updateOne({ $and: [{ pid: req.body.id.id }, { uid: req.userData.uid }] }, { qty: req.body.id.value})
    res.send({ msg: "your cart successfully updated.", status: 200, data: getCart })
}
exports.removeCart = async (req, res) => {
    const getCart = await Cart.remove({ $and: [{ pid: req.body.id }, { uid: req.userData.uid }] }, {})
    const inactive_cart = new InactiveCart();
    inactive_cart.pid = req.body.id;
    inactive_cart.uid = req.userData.uid;
    inactive_cart.save()
    res.send({ msg: "your cart successfully removed.", status: 200 })
}
exports.addCart = (req, res) => {
    // res.send(req.body)
    Object.keys(req.body.id).map(key => {
        req.body.id[key] = { ...req.body.id[key], uid: req.userData.uid }
        let cart = new Cart();
        cart.pid = req.body.id[key].pid;
        cart.qty = req.body.id[key].qty;
        cart.uid = req.body.id[key].uid;
        cart.save()
        res.send(cart)
    });
}
exports.saveCart = async (req, res) => {
    let cartArray = [];
    let pid = [];
    let cartData = JSON.parse(req.body.cart);
    if (req.body.cart !== null) {
        let allKey = Object.keys(cartData);
        await Cart.find({ uid: req.userData.uid }, (err, data) => {
            data.map((val, i) => {
                pid.push(String(val.pid))
            })
        })
        allKey.map(key => {
            if (!pid.includes(key)) {
                cartData[key] = { ...cartData[key], uid: req.userData.uid }
                cartArray.push(cartData[key])
            }
        })
        let insertData = await Cart.insertMany(cartArray);
        res.status(200).send({ insertData })
    } else {
        res.status(500).send({ status: 500 })
    }


}
exports.getCart = async (req, res) => {
    let data = await Cart.find({ uid: req.userData.uid });
    res.send(data)
}
exports.getcartProduct = async (req, res) => {
    let arr = []
    let data = req.body.data;
    data.map(val => arr.push({ _id: new ObjectID(val.pid) }))
    Cart.aggregate([
        {
            $match: { uid: new ObjectID(req.userData.uid) }
        },
        {
            $lookup: {
                from: "products",
                localField: "pid",
                foreignField: "_id",
                as: "products"
            }
        }], function (error, data) {
            return res.json(data);
        });
}

/* Start Before login */
exports.getcartProductWT = async (req, res) => {
    let arr = []
    let data = req.body.data;
    Object.keys(data).map(key => arr.push(new ObjectID(data[key].pid)))
    let feachdata = await Products.find({ _id: arr });
    res.send(feachdata)
}
/* End Before login */
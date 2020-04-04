const Products = require('../../model/admin/Product.js')
const Product_Image = require('../../model/admin/Product_Image.js')
const Subcategory = require('../../model/admin/subcategory.js')
const mongoose = require('mongoose');
const fs = require('fs');

exports.subcat = async (req, res) => {
    const value = await Subcategory.aggregate([
        {
            $match: {
                cat_id: mongoose.Types.ObjectId(req.body.id)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "cat_id",
                foreignField: "_id",
                as: "products"
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$products", 0] }, "$$ROOT"] } }
        },
        { $project: { products: 0 } }
    ])
    res.send(value)
}

exports.saveproduct = async (req, res) => {
    const product = new Products();
    product.product_name = req.body.product_name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.size = req.body.size;
    product.category = req.body.category;
    product.subCat = req.body.subCat;
    product.stock = req.body.stock;
    product.desc = req.body.desc;
    await product.save();
    res.send({id:product._id});
};

exports.getallproduct = async (req, res) => {
    const product = await Products.aggregate([
            {
                $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "cat"
                }
            },
            {
                $lookup: {
                from: "subcategories",
                localField: "subCat",
                foreignField: "_id",
                as: "subcat"
                }
            },
            {
                $lookup: {
                from: "prod_images",
                localField: "_id",
                foreignField: "pid",
                as: "imgData"
                }
            }
        ])
    res.send(product);
};

exports.saveproduct_image =  (req, res) => {
    req.body.map(async(item,i)=>{
        let product_img = new Product_Image();
        let image_name = Date.now() + item.name;
        let imgbase64 = item.img.split(',');
        console.log(imgbase64[0])
        let buff = Buffer.from(imgbase64[1], 'base64');
        fs.writeFile("./upload/" + image_name, buff, (err) => {
            if (err) throw err;
        });
        product_img.pid = req.params.pid;
        product_img.img = image_name
        product_img.position = item.position;
        await product_img.save();
    })
    res.send({data:"product_img"});
};

exports.get_productImg = async (req, res) => {
    const productImg = await Product_Image.find({pid:req.body.id}).sort({ _id: -1 });
    res.send(productImg);
};


exports.get_updateproduct = async (req, res) => {
    const product = await Products.find({ _id: req.body.id });
    res.send(product);

};



exports.updateproduct = async (req, res) => {
    let image_name = Date.now() + '_' + req.body.imgName;
    let imgbase64 = req.body.base64img.split(',');
    let buff = Buffer.from(imgbase64[1], 'base64');
    fs.writeFile("./upload/" + image_name, buff, (err) => {
        if (err) throw err;
        //console.log('The binary data has been decoded and saved to my-file.png');
    });

    const data = {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        discount: req.body.discount,
        category: req.body.category,
        desc: req.body.desc,
        img: image_name
    }

    await Products.findByIdAndUpdate({ _id: req.body.id }, data,
        {
            new: true,
            runValidators: true
        }, (err, data) => {
            if (err) {
                res.send({ data: 'error' });
            } else {
                res.send({ data: 'success' });
            }
        });

};


exports.deleteproduct = async (req, res) => {
    const product = await Products.findOneAndRemove({
        _id: req.params.id
    });
    res.send(req.body);
}
const Subcategory = require('../../model/admin/subcategory.js')

exports.subcategory = async (req, res) => {
    const subcat = new Subcategory();
    subcat.cat_id = req.body.catId;
    subcat.name = req.body.subcat_name;
    await subcat.save()
    res.send(subcat)
}

exports.getAllsubcategory = async (req, res) => {
    const value = await Subcategory.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "cat_id",
                foreignField: "_id",
                as: "products"
            }
        },
        // {
        //     $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$products", 0] }, "$$ROOT"] } }
        // },
        // { $project: { products: 0 } }
    ])
    res.send(value)
}
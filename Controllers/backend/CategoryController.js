const Category = require('../../model/admin/category.js')

exports.category = async (req, res) => {
    const cat = new Category();
    cat.name = req.body.cat_name;
    cat.status="active"
    await cat.save()
    res.send(cat)
}

exports.getAllcategory = async (req, res) => {
    const cat = await Category.find({status:"active"});
    res.send(cat)
}

exports.updateCat = async (req, res) => {
	let update = await Category.findByIdAndUpdate({ _id: req.body.newData.id }, {name:req.body.newData.category},
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
    res.send(update)
}

exports.deleteCat = async (req, res) => {
    let update = await Category.findByIdAndUpdate({ _id: req.body.id }, {status:"inactive"},
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
     res.send(update)
}
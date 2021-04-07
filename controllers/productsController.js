
const db = require('../db')
const Product = require('../models/product')(db)

//DELETE=>delete the data
const remove = async(req, res) => {
    await Product.remove(req.params.id)
    res.send({
        success: true
    })
}

const removeImage = async(req, res) => {
    await Product.removeImage(req.params.productId, req.params.id)
    res.send({
        success: true
    })
}

//PATCH=>exchange some data
const patch = async (req, res) => {
    const oldProduct = await Product.findById(req.params.id)
    if(!oldProduct){
        return res.send({
            success: false,
            message: 'Product not found!'
        })
    }
    //console.log(req.body)
    if(req.body.product){
        oldProduct.product = req.body.product
    }
    if(req.body.price){
        oldProduct.price = req.body.price
    }
    await Product.update(req.params.id, [ oldProduct.product, oldProduct.price ] )
    // /products/id/categories
    if(req.body.categories){
        //to update
        try {
            await Product.updateCategories(req.params.id, req.body.categories)
            //console.log(req.body.categories)
        } catch (err){
            return res.send({
                success: false,
                message: 'Categories not found!'
            })
        }
    }
    res.send({
        success: true
    })
}

//PUT=>change all data
const put = async (req, res) => {
    const { product, price } = req.body
    await Product.update(req.params.id, [ product, price ] )
    res.send({
        success: true
    })
}

//POST=>create one product new
const create = async(req, res) => {
    //console.log(req.body)
    const { product, price } = req.body
    await Product.create([product, price])
    res.send({
        success: true,
        data: req.body
    })
}

const createCategory = async(req, res) => {
    const { categories_products, category_id } = req.body
    await Product.findAllByCategory(req.params.id, [ categories_products, category_id ])
    res.send({
        success: true,
        data: req.body
    })
}

const createImage = async(req, res) => {
    //console.log(req.body)
    const { description, url } = req.body
    await Product.addImage(req.params.id, [ description, url ] )
    res.send({
        success: true,
        data: req.body
    })
}

//GET with'/products:id'=>choose a product only
const getById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.send(product)
}

//GET=>obter, bring all products
const getAll = async(req, res) => {
    let products = null
    if(req.query.categoryId){
        products = await Product.findAllByCategory(req.query.categoryId)
    }else{
        products = await Product.findAll()
    }
    res.send({
        products
    })
}

//sending objects=>
module.exports = {
    remove,
    patch,
    put,
    create,
    createImage,
    createCategory,
    getById,
    getAll,
    removeImage
}
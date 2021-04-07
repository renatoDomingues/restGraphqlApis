
const db = require('../../db')
const Product = require('../../models/product')(db)
const { ApolloError } = require('apollo-server-express')

const getAllProducts = async(context, { filter } ) => { 
    let products = null
    if(filter && filter.categoryId){
        products = await Product.findAllByCategory(filter.categoryId)
    }else{
        products = await Product.findAll()
    }
    //console.log(filter)
    console.log(products)
    return products
}

const createProduct = async( context, { input } ) => {
    const { product, price } = input
    await Product.create( [ product, price ] )
    return {
        product, price
    }
}
const createImageOnProduct = async(context, { productId, input }) => {
    const { description, url } = input
    await Product.addImage(productId, [ description, url ] )
    return{
        description, url        
    }
}
const deleteProduct = async(context, { id } ) => {
    console.log(id)
    await Product.remove(id)
    return true
}
const updateProduct = async(context, { input, id }) => {
    const oldProduct = await Product.findById(id)
    console.log(id, oldProduct)
    if(!oldProduct){
        throw new ApolloError('Product not found!')
    }
    if(input.product){
        oldProduct.product = input.product
    }
    if(input.price){
        oldProduct.price = input.price
    }
    await Product.update(id, [ oldProduct.product, oldProduct.price ] )

    if(input.categories){
        //to update
        try {
            await Product.updateCategories(id, input.categories)
            //console.log(req.body.categories)
        } catch (err){
            throw new ApolloError('ProductCategories not found!')
        }
    }
    return oldProduct
}
const deleteImageOnProduct = async(context, { productId, id }) => {
    await Product.removeImage(productId, id)
    return true
}

module.exports = {
    getAllProducts, createProduct, deleteProduct, updateProduct, createImageOnProduct, deleteImageOnProduct
}
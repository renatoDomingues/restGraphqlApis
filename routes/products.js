
const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

//routes=>
router.delete('/:id', productsController.remove)
router.patch('/:id', productsController.patch)
router.put('/:id', productsController.put)
router.post('/', productsController.create)
router.get('/:id', productsController.getById)
router.get('/', productsController.getAll)
router.post('/:id/images', productsController.createImage)
router.post('/:id/category', productsController.createCategory)
router.delete('/:productId/images/:id', productsController.removeImage)

//DELETE=>delete the data
/*
router.delete('/products/:id', (req, res) => {
    res.send( {
        sucess: true,
        data: 'id' + req.params.id 
    })
})
*/

//PATCH=>exchange some data
/*
router.patch('/products/:id', (req, res) => {
    console.log(req.body)
    res.send( {
        sucess: true,
        data: req.body
    })
})
*/

//PUT=>change all data
/*
router.put('/products/:id', (req, res) => {
    console.log(req.body)
    res.send( {
        sucess: true,
        data: req.body
    })
})
*/

//POST=>create one product new
/*
router.post('/products', (req, res) => {
    console.log(req.body)
    res.send( {
        sucess: true,
        data: req.body 
    })
})
*/

//GET with'/products:id'=>choose a product only
/*
router.get('/products/:id', (req, res) => {
    res.send( {
        name: 'Product 1'
    })
})
*/

//GET=>obter, bring all products
/*
router.get('/products', (req, res) => {
    res.send({
        products: [ 'All products!' ]
    })
})
*/

module.exports = router
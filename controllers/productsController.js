
//DELETE=>delete the data
const remove = (req, res) => {
    res.send({
        success: true,
        data: 'id' + req.params.id
    })
}

//PATCH=>exchange some data
const patch = (req, res) => {
    console.log(req.body)
    res.send({
        success: true,
        data: req.body
    })
}

//PUT=>change all data
const put = (req, res) => {
    console.log(req.body)
    res.send({
        success: true,
        data: req.body
    })
}

//POST=>create one product new
const create = (req, res) => {
    console.log(req.body)
    res.send({
        success: true,
        data: req.body
    })
}
//GET with'/products:id'=>choose a product only
const getById = (req, res) => {
    res.send({
        name: 'Product 1'
    })
}

//GET=>obter, bring all products
const getAll = (req, res) => {
    res.send({
        products: [ 'All products' ]
    })
}

//sending objects=>
module.exports = {
    remove,
    patch,
    put,
    create,
    getById,
    getAll
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const productsRouter = require('./routes/products')
const routes = require('./routes/index')
const { ApolloServer, gql } = require('apollo-server-express')

//Warning REST =>

//to shape a body
app.use(bodyParser.json())

//to do: file routes/products.js
app.use(routes)
//app.use(productsRouter)

/*
//DELETE=>delete the data
app.delete('/products/id', (req, res) => {
    res.send( {
        sucess: true,
        data: 'id' + req.params.id 
    })
})

//PATCH=>exchange some data
app.patch('/products/:id', (req, res) => {
    console.log(req.body)
    res.send( {
        sucess: true,
        data: req.body
    })
})

//PUT=>change all data
app.put('/products/:id', (req, res) => {
    console.log(req.body)
    res.send( {
        sucess: true,
        data: req.body
    })
})

//POST=>create one product new
app.post('/products', (req, res) => {
    console.log(req.body)
    res.send( {
        sucess: true,
        data: req.body 
    })
})

//GET with'/products:id'=>choose a product only
app.get('/products/:id', (req, res) => {
    res.send( {
        name: 'Product 1'
    })
})

//GET=>obter, bring all products
app.get('/products', (req, res) => {
    res.send({
        products: [ 'All products!' ]
    })
})
*/

//Warning GRAPHQL =>
const typeDefs = gql`
    type Query {
        getAllProducts: String
    }
`
const resolvers = {
    Query: {
        getAllProducts: () => 'All products'
    }
}

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
})
graphqlServer.applyMiddleware({ app })


app.listen( 3000, (err) => {
    if(err) {
        console.log('Not possible to listen on port 3000')
    }else {
        console.log('Server running on port 3000')
    }
})

//To simulate the FrontEnd: postman OR insomnia

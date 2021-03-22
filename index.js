
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const productsRouter = require('./routes/products')
const routes = require('./routes')
//const { ApolloServer, gql } = require('apollo-server-express')
const graphqlServer = require('./graphql')

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
graphqlServer.applyMiddleware({ app })
/*
const typeDefs = gql`
    type Query {
        getAllProducts: [ Product ]
    }
    type Product {
        id: String
        name: String
    }
    type Mutation{
        createProduct( input: ProductInput ): Product 
    }
    input ProductInput{
        id: String!
        name: String!
    }
`
const resolvers = {
    Query: {
        getAllProducts: () => [ { id: '1', name: 'All products' } ]
    },
    Mutation: {
        createProduct: ( context, { input } ) => {
            const { id, name } = input
            console.log(id, name)
            return {
                id, name 
            }
        }
    }
}

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
})
graphqlServer.applyMiddleware({ app })
*/

app.listen( 3000, (err) => {
    if(err) {
        console.log('Not possible to listen on port 3000')
    }else {
        console.log('Server running on port 3000')
    }
})

//To simulate the FrontEnd: postman OR insomnia

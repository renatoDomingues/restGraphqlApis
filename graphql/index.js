
const { ApolloServer, gql } = require('apollo-server-express')
//const schema = fs.readFileSync('./schema.graphql')
const fs = require('fs')//manipulate files
const path = require('path')
const resolvers = require('./resolvers')

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql` ${schema} `

/*
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
*/

const graphqlServer = new ApolloServer({
typeDefs,
resolvers
})
//graphqlServer.applyMiddleware({ app })

module.exports = graphqlServer
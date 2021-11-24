
const { getAllProducts, createProduct, deleteProduct, updateProduct, createImageOnProduct, deleteImageOnProduct } = require('./products')
const { AuthenticationError } = require('apollo-server-express')

const needsAuth = resolver => {
  return async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('needs authentication')
    }
    return resolver(parent, args, context)
  }
}

const resolvers = {
  Query: {
    getAllProducts: needsAuth(getAllProducts)
  },
  Mutation: {
    createProduct,
    deleteProduct,
    updateProduct,
    createImageOnProduct,
    deleteImageOnProduct
  }
}
module.exports = resolvers

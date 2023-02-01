const { gql } = require("apollo-server-express");

// ！means that the field is non-nullable
const typeDefs = gql`
    type User {
        _id: ID
        email: String
        password: String   
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;
import { ApolloServer } from "@apollo/server"
import express from "express"
import cors from "cors"
import { expressMiddleware } from "@apollo/server/express4"
import { applyMiddleware } from "graphql-middleware"
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import { schema } from "@gql-app/graphql"
import { permissions } from '@gql-app/guards';
import prisma from "./prisma/prismaClient"


// Setup
// ---------------------------------
const port = process.env.PORT || 4000
const app = express()

const logInput = async (resolve, root, args, context, info) => {
    //Modify result or conditionally based on info
    // console.debug(context)
    return await resolve(root, args, context, info)
}
const schemaWithPermissions = applyMiddleware(schema, permissions, logInput)

// Server
// ---------------------------------
const server = new ApolloServer({
    schema: schemaWithPermissions,
    introspection: true
})
await server.start()

// Graphql
// ---------------------------------
app.use(
    "/graphql",
    graphqlUploadExpress(),
    express.json(),
    cors(),
    expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res, prisma }),
    })
)

// Index page
// ---------------------------------
app.get("/", (req, res) => {
    res.json({
        message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    })
})

// START SERVER
// ---------------------------------
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
})
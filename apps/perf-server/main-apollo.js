import { ApolloServer } from "@apollo/server"
import { applyMiddleware } from "graphql-middleware"
import { schema } from "@gql-app/graphql"
import { permissions } from '@gql-app/guards';
import prisma from "./prisma/prismaClient"
import { startServerAndCreateNextHandler } from '@as-integrations/next';


// Setup
// ---------------------------------
const logInput = async (resolve, root, args, context, info) => {
    //Modify result or conditionally based on info
    // console.debug("CONTEXT--------->", context)
    return await resolve(root, args, context, info)
}

const schemaWithPermissions = applyMiddleware(schema, permissions, logInput)

// Using Apollo Server
// ---------------------------------
const server = new ApolloServer({
    // schema,
    schema: schemaWithPermissions,  //Enable for api requests with permissions
    introspection: true
})

export const apolloHandler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({ req, res, prisma }),
});

// ---------------------------------
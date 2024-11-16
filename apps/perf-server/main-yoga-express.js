import express from "express"
import cors from "cors"
import { expressMiddleware } from "@apollo/server/express4"
import { applyMiddleware } from "graphql-middleware"
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import { schema } from "@gql-app/graphql"
import { permissions } from '@gql-app/guards';
import prisma from "./prisma/prismaClient"
import { createYoga } from 'graphql-yoga'

// Setup
// ---------------------------------
const logInput = async (resolve, root, args, context, info) => {
  //Modify result or conditionally based on info
  // console.debug(context)
  return await resolve(root, args, context, info)
}

const schemaWithPermissions = applyMiddleware(schema, permissions, logInput)


// Using Graphql Yoga
// ----------------------------------
const yoga = createYoga({
  renderGraphiQL: () => {
    return `
          <!DOCTYPE html>
          <html lang="en">
            <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
            <div id="sandbox" style="height:100vh; width:100vw;"></div>
            <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
            <script>
            new window.EmbeddedSandbox({
              target: "#sandbox",
              // Pass through your server href if you are embedding on an endpoint.
              // Otherwise, you can pass whatever endpoint you want Sandbox to start up with here.
              initialEndpoint: "/api/graphql",
            });
            // advanced options: https://www.apollographql.com/docs/studio/explorer/sandbox#embedding-sandbox
            </script>
            </body>
          </html>`
  },
  graphqlEndpoint: '/api/graphql',
  schema: schemaWithPermissions,
  context: ({ req, res }) => ({ req, res, prisma }),
  fetchAPI: { Response },
  plugins: []
})

export { yoga as yogaHandler }


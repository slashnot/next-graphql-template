import { mergeSchemas } from "@graphql-tools/schema"
import { TestDef, TestResolvers } from "@gql-app/graphql/Test/Test"
import { UserDef, UserResolver } from "@gql-app/graphql/User"
import { UploadDef, UploadResolver } from "@gql-app/graphql/Upload"

const typeDefs = [
  TestDef,
  UserDef,
  UploadDef
]
const resolvers = [
  TestResolvers,
  UserResolver,
  UploadResolver
]
// For long running servers
const schema = mergeSchemas({
  typeDefs,
  resolvers,
})

export { schema, typeDefs, resolvers }

import { mergeSchemas } from "@graphql-tools/schema"
import { TestDef, TestResolvers } from "@gql-app/graphql/Test/Test"
import { UserDef, UserResolver } from "@gql-app/graphql/User"
import { UploadDef, UploadResolver } from "@gql-app/graphql/Upload"
import { ExcelDef, ExcelResolver } from "@gql-app/graphql/Excel"

const typeDefs = [
  TestDef,
  UserDef,
  UploadDef,
  ExcelDef
]
const resolvers = [
  TestResolvers,
  UserResolver,
  UploadResolver,
  ExcelResolver
]
// For long running servers
const schema = mergeSchemas({
  typeDefs,
  resolvers,
})

export { schema, typeDefs, resolvers }

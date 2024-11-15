import { fileTypeFromBuffer } from 'file-type';
import TestDef from './Test.gql'
import fs from 'fs'
import path from 'path'
import { GraphQLScalarType, Kind } from 'graphql/index.mjs';
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";


const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});


const Query = {
  events: async () => {
    return [{ id: 12, date: new Date() }]
  },
  allTests: async (_root, args, { prisma, ...others }) => {
    return await prisma.test.findMany()
  },
}

const Mutation = {
  addTest: async (_root, { input }, { prisma }) => {
    return await prisma.test.create({ data: input })
  },

  singleUpload: async (_root, { file }) => {
    console.log("FILE--->", file)
    // const { name, size, type } = file
    // const fileArrayBuffer = await file.arrayBuffer()
    // const { ext, mime } = await fileTypeFromBuffer(fileArrayBuffer)

    // await fs.promises.writeFile(
    //   path.join("storage", file.name),
    //   Buffer.from(fileArrayBuffer),
    // )

    // return { filename: name, extension: ext, mime, size, type };
    return { filename: "some" }
  },
}

const TestResolvers = { Upload: GraphQLUpload, Date: dateScalar, Query, Mutation }
export { TestDef, TestResolvers }

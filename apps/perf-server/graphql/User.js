import { gql } from "graphql-modules"
import prisma from "../prisma/prismaClient"
import { signToken, hashPassword, verifyPassword, verifyToken } from "@gql-app/utils"

const UserDef = gql`
  type User {
    id: ID!
    username: String
    password: String!
    name: String!
    email: String
    token: String
  }

  type UserQuery{
    id: ID!
    username: String
    name: String!
    email: String
  }

  type Query {
    allUsers: [UserQuery]
  }

  input UserInput {
    name: String
    username: String!
    password: String!
    email: String!
 }

  type Mutation {
    addUser(user: UserInput): User
    register(user: UserInput): User
    login(user: UserInput): User
  }
`

const Query = {
  allUsers: async (_root, _args, { req, res, prisma }) => {
    return await prisma.user.findMany()
  },
}

const Mutation = {
  addUser: async (_root, { user }, { prisma }) => {
    return await prisma.user.create({ data: user })
  },
  // -------------

  register: async (parent, args, context) => {
    const { password, ...rest } = args.user;

    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword
      }
    })

    return {
      id: result.id,
      username: result.username,
      token: signToken({ userId: result.id }),
    };
  },
  // -------------

  login: async (parent, args, context) => {
    const { password, username } = args.user;

    const result = await prisma.user.findUnique({
      where: { username }
    })

    const isValidPassword = await verifyPassword(result.password, password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    return {
      id: result.id,
      username: result.username,
      token: signToken({ userId: result.id }),
    };
  }
}

const UserResolver = { Query, Mutation }
export { UserDef, UserResolver }

import { rule } from "graphql-shield";
import { verifyToken } from "@gql-app/utils";
import prisma from "@gql-app/prisma/prismaClient";

export const isAuthorized = rule()(async (parent, args, { req }, info) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();

  const { userId } = verifyToken(token);
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (user) {
    return !!userId
  }

  return false
});
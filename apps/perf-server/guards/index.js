import { shield, allow } from "graphql-shield";

import { isAuthorized } from '@gql-app/utils'

export const permissions = shield({
    Query: {
        // allUsers: isAuthorized,
        allUsers: allow,
    },
    Mutation: {
        login: allow,
        register: allow,
        addUser: isAuthorized,
        singleUpload: allow
    },
});
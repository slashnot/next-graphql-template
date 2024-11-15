import { GraphQLError } from 'graphql/index.mjs'

const errorCodes = {
    UPLOAD_DIR_CREATE_ERROR: {
        message: 'Error creating directory for upload',
        code: 'UPLOAD_DIR_CREATE_ERROR'
    },
    STORAGE_DIR_CREATE_ERROR: {
        message: 'Error creating storage directory for upload',
        code: 'STORAGE_DIR_CREATE_ERROR'
    }
}

const throwGqlError = (code, param) => {
    const error = errorCodes[code]
    if (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: error.code
            }
        })
    }
    else {
        throw new GraphQLError("Unknown server error", {
            extensions: {
                code: 'UNKNOWN_ERROR'
            }
        })
    }
}

const getError = (code) => {
    const error = errorCodes[code]
    if (error) {
        return new GraphQLError(error.message, {
            extensions: {
                code: error.code
            }
        })
    }
    else {
        return new GraphQLError("Unknown server error", {
            extensions: {
                code: 'UNKNOWN_ERROR'
            }
        })
    }
}

export { throwGqlError, errorCodes, getError }
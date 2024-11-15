import UploadDef from './Upload.gql'
import { upload } from '@gql-app/utils/upload'


const Query = {}

const Mutation = {
  uploadFile: async (parent,_args, { res: {file, details} }) => {
    console.log("UPLOAD---- ---->", file, details)
    const fileResult = upload(file, details)

    return fileResult
  },
}

const UploadResolver = { Query, Mutation }
export { UploadDef, UploadResolver }

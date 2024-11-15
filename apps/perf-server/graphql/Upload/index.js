import UploadDef from './Upload.gql'
import { upload } from '@gql-app/utils/upload'


const Query = {}

const Mutation = {
  uploadFile: async (_parent, { file, details }) => {
    console.log("UPLOAD-->", file, details)
    return upload(file, details)
  },
}

const UploadResolver = { Query, Mutation }
export { UploadDef, UploadResolver }

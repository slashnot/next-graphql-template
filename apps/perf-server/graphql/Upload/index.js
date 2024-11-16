import UploadDef from './Upload.gql'
import { upload } from '@gql-app/utils/upload'


const Query = {}

const Mutation = {
  uploadFile: async (_parent, { files, details }) => {
    const uploadedFiles = Array.isArray(files) ? files : [files]
    return uploadedFiles.map(file => upload(file, details))
  },
}

const UploadResolver = { Query, Mutation }
export { UploadDef, UploadResolver }

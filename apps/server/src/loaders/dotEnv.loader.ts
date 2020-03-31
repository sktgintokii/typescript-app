import 'dotenv-defaults/config'
import { Loader, ProcessEnv } from '../interfaces'

const dotEnvLoader: Loader<ProcessEnv> = async (): Promise<ProcessEnv> => {
  return process.env
}

export default dotEnvLoader

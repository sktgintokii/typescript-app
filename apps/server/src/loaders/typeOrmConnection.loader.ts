import { createConnection } from 'typeorm'
import { Loader, TypeOrmConnection, TypeOrmConnectionOption } from '../interfaces'

const typeOrmConnectionLoader: Loader<TypeOrmConnection> = async (
  options: TypeOrmConnectionOption,
): Promise<TypeOrmConnection> => {
  const conn = await createConnection(options)

  return conn
}

export default typeOrmConnectionLoader

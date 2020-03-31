import { Connection, ConnectionOptions } from 'typeorm'

export interface Loader<T> {
  (...args: any[]): Promise<T>
}

export type ProcessEnv = NodeJS.ProcessEnv

// TypeOrm
export type TypeOrmConnection = Connection
export type TypeOrmConnectionOption = ConnectionOptions

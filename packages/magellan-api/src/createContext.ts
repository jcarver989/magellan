import { getMetastoreClientFromEnv, MetastoreClient } from './metastore'

export interface Context {
  metastoreClient: MetastoreClient
}

export function createContext(): Context {
  return { metastoreClient: getMetastoreClientFromEnv() }
}

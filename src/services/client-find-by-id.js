import { clientFindByIdAPI } from './client-find-by-id-api'
import { clientFindByIdLocalStorage } from './client-find-by-id-local-storage'
import { useAPI } from './api-config'

export async function clientFindById(data) {
  if (useAPI) {
    return clientFindByIdAPI(data)
  } else {
    return clientFindByIdLocalStorage(data)
  }
}

import { apiConfig } from './api-config.js'

export async function clientFindByIdAPI({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/clients`)

    const data = await response.json()

    const clientData = data.filter((client) => client.id === id)

    return clientData
  } catch (error) {
    console.log(error)
    alert('Não foi possível buscar as informações do cliente.')
    return null
  }
}

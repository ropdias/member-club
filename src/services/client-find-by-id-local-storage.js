export function clientFindByIdLocalStorage({ id }) {
  try {
    const data = JSON.parse(localStorage.getItem('clients')) || []
    const clientData = data.filter((client) => client.id === id)

    return clientData
  } catch (error) {
    console.log(error)
    alert('Não foi possível buscar as informações do cliente.')
  }
}

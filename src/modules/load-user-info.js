import { clientFindById } from '../services/client-find-by-id.js'

const form = document.getElementById('header-id-form')
const input = document.getElementById('card-id')

if (form && input) {
  form.onsubmit = async (event) => {
    event.preventDefault() // Previne o envio padrão do formulário

    const id = input.value

    const clientData = await clientFindById({ id })

    console.log(clientData)
  }
} else {
  console.error('One or more elements were not found!')
}

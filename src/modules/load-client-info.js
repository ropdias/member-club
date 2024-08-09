import { clientFindById } from '../services/client-find-by-id.js'

const form = document.getElementById('header-id-form')
const input = document.getElementById('card-id')
const userAvatar = document.getElementById('user-avatar-img')

if (form && input) {
  form.onsubmit = async (event) => {
    event.preventDefault() // Previne o envio padrão do formulário

    const id = input.value

    const clientData = await clientFindById({ id })

    if (clientData.length === 0) {
      input.value = ''
      alert('ID não encontrado ! Tente novamente !')
      return
    }

    userAvatar.src = `./assets/avatars/${clientData[0].imgKey}`

    console.log(clientData)
  }
} else {
  console.error('One or more elements were not found!')
}

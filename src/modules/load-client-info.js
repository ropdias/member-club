import { clientFindById } from '../services/client-find-by-id.js'

const form = document.getElementById('header-id-form')
const input = document.getElementById('card-id')
const userAvatar = document.getElementById('user-avatar-img')
const userName = document.getElementById('user-name')
const userClientSince = document.getElementById('user-client-since')
const cardHeaderIdTag = document.getElementById('card-header-id-tag')
const totalCuts = document.getElementById('history-header-total-cuts')
const historyList = document.getElementById('history-list')

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
    userName.innerHTML = clientData[0].name
    userClientSince.innerHTML = `Cliente desde ${clientData[0].clientSince}`
    cardHeaderIdTag.innerHTML = `ID: ${clientData[0].id}`

    totalCuts.innerHTML = `${clientData[0].loyaltyCard.totalCuts} cortes`

    // <li class="history-list-item">
    //   <div class="history-list-item-data">
    //     <h2>29/04/2024</h2>
    //     <span>18:30</span>
    //   </div>
    //   <div class="history-list-item-check">
    //     <img src="./assets/icons/seal-check.svg" alt="seal-check" />
    //   </div>
    // </li>

    historyList.innerHTML = ''

    clientData[0].appointmentHistory.forEach((appointment) => {
      const item = document.createElement('li')

      // Creating itemData
      const itemData = document.createElement('div')
      const date = document.createElement('h2')
      const time = document.createElement('span')
      date.innerHTML = appointment.date
      time.innerHTML = appointment.time
      itemData.classList.add('history-list-item-data')
      itemData.append(date, time)

      // Creating itemCheck
      const itemCheck = document.createElement('div')
      const sealIcon = document.createElement('img')
      sealIcon.setAttribute('src', './assets/icons/seal-check.svg')
      sealIcon.setAttribute('alt', 'seal-check')
      itemCheck.classList.add('history-list-item-check')
      itemCheck.append(sealIcon)

      item.classList.add('history-list-item')
      item.append(itemData, itemCheck)
      historyList.appendChild(item)
    })

    console.log(clientData)
  }
} else {
  console.error('One or more elements were not found!')
}

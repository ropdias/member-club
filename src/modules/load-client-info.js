import { clientFindById } from '../services/client-find-by-id.js'

const form = document.getElementById('header-id-form')
const input = document.getElementById('card-id')
const userAvatar = document.getElementById('user-avatar-img')
const userName = document.getElementById('user-name')
const userClientSince = document.getElementById('user-client-since')
const cardHeaderIdTag = document.getElementById('card-header-id-tag')
const historyHeadertotalCuts = document.getElementById(
  'history-header-total-cuts',
)
const historyList = document.getElementById('history-list')
const cardSlots = document.getElementById('card-slots')
const cardHeaderTextSpan = document.getElementById('card-header-text-span')
const progressRemainingNumber = document.getElementById(
  'progress-remaining-number',
)
const progressRemainingText = document.getElementById('progress-remaining-text')
const progressBarProgress = document.getElementById('progress-bar-progress')
const progressBarText = document.getElementById('progress-bar-text')

const modal = document.getElementById('modal')

const ordinals = [
  'primeiro',
  'segundo',
  'terceiro',
  'quarto',
  'quinto',
  'sexto',
  'sétimo',
  'oitavo',
  'nono',
  'décimo',
]

if (form && input) {
  form.onsubmit = async (event) => {
    event.preventDefault() // Previne o envio padrão do formulário

    const id = input.value

    const clientData = await clientFindById({ id })

    if (!clientData || clientData.length === 0) {
      input.value = ''
      alert('ID não encontrado ! Tente novamente !')
      return
    }

    const totalCuts = clientData[0].loyaltyCard.totalCuts
    const cutsNeeded = clientData[0].loyaltyCard.cutsNeeded
    const cutsRemaining = clientData[0].loyaltyCard.cutsRemaining

    userAvatar.src = `./assets/avatars/${clientData[0].imgKey}`
    userName.innerHTML = clientData[0].name
    userClientSince.innerHTML = `Cliente desde ${clientData[0].clientSince}`
    cardHeaderIdTag.innerHTML = `ID: ${clientData[0].id}`

    historyHeadertotalCuts.innerHTML = `${totalCuts} cortes`

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

    cardHeaderTextSpan.innerHTML = `Ao fazer cortes de cabelo, o ${ordinals[cutsNeeded - 1]} sai de graça!`

    // Cleaning cardSlots:
    cardSlots.innerHTML = ''

    for (let i = 0; i < totalCuts; i++) {
      const cardItem = document.createElement('div')
      cardItem.classList.add('card-item')
      const img = document.createElement('img')
      img.src = './assets/pin-check.png'
      img.alt = 'pin-check'
      cardItem.appendChild(img)

      cardSlots.appendChild(cardItem)
    }

    for (let i = 0; i < cutsRemaining; i++) {
      const cardItem = document.createElement('div')
      cardItem.classList.add('card-item')
      if (i === cutsRemaining - 1) {
        const lastImg = document.createElement('img')
        lastImg.src = './assets/icons/gift-solid.svg'
        lastImg.alt = 'gift-solid'
        cardItem.appendChild(lastImg)
      }
      cardSlots.appendChild(cardItem)
    }

    progressRemainingNumber.innerHTML = cutsRemaining
    progressRemainingText.innerHTML = `corte${cutsRemaining === 1 ? '' : 's'} restante${cutsRemaining === 1 ? '' : 's'}`
    progressBarProgress.style.width = `${(totalCuts / cutsNeeded) * 100}%`
    progressBarText.innerHTML = `${totalCuts} de ${cutsNeeded}`

    if (cutsRemaining <= 0) {
      modal.style.display = 'block'
    }
  }
} else {
  console.error('One or more elements were not found!')
}

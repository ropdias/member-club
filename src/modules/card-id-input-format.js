const cardId = document.getElementById('card-id')

if (cardId) {
  cardId.oninput = () => {
    // Get input value and remove non-numeric characters
    let value = cardId.value.replace(/\D/g, '')

    // Insert hyphens every 3 digits
    value = value.replace(/(.{3})(?=.)/g, '$1-')

    // Set the formatted value back to the input
    cardId.value = value
  }
} else {
  console.error('One or more elements were not found!')
}

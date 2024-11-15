const modal = document.getElementById('modal')

const closeModal = () => {
  modal.style.display = 'none'
}

if (modal) {
  modal.onclick = function (event) {
    const target = event.target

    if (target === modal || target.id === 'modal-close') {
      closeModal()
    }
  }
}

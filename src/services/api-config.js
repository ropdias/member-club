import dbData from '../../db.json'

export const apiConfig = {
  baseURL: 'http://localhost:3333',
}

// Configuration to choose between API and localStorage
export const useAPI = false // Change to false to use localStorage

if (!useAPI) {
  // Check if 'clients' is already in localStorage
  if (!localStorage.getItem('clients')) {
    const { clients } = dbData
    // Set 'clients' in localStorage
    localStorage.setItem('clients', JSON.stringify(clients))
  }
}

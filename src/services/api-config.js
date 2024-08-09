export const apiConfig = {
  baseURL: 'http://localhost:3333',
}

// Configuration to choose between API and localStorage
export const useAPI = true // Change to false to use localStorage
console.log(`Prod: ${process.env.NODE_ENV === 'production' ? 'true' : 'false'}`)

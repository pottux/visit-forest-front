import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('/api/visits/all')
  return response.data
}

const getRoute = async (route) => {
  const response = await axios.get(`api/geo/${route}`)
  return response.data
}

export default {
  getAll,
  getRoute
}
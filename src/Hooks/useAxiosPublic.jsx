import axios from "axios"

const axiosPublic = axios.create({
    baseURL: 'https://paws-tails-server-side.vercel.app'
})
function useAxiosPublic () {
  return axiosPublic
}

export default useAxiosPublic
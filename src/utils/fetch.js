import Oaxios from "axios"

const ALLOW_TIMEOUT = 6000 // ms

const axios = Oaxios.create({
  timeout: ALLOW_TIMEOUT,
  validateStatus: status => status !== 500
})

export default axios
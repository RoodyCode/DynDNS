const axios = require('axios')
require('dotenv').config()

let currentIP = null

if (!process.env.DDNS_URL) throw 'Error: No DDNS_URL was defined.'

const checkIP = async () => {
  // console.log('Checking IP...')
  try {
    const ipRes = await axios.get('https://api.ipify.org?format=json')
    if (currentIP && ipRes.data.ip === currentIP) return //console.log('IP has not changed.')
    currentIP = ipRes.data.ip
    sendReq()
  } catch (err) {
    console.log(Date(), 'Error fetching IP: ' + err)
  }
}

const sendReq = async () => {
  try {
    const res = await axios.get(process.env.DDNS_URL)
    console.log(res.data)
    console.log(res.status)
    console.log(res.statusText)
    console.log(Date())
  } catch (err) {
    console.log(Date(), 'Error updating IP:' + err)
  }
}

checkIP()
setInterval(() => checkIP(), 1000 * (process.env.DDNS_CHECKING_INTERVAL || 60))

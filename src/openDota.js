import fetch from "./utils/fetch"

const ENDPOINT = "https://api.opendota.com/api"
const MATCHES = "matches"


export const getMatchInfo = async ({matchId}) => {
  try{
    const url = `${ENDPOINT}/${MATCHES}/${matchId}`
    const res = await axios.get(url)
    return res.data
  }catch(err){
    _("[getMatchInfo]", err.message, err.stack)
    return null
  }
}

export const getHighlightChunks = ({matchInfo}) => {
  const {objectives} = matchInfo
  // Based on objectives
  return objectives.map(({time}) => ({startTime: time - 5, endTime: time + 5}))
}
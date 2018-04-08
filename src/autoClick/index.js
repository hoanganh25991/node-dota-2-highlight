import * as autoClick from "robotjs"
import * as kb from "./constant"
import dota2 from "./dota-2"

const _ = console.log
const screenSize = autoClick.getScreenSize()
_("[screenSize]", screenSize)

const STEAM_APP = "steam"

const flatParams = paramObj => Object.values(paramObj)
const delay = time => new Promise(rsl => setTimeout(rsl, time))

const _moveMouse = autoClick.moveMouse.bind(autoClick)
autoClick.moveMouse2 = ({ left, top }) => _moveMouse(left, top)

const openSteam = async ({ matchId, chunks }) => {
  autoClick.keyTap(kb.WIN_KEY)
  autoClick.typeString(STEAM_APP)
  autoClick.keyTap("enter")

  await delay(500)
  autoClick.moveMouse2(dota2.playBtn)
  autoClick.mouseClick()

  await delay(500)
  autoClick.moveMouse2(dota2.playConfirmBtn)
  autoClick.mouseClick()

  await delay(10000)
  autoClick.moveMouse2(dota2.replayBtn)

  await delay(500)
  autoClick.moveMouse2(dota2.searchBar)

  await delay(500)
  autoClick.typeString(matchId)
}

openSteam({ matchId: "3820853613", chunks: [] }).then(console.log)

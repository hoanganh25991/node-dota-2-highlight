import * as autoClick from "robotjs"
import * as kb from "./constant"
import dota2 from "./dota-2"

const _ = console.log
const screenSize = autoClick.getScreenSize()
_("[screenSize]", screenSize)

const STEAM_APP = "steam"

const flatParams = paramObj => Object.values(paramObj)
const delay = time => new Promise(rsl => setTimeout(rsl, time))

// const _moveMouse = autoClick.moveMouse.bind(autoClick)
// autoClick.moveMouse2 = ({ left, top }) => _moveMouse(left, top)

const goTo = async ({ key, time = 500 }) => {
  _(`[INFO] Go to ${key}`)
  autoClick.moveMouse(...flatParams(dota2[key]))
  autoClick.mouseClick()
  await delay(time)
}

const openSteamApp = async () => {
  autoClick.keyTap(kb.WIN_KEY)
  autoClick.typeString(STEAM_APP)
  autoClick.keyTap("enter")
  await delay(500)
}

const openReplay = async ({ matchId, chunks }) => {
  await openSteamApp()

  await goTo({ key: "playBtn" })
  await goTo({ key: "playConfirmBtn", time: 10000 })
  await goTo({ key: "watchBtn" })
  await goTo({ key: "replayBtn" })
  await goTo({ key: "searchBar" })

  autoClick.typeString(matchId)
}

openReplay({ matchId: "3820853613", chunks: [] }).then(console.log)

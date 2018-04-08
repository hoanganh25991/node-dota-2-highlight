import * as autoClick from "robotjs"
import * as c from "./constant"
import dota2 from "./dota-2"
import { bitMapToBase64 } from "./bitmapToBase64"
import { cloudVision } from "./cloudVision"

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
  await autoClick.keyTap(c.WIN_KEY)
  await autoClick.typeString(STEAM_APP)
  await autoClick.keyTap("enter")
  await delay(500)
}

const checkShouldDownloadReplay = async () => {
  const { downloadReplayBtn } = dota2
  const bitmap = await autoClick.screen.capture(
    downloadReplayBtn.x,
    downloadReplayBtn.y,
    c.DOWNLOAD_REPLAY_BTN_WIDTH,
    c.DOWNLOAD_REPLAY_BTN_HEIGHT
  )

  const base64 = await bitMapToBase64(bitmap)
  const ocr = await cloudVision(base64)
  return ocr.toLowerCase().includes("download")
}

const pressNoBroadcaster = () => {
  const { noBroadCaster } = dota2
}

const openReplay = async ({ matchId, chunks }) => {
  await openSteamApp()

  await goTo({ key: "playBtn" })
  await goTo({ key: "playConfirmBtn", time: 10000 })
  await goTo({ key: "watchBtn" })
  await goTo({ key: "replayBtn" })
  await goTo({ key: "searchBar" })
  await autoClick.typeString(matchId)
  await goTo({ key: "pressSearch", time: 4000 })

  const shouldDownloadReplay = await checkShouldDownloadReplay()

  if (shouldDownloadReplay) {
    await goTo({ key: "downloadReplayBtn", time: 3500 })
  }

  await goTo({ key: "watchReplay" })
}

openReplay({ matchId: "3820853613", chunks: [] }).then(() => _("Finished"))

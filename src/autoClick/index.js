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

const clickOn = async ({ key, time = 500 }) => {
  _(`[INFO] Click on ${key}`)
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

const pressWatchReplay = async () => {
  if (await checkShouldDownloadReplay()) {
    await clickOn({ key: "downloadReplayBtn", time: 3500 })
  }

  await clickOn({ key: "watchReplay" })
}

const pressNoBroadcaster = async () => {
  await delay(7500)
  const { noBroadCaster: { x, y } } = dota2
  const step = -10
  let start = y
  while (start > 0) {
    await autoClick.moveMouse(x, start)
    await autoClick.mouseClick()
    start += step
  }
}

const closeWatchReplay = async () => {
  await clickOn({ key: "closeCaptainMode" })
  await clickOn({ key: "closeWatchReplay" })
  await clickOn({ key: "closeWatchReplayConfirm", time: 1000 })
  await clickOn({ key: "closeSteam" })
}

const openReplay = async ({ matchId, chunks }) => {
  await openSteamApp()
  await clickOn({ key: "playBtn" })
  await clickOn({ key: "playConfirmBtn", time: 7500 })

  await clickOn({ key: "watchBtn" })
  await clickOn({ key: "replayBtn" })
  await clickOn({ key: "searchBar" })
  await autoClick.typeString(matchId)
  await clickOn({ key: "pressSearch", time: 4000 })

  await pressWatchReplay()
  await pressNoBroadcaster()
  await closeWatchReplay()
}

openReplay({ matchId: "3820853613", chunks: [] }).then(() => _("Finished"))

import ioHook from "iohook"
import inquirer from "inquirer"
import fs from "fs"
import dota2 from "./dota-2"

const _ = console.log
const map = {}
const logMap = () => {
  const fileName = "src/autoClick/dota-2.js"
  const newMap = { ...dota2, ...map }
  const content = `export default ${JSON.stringify(newMap)}`
  _(JSON.stringify(newMap, null, 2))
  fs.writeFileSync(fileName, content)
}

const stopCb = keys => {
  console.log("Shortcut called with keys:", keys)
  ioHook.unregisterShortcut(stopListenPress)
  logMap()
  ioHook.unload()
  ioHook.stop()
}

const keyMapQuestion = { type: "input", name: "keyMap", message: "key map?" }

let waitKey = null

ioHook.on("mouseclick", async event => {
  if (waitKey) return
  const { x, y } = event
  waitKey = inquirer.prompt([keyMapQuestion])
  const { keyMap } = await waitKey
  _(`[INFO] Store ${keyMap} => (${x}, ${y})`)
  map[keyMap] = { x, y }
  waitKey = null
})

// Listen for Ctrl+S to stop
const stopListenPress = ioHook.registerShortcut([29, 31], stopCb)

ioHook.start(false)
// process.on("exit", logMap)
// process.on("SIGINT", logMap)

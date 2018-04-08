import ioHook from "iohook"
import inquirer from "inquirer"
import fs from "fs"

const _ = console.log
const map = {}
const logMap = () => {
  const fileName = "dota-2.json"
  fs.writeFileSync(fileName, _(JSON.stringify(map, null, 2)))
}

const stopCb = keys => {
  console.log("Shortcut called with keys:", keys)
  ioHook.unregisterShortcut(stopListenPress)
  logMap()
  ioHook.stop()
}

const keyMapQuestion = { type: "input", name: "keyMap", message: "key map?" }

let waitKey = null

// ioHook.on("mouseclick", async event => {
//   if (waitKey) return
//   const { x, y } = event
//   waitKey = inquirer.prompt([keyMapQuestion])
//   const { keyMap } = await waitKey
//   _(`[INFO] Store ${keyMap} => (${x}, ${y})`)
//   map[keyMap] = { x, y }
//   waitKey = null
// })

// Listen for Ctrl+S to stop
const stopListenPress = ioHook.registerShortcut([17, 83], stopCb)

ioHook.start(false)
// process.on("exit", logMap)
// process.on("SIGINT", logMap)

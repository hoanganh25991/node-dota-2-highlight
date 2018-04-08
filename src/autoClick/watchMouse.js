import ioHook from "iohook"
import inquirer from "inquirer"

const _ = console.log
const map = {}
const logMap = () => _(JSON.stringify(map, null, 2))
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

ioHook.start(false)
process.on("exit", logMap)
process.on("SIGINT", logMap)

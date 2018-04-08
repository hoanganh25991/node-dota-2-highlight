import * as autoClick from "robotjs"
import { bitMapToBase64 } from "../bitmapToBase64"
import { cloudVision } from "../cloudVision"
const _ = console.log
const bitmap = autoClick.screen.capture(0, 0, 256, 256)
;(async () => {
  try {
    const base64 = await bitMapToBase64(bitmap)
    const data = await cloudVision(base64)
    _(data)
  } catch (err) {
    _("[ERR]", err.message, err.stack)
  }
})()

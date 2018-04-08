import Jimp from "jimp"

export const bitMapToBase64 = bitmap => {
  const { width, height, byteWidth, bytesPerPixel, image } = bitmap
  const jimg = new Jimp(width, height)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = y * byteWidth + x * bytesPerPixel
      const r = image[index]
      const g = image[index + 1]
      const b = image[index + 2]
      const num = r * 256 + g * 256 * 256 + b * 256 * 256 * 256 + 255
      jimg.setPixelColor(num, x, y)
    }
  }

  return new Promise((resolve, reject) => {
    const mime = jimg.getMIME()
    // const timestamp = new Date().getTime()
    // jimg.write(`${timestamp}.png`)
    jimg.getBase64(mime, (err, base64) => {
      if (err) reject(err)
      const base64NoHeader = base64.replace(`data:${mime};base64,`, "")
      resolve(base64NoHeader)
    })
  })
}

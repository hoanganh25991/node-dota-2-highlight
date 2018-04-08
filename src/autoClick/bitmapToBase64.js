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
    jimg.getBuffer(mime, (err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}

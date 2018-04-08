import * as autoClick from "robotjs"
import fs from "fs"
import Jimp from "jimp"

const _ = console.log

const width = 1920
const height = 1080

const bitmap = autoClick.screen.capture(0, 0, width, height)
_(bitmap)
// _(bitmap.image.toString())
// const smallPiece = bitmap.image.slice(0, 8)
// _("[smallPiece]", smallPiece.toString())
// fs.writeFileSync("out.png", bitmap.image, {encoding: "base64"})
const path = "myfile.png"

// Create a new blank image, same size as Robotjs' one
// let jimg = new Jimp(width, height);
// for (let x=0; x<width; x++) {
//   for (let y=0; y<height; y++) {
//     // hex is a string, rrggbb format
//     const hex = bitmap.colorAt(x, y);
//     // Jimp expects an Int, with RGBA data,
//     // so add FF as 'full opaque' to RGB color
//     const num = parseInt(hex+"ff", 16)
//     // Set pixel manually
//     jimg.setPixelColor(num, x, y);
//   }
// }
// jimg.write(path)

const run = () => {
  console.time("run")
  const jimg = new Jimp(width, height)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = y * bitmap.byteWidth + x * bitmap.bytesPerPixel
      const r = bitmap.image[index]
      const g = bitmap.image[index + 1]
      const b = bitmap.image[index + 2]
      const num = r * 256 + g * 256 * 256 + b * 256 * 256 * 256 + 255
      jimg.setPixelColor(num, x, y)
    }
  }
  jimg.write(path)
  console.timeEnd("run")
}

const screenCaptureToFile = bitmap => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Jimp(bitmap.width, bitmap.height)
      let pos = 0
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        /* eslint-disable no-plusplus */
        image.bitmap.data[idx + 2] = bitmap.image.readUInt8(pos++)
        image.bitmap.data[idx + 1] = bitmap.image.readUInt8(pos++)
        image.bitmap.data[idx + 0] = bitmap.image.readUInt8(pos++)
        image.bitmap.data[idx + 3] = bitmap.image.readUInt8(pos++)
        /* eslint-enable no-plusplus */
      })
      resolve(image)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

const run2 = () => {
  console.time("run2")
  screenCaptureToFile(bitmap)
    .then(image => {
      image.write("myfile-2.png")
      console.timeEnd("run2")
    })
    .catch(err => _("[ERR]", err.message, err.stack))
}

run()
run2()

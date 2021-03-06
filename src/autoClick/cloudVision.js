import fetch from "../utils/fetch"

const _ = console.log

export const cloudVision = async base64 => {
  const options = {
    method: "POST",
    url: "https://vision.googleapis.com/v1/images:annotate",
    params: { key: "AIzaSyChJ1Bb-l1g_yuW4fmLJRlIoOnT7MyMtH8" },
    headers: { "Content-Type": "application/json" },
    data: {
      requests: [
        {
          image: { content: base64 },
          features: [{ type: "TEXT_DETECTION" }]
        }
      ]
    },
    json: true
  }

  const res = await fetch(options)
  const { responses: [firstResult] } = res.data
  const { fullTextAnnotation: { text } } = firstResult
  return text
}

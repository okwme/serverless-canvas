const { Image, createCanvas } = require('canvas')
const fs = require('fs')
require('dotenv').config()
const w = 553
const h = 311
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {

  try {
    const canvas = createCanvas(w, h)
    ctx = canvas.getContext('2d')
    canvas.width = w
    canvas.height = h
    await makeImg()
    var dataURL = await canvas.toDataURL("image/jpeg", 0.03)//0.01)
    return {
      statusCode: 200,
      headers: {
        'content-type': "image/jpeg",
      },
      body: dataURL.replace('data:image/jpeg;base64,', ''),
      isBase64Encoded: true
    }

    // const subject = event.queryStringParameters.name || 'Worlddddd'
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: `Hello ${subject}` }),
    //   // // more keys you can return:
    //   // headers: { "headerName": "headerValue", ... },
    //   // isBase64Encoded: true,
    // }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
  async function makeImg() {
    var drawing = new Image();
    return new Promise((resolve) => {

      var filename = `./test-image.jpeg`
      const data = fs.readFileSync(require.resolve(filename))
      const base64Image = Buffer.from(data, 'binary').toString('base64');
      const base64ImageStr = `data:image/${filename};base64,${base64Image}`;
      // console.log({ base64ImageStr })
      fs.writeFileSync('./test-image.txt', base64ImageStr);

      drawing.onload = function () {
        ctx.drawImage(drawing, 0, 0, w, h);
        resolve()
      };
      drawing.src = base64ImageStr
    })
  }
}




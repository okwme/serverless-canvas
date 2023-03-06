const { createCanvas } = require('canvas')
// require('dotenv').config()
var size = 1024
var gridSize = 32
var margin = 2

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {
  let circleSize, radius, offset, ctx

  try {
    const canvas = createCanvas(size, size)
    ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size
    await makeImg()
    var dataURL = canvas.toDataURL("image/jpeg", 1)//0.01)

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
    var grid = new Array(gridSize).fill([]).map(item => new Array(gridSize).fill(0))
    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, size, size);
    addNodes(grid)
  }

  function addNodes(grid) {
    circleSize = size / (gridSize + margin * 2)
    radius = circleSize / 10
    offset = margin * circleSize

    var sequence = Array.from(Array(grid.length * grid.length).keys())

    for (var i = 0; i < sequence.length; i++) {
      var row = Math.floor(sequence[i] / grid.length)
      var col = (sequence[i] % grid.length)
      var color = `rgba(0, 0, 0, 1)`
      makeNode(row, col, color)
    }
  }

  function makeNode(i, j, color) {
    var x = (i * circleSize) + (circleSize / 2) + offset;
    var y = (j * circleSize) + (circleSize / 2) + offset;
    ctx.fillStyle = color
    let rotate
    ctx.beginPath();

    // circle
    var startAngle = 0
    var endAngle = 2 * Math.PI
    var counterclockwise = 0
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.fill();
  }
}




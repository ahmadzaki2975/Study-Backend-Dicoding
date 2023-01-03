const fs = require('fs');

const streamReader = fs.createReadStream('F:/Repo/Study-Backend-Dicoding/FileStream/Input.txt', {highWaterMark: 15})
const streamWriter = fs.createWriteStream('F:/Repo/Study-Backend-Dicoding/FileStream/Output.txt');

streamReader.on('readable', () => {
  try {
    streamWriter.write(`[${streamReader.read()}] \n`);
  } catch (err) {
    console.log(err)
  }

})
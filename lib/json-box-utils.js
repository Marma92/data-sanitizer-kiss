const http = require('http')

/*
  Send the final @result to the jsonBox (@hostname for the host of the
  jsonBox + @path for its address)
  NOTE: here this method is using http because I used it on a local jsonBox,
    otherwise, it should be using https methods.
*/
const sendFinalResult = function (result, hostname, path){
  console.log (`${hostname},${path}`)
  data = JSON.stringify(result)
  console.log (data)

  const options = {
    hostname: hostname,
    port: 3000,
    path: `/${path}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(`statusMessage: ${res.statusMessage}`)
    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

module.exports = {sendFinalResult}
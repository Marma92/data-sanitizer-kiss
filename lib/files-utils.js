const https = require('https')
const fs = require('fs');


/*
  Create a @dir if it does not exist
*/
const createDirIfNeeded = function(dir){
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
}

/*
  Get a file from its @hostname and its @path,
  and store it in @storePath
*/
const getFile = function(hostname, path, storePath, callback){
  let data = [];
  const options = {
    hostname: hostname,
    port: 443,
    path: `/${path}`,
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', () => {
      console.log('Response ended: ');
      writeAFile(Buffer.concat(data).toString(), `${storePath}${path}`)
      callback()
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()
}

/*
  Write the @data of the file retrieved and store
  it in a given @path
*/
const writeAFile = function (data, path){
  fs.writeFileSync(path, data, {encoding:'utf-8'})
    console.log(`${path} written !`)
}

/*
  Compile all the files of the @inputPath
  in a given @outputFile
*/
const filesCompiler = function (inputPath, outputFile){
  files = fs.readdirSync(inputPath)
  let result = {}
  files.forEach((file) => {
    const objectName = file.replace('.json', '')
    data = fs.readFileSync(`${inputPath}/${file}`, "utf8")
    result[objectName] = JSON.parse(data)
  })
  fs.writeFileSync(outputFile, JSON.stringify({...result}))
}



module.exports = {createDirIfNeeded, getFile, filesCompiler, writeAFile}
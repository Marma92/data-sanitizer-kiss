const {dataBaseSanitizer} = require('./lib/data-utils')
const {getFile, filesCompiler, writeAFile, createDirIfNeeded} = require('./lib/files-utils')
const {sendFinalResult} = require('./lib/json-box-utils')

const conf = require('./conf.json')

const toFixDir = `${conf.dataDir}/tofix/`
const fixedDir = `${conf.dataDir}/fixed/`
const backupFile = `${fixedDir}backup.json`
const resultFile = `${fixedDir}result.json`

createDirIfNeeded(toFixDir)
createDirIfNeeded(fixedDir)
// You have to make a backup of each endpoint locally (one json file per endpoint),
getFile(conf.hostname, 'informations.json', toFixDir, () => {
  getFile(conf.hostname, 'jobs.json', toFixDir, () =>{
    getFile(conf.hostname, 'users.json', toFixDir, () => {
      // then compile them in one file,
      filesCompiler(toFixDir, backupFile)

      // sanitize the data,
      result = dataBaseSanitizer(backupFile)

      // store it locally
      writeAFile(JSON.stringify(result), resultFile)

      // and upload it on conf.jsonBox.
      // NOTE : A conf.jsonBox won't accept top-level keys beginning with '-' like in the given data sample.
      //    Without altering the conf.jsonBox's validator, or storing our entries wrapped in an object
      //    it is impossible to achieve this exercise.
      console.log(conf.jsonBox)
      sendFinalResult(result, conf.jsonBoxHost, conf.jsonBox)
    })
  })
})




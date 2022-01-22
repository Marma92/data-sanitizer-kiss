
/*
  Sanitize a @name
*/
const nameTranslator = function (name){
  const result = (name.replace(/4/g, 'a').replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e'))
  return result.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('-');

  //return result.charAt(0).toUpperCase() + result.slice(1);
}

/*
  Sanitize a @city
*/
const cityTranslator = function (city){
  const result = city.toLowerCase()
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/*
  Generic function to merge the given @dataName data from the same @key
  in @obj1 and @obj2
*/
const getData = function (obj1, obj2, key, dataName){
  if(obj1[key]){
      if (obj1[key][dataName])
      return obj1[key][dataName]
  }else if (obj2[key]){
      if (obj2[key][dataName])
      return obj2[key][dataName]
  }
  return null
}


/*
  Function to sanitize the data contained in the file
  at the @inputFile following these rules:
  - if user name is "#ERROR", you have to skip it and pick the name in another table
  - name vowels are replaced by numbers (e by 3, a by 4, i by 1 and o by 0)
  - cities are not written in a proper way (there are some letters in uppercase
    in the middle of the word, but they should only be at the beginning)
  - You have to delete all null or undefined fields in the sanitize format
  - Some informations like name are injected in the bad table, so you've to sort them :
      - always take the name in users, and if missing, pick it in an other table if available
      - always take the age in informations, and if missing, pick it in an other table
*/
const dataBaseSanitizer = function (inputFile){
  const buData = require(`../${inputFile}`)
  result = {}

  Object.keys(buData.users).map(key =>{
    //define name
    let name
    buData.users[key].name === '#ERROR'
    ?
    name = nameTranslator(buData.jobs[key].name)
    :
    name = nameTranslator(buData.users[key].name)

    //define the other infos
    const job = getData(buData.jobs, buData.informations, key, 'job')
    const age = getData(buData.informations, buData.jobs, key, 'age')
    const city = getData(buData.informations, buData.jobs, key, 'city')

    result[key] = {
      name : name,
      job : job,
    }

    if(age) result[key].age = age
    if(city) result[key].city = cityTranslator(city)
  })
  return result
}





module.exports = {dataBaseSanitizer}
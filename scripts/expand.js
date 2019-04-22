import { parse } from './'

export const expand = (name, i, j, fields, dataObject) => {
  let data
   dataObject['__schema'].types.map(type => {
    if (type.name == name.replace('!','')){
      console.log('type', type)
      let partA = []
      let partB = ['  ']
      fields[i].forEach((d, index) =>{
        if (index < j){
          partA.push(d)
        }
        if (index == j){
          partA.push('{')
          partB.push('}')
        }
        if (index > j){
          partB.push(d)
        }
      })
      let parsedType = parse(type, 2)
      let processed = parsedType.map((row, offset) =>
        row.map(chunk => {
          return {
            text: chunk,
            collapse: {
              name: type.name,
              chunkPosition: j,
              offset: offset,
              length: parsedType.length
            }
          }
        })
      )
      let newArray = [...fields.slice(0,i), partA, ...processed, partB, ...fields.slice(i+1)]
      data = newArray
    }
  })
  return data || fields
}

export const collapse = (args, fields, i) => {
  const { name, chunkPosition,  offset, length } = args
  let collapsed = fields
  let targetRow = i - offset -1
  let targetEndRow = targetRow + length + 1
  let partA = collapsed[targetRow]
  partA[chunkPosition] = name
  let partB = collapsed[targetEndRow].slice(2)
  let newArray = [...fields.slice(0,targetRow), partA.concat(partB), ...fields.slice(targetEndRow + 1)]

  return(newArray)
}

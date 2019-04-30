const indentations = n => {
  let indentation = ''
  let indentationCount = n || 1
  let indentationDepth = '  '
  Array(indentationCount).fill().forEach(() => {
    indentation = indentation + indentationDepth
  })
  return indentation
}

const parser = {
  0: (type, n) => type.fields.map(field => {
    let args = []
    let chunks = []
    chunks.push(indentations(n) + field.name)
    field.args.map(arg => {
      let status = arg.type.kind == "NON_NULL" ? '!': ''
      let input = arg.type.ofType ? arg.type.ofType.name + status : arg.type.name
      args.push(arg.name)
      args.push(': ')
      args.push(input)
    })
    if (args.length){
      chunks.push('(')
      args.map((d, i) => {
        chunks.push(d)
        if(((i+1) % 3 == 0) && (i + 1) !== args.length){
          chunks.push(', ')
        }
      })
      chunks.push(')')
    }
    let output = field.type.name ? field.type.name : field.type.ofType.name
    if (field.type.kind == "LIST"){
      output = '[' + output + ']'
    }
    chunks.push(': ')
    chunks.push(output)
    return chunks
  }),
  1: (type, n) => type.inputFields.map(inputfield => {
    let args = []
    let chunks = []
    chunks.push(indentations(n) + inputfield.name)
    let output = inputfield.type.ofType ? inputfield.type.ofType.name : inputfield.type.name
    if (inputfield.type.kind == "LIST"){
      output = '[' + output + ']'
    }
    chunks.push(': ')
    chunks.push(output)
    return chunks
  }),
  catch: (type) => null
}

const options = ['fields', 'inputFields']

const selector = type => {
  let parser = 'catch'
  options.forEach((option, i) =>{
    if (type[option]){
      parser = i
    }
  })
  return parser
}

export const parse = (type, n) => {
  return parser[selector(type)](type,n)
}

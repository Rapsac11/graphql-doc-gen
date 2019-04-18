export const parse = type => {

  const parser = {
    0: () => type.fields.map(field => {
      let args = []
      field.args.map(arg => {
        let status = arg.type.kind == "NON_NULL" ? '!': ''
        let input = arg.type.ofType ? arg.type.ofType.name + status : arg.type.name
        let argString = arg.name + ': ' + input
        args.push(argString)
      })
      let inputs = args.length ? '(' + args.join(", ") + ')' : ''
      let output = field.type.name ? field.type.name : field.type.ofType.name
      if (field.type.kind == "LIST"){
        output = '[' + output + ']'
      }
      let string = '  ' + field.name + inputs + ': ' + output
      return string
    }),
    1: () => type.inputFields.map(inputfield => {
      let output = inputfield.type.ofType ? inputfield.type.ofType.name : inputfield.type.name
      if (inputfield.type.kind == "LIST"){
        output = '[' + output + ']'
      }
      let string = '  ' + inputfield.name + ': ' + output
      return string
    }),
    catch: () => null
  }

  const options = ['fields', 'inputFields']

  const selector = () => {
    let parser = 'catch'
    options.forEach((option, i) =>{
      if (type[option]){
        parser = i
      }
    })
    return parser
  }

  return parser[selector()]()
}

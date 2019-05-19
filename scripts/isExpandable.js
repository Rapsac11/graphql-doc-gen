export const isExpandable = (name, dataObject) => {
   return dataObject['__schema'].types.some(type => {
     if(type.name == name.replace('!','')){
       return true
     }
  })
  return false
}

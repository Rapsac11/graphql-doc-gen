require("@babel/register")
import fetch from "node-fetch"
import fs from 'fs'
import { template } from '../src/util/page_template.js'
import { baseTypes } from '../src/util/constants/baseTypes.js'

const endpoint = process.argv[2]

function a(endpoint){

  console.log('fetching endpoint data from: ', endpoint)

  let fetches = [
    {
      url: endpoint,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `
          {
            __schema {
              queryType {
                name
              }
              mutationType {
                name
              }
              types {
                name
                inputFields{
                  name
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                }
                fields {
                  name
            			args {
                    name
                    type {
                      name
                      kind
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                          ofType {
                            kind
                            name
                          }
                        }
                      }
                    }
                  }
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                }
              }
            }
          }
        `
        })
      }
    }
  ]
  Promise.all(fetches.map(item=>fetch(item.url, item.options)))
  .then(responses =>
    Promise.all(responses.map(res => res.json()))
  ).then(texts => {
    let generatedFolder = "src/pages/generated"
    if (!fs.existsSync(generatedFolder)){
        fs.mkdirSync(generatedFolder)
    }
    let queryMutationTypes = fs.createWriteStream('src/util/constants/queryMutationTypes.js')
    queryMutationTypes.once('open', function(fd) {
      queryMutationTypes.write(`export const queryTypeName = '${texts[0].data['__schema'].queryType.name}'` + '\n')
      queryMutationTypes.write(`export const mutationTypeName = '${texts[0].data['__schema'].mutationType.name}'`)
      queryMutationTypes.end()
    })
    texts[0].data['__schema'].types.map(type => {
      let stream = fs.createWriteStream('src/pages/generated/' + type.name.replace(/_/g, "") + '.js');
      stream.once('open', function(fd) {
        stream.write(
          template(
            JSON.stringify(type),
            type.name
          )
        );
        stream.end()
      })
    })
    let filteredData = texts[0]
    filteredData.data['__schema'].types = filteredData.data['__schema'].types.filter(type => !baseTypes.includes(type.name))
    let dataObjectStream = fs.createWriteStream('src/util/dataObject.js')
    dataObjectStream.once('open', function(fd) {
      dataObjectStream.write('export default')
      dataObjectStream.write(JSON.stringify(filteredData.data))
      dataObjectStream.end()
    })
  })
}

a(endpoint)

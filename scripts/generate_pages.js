require("@babel/register");
import fetch from "node-fetch"
import fs from 'fs'
import { template } from '../src/util/page_template.js'

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
    texts[0].data['__schema'].types.map(type => {
      let generatedFolder = "src/pages/generated"
      if (!fs.existsSync(generatedFolder)){
          fs.mkdirSync(generatedFolder)
      }
      let stream = fs.createWriteStream('src/pages/generated/' + type.name.replace(/_/g, "") + '.js');
      stream.once('open', function(fd) {
        stream.write(
          template(
            JSON.stringify(type),
            type.name
          )
        );
        stream.end();
      })
    })
    let dataObjectStream = fs.createWriteStream('src/util/dataObject.js');
    dataObjectStream.once('open', function(fd) {
      dataObjectStream.write('export default');
      dataObjectStream.write(JSON.stringify(texts[0].data));
      dataObjectStream.end();
    })
  })
}

a(endpoint)

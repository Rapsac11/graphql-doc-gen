import React, { useState, useContext, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import Button from '@material-ui/core/Button'
import { QueryDispatchContext, QueryTextResponseContext, QueryResponseResponseContext } from '../reducers'

const objectText = {
  fontFamily: 'monospace, monospace',
  overflowY: 'scroll',
  height: `calc(100% - 50px)`
}

const header = {
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  color: 'rgba(0, 0, 0, 0.5)',
  height: '40px',
  paddingTop: '20px',
  paddingLeft: '10px',
  marginRight: '24px',
  display: 'flex',
  justifyContent: 'space-between'
}

const mockedHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9UTXhNVEZGUVVORE56TXpRakZFTkVKRk9UbENNakUwUlVVNU1rTkVSRVJET1RFeE16TkNNQSJ9.eyJodHRwOi8vYXV0aHouYXJ1cC5kaWdpdGFsL2F1dGhvcml6YXRpb24iOnsiZ3JvdXBzIjpbIkJIV1AiLCJQT1JUQUwiXSwicm9sZXMiOltdLCJwZXJtaXNzaW9ucyI6W119LCJodHRwOi8vdXNlcm1ldGEuYXJ1cC5kaWdpdGFsL3VzZXJfbWV0YWRhdGEiOnsiZGF0YWJhc2VfYWNjZXNzIjoiYXJ1cCJ9LCJpc3MiOiJodHRwczovL2FydXBkaWdpdGFsLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJ3YWFkfGlYblQ5ZFhUeVVpTl9pem5zSlFBM3J0eW1UZGJ4Xy1ySnVIM2J4VEdreUEiLCJhdWQiOiJoNDdSaW1yUnUwWUdhRTBBWFhNSjJyc3FZN25zVXY1QSIsImlhdCI6MTU1NjQzOTYwOSwiZXhwIjoxNTU2NDc1NjA5LCJhdF9oYXNoIjoiWW1HcVdhQ3YyWjdTeGFtWGFBYzl3dyIsIm5vbmNlIjoidGlwOTlrM2V1ZmpjeU1Oakpkd0dOMTYwLU5wU1A3dTEifQ.RCB0DSZB2r5r9b5uqL1XAX3uyPi-tPAwy67PCMt0aU5fFVm-XM8btXWzx1lyBFm8bGH4e8ZtiZPJjOvkuhDvLvp4wJL8gp8DcZpX2jUao3lv0QMcOxblB0JoMo37G_g3Vk_ncvz-LYdtEs96GxRnH8BjuTm12S2hitsTULmLjUscPHfyZhRxlFURZ2isg9TmkbRJArQPRDRweiC-gtrw0T9zunnH6_aSqORNYfHIWqTbPVOhjCtbV8A0szwvERui1b1P9XvHeTc5nvddD5e6v0CfLVUXIUUZbbwBo-BbOxdtFCmHB3dBLacB_KEYtQpzEsYvLJg_iXAHFEQjU6PD2w"
}


export default props => {
  const dispatch = useContext(QueryDispatchContext)
  const queryTextResponse = useContext(QueryTextResponseContext)
  const queryResponseResponse = useContext(QueryResponseResponseContext)
  const [code, setCode] = useState(`myQueryName($url: String!){
  assignableUserList(url: $url){
    name
  }
}`)

useEffect(() => {
  if (queryTextResponse){
    setCode(queryTextResponse)
  }
}, [queryTextResponse])

const graphqlFetch = (query, headers, variables) =>{
  let url = "https://tests-a1.map-staging.arup.digital/"
  fetch('https://portal-staging.arup.digital/graphql', {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: `query ${query}`
    })
  })
    .then(d => d.json())
    .then(d => {
      dispatch(d)
    })
}

  const main = {
    height: `calc(100% - 150px)`
  }

  return (
    <div style={main}>
      <div style={header}>
        <span>GraphQL</span>
        <Button
          key='run'
          variant="contained"
          color="secondary"
          size='small'
          onClick={() => graphqlFetch(code,mockedHeaders,queryResponseResponse.current.props.value)}
          style={{
            padding: '0px'
          }}
        >
        Run
      </Button>
      </div>
      <div style={objectText}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => code}
          padding={10}
          style={{
            fontFamily: 'monospace, monospace',
            fontSize: 16,
          }}
        />
      </div>
    </div>
  )
}

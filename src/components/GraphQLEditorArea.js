import React, { useState, useContext, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import SettingsIcon from '@material-ui/icons/Settings'
import Popover from '@material-ui/core/Popover'
import { makeStyles, useTheme } from '@material-ui/styles'
import GraphQLSettings from './GraphQLSettings.js'
import { QueryDispatchContext, QueryTextResponseContext, QueryResponseResponseContext } from '../reducers'

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 20,
    marginLeft: '5px'
  },
  header: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    color: 'rgba(0, 0, 0, 0.5)',
    height: '40px',
    paddingTop: '20px',
    paddingLeft: '10px',
    marginRight: '24px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  objectText: {
    fontFamily: 'monospace, monospace',
    overflowY: 'scroll',
    height: `calc(100% - 50px)`
  },
  nameAndIcon: {
    display: 'flex',
    alignItems: 'center'
  }
}))


const mockedHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9UTXhNVEZGUVVORE56TXpRakZFTkVKRk9UbENNakUwUlVVNU1rTkVSRVJET1RFeE16TkNNQSJ9.eyJodHRwOi8vYXV0aHouYXJ1cC5kaWdpdGFsL2F1dGhvcml6YXRpb24iOnsiZ3JvdXBzIjpbIkJIV1AiLCJQT1JUQUwiXSwicm9sZXMiOltdLCJwZXJtaXNzaW9ucyI6W119LCJodHRwOi8vdXNlcm1ldGEuYXJ1cC5kaWdpdGFsL3VzZXJfbWV0YWRhdGEiOnsiZGF0YWJhc2VfYWNjZXNzIjoiYXJ1cCJ9LCJpc3MiOiJodHRwczovL2FydXBkaWdpdGFsLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJ3YWFkfGlYblQ5ZFhUeVVpTl9pem5zSlFBM3J0eW1UZGJ4Xy1ySnVIM2J4VEdreUEiLCJhdWQiOiJoNDdSaW1yUnUwWUdhRTBBWFhNSjJyc3FZN25zVXY1QSIsImlhdCI6MTU1NjYyOTE1MiwiZXhwIjoxNTU2NjY1MTUyLCJhdF9oYXNoIjoib0MxUkN3TWVscmMybkVFdUhmQ3ZSUSIsIm5vbmNlIjoiZ3lnLkl3bUtLN0swSEpVTzlyZlE2Nmt6ems1ZEhafloifQ.EjYa5QNAqcoOND34KSya8Ae2NQTwb8x1dzDZ36VNlHZs94cnJXDX8gIamnqo82JiFm9x3Z0tiIVtJx6-7Sn9d3K82EYVM9uQz0ocVkmM2lCzx-fTLJskcz0wxcLb1VOrl1k5-X4Cdq7slscb9lMmZVvQKJZmJuzTUpe-bR4sWgu95T0NEGrB-J11avPx5C2_eVQ5f-2yWJaRePvEtI2zOkr0oS9YoLUcxvFOIqAyYQdPKQxKMKmE37hiDd-h0omVBdWHcZWBXISWokxAAb566GfGOuT-W9jpPXvNgx3ljDkh58p1kN-4rGWxAv3EB_zHU6ghQH-AZQHaC7xWo5c_oQ"
}

export default props => {
  const classes = useStyles()
  const dispatch = useContext(QueryDispatchContext)
  const queryTextResponse = useContext(QueryTextResponseContext)
  const queryResponseResponse = useContext(QueryResponseResponseContext)
  const [popAnchor, setPopAnchor] = useState(null)
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

  const graphqlFetch = (upperCaseType, query, headers, variables) => {
    let lowerCaseType = upperCaseType.charAt(0).toLowerCase() + upperCaseType.slice(1)
    let url = "https://tests-a1.map-staging.arup.digital/"
    fetch('https://portal-staging.arup.digital/graphql', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: `${lowerCaseType} ${query}`,
        variables: JSON.parse(variables)
      })
    })
      .then(d => d.json())
      .then(d => {
        dispatch(d)
      })
  }

  const main = {
    height: `calc(100% - 200px)`
  }

  return (
    <div style={main}>
      <div className={classes.header}>
        <div className={classes.nameAndIcon}>
          <span>GraphQL</span>
          <SettingsIcon
            className={classes.icon}
            onClick={e => setPopAnchor(e.currentTarget)}
            />
            <Popover
            id="simple-popper"
            open={!!popAnchor}
            anchorEl={popAnchor}
            onClose={() => setPopAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          ><GraphQLSettings
            mockedHeaders={mockedHeaders}
            code={code}
            />
          </Popover>
        </div>
        <Button
          key='run'
          variant="contained"
          color="secondary"
          size='small'
          onClick={() => graphqlFetch(props.name,code,mockedHeaders,queryResponseResponse.current.props.value)}
          style={{
            padding: '0px'
          }}
        >
        Run
      </Button>
      </div>
      <div className={classes.objectText}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => code}
          padding={10}
          style={{
            fontFamily: 'monospace, monospace',
            fontSize: 14,
          }}
        />
      </div>
    </div>
  )
}

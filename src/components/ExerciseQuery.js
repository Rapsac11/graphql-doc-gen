import React, { useState, useReducer } from 'react'
import QueryEditorBlade from './QueryEditorBlade'
import QueryResponseBlade from './QueryResponseBlade'
import { QueryReducer, QueryDispatchContext, QueryResponseContext } from '../reducers'
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

const main = {
  height: `calc(100% - 64px)`,
  display: 'flex'
}

const returnButtonContainer = {
  width: '10px',
  marginRight: '24px'
}

const returnButton = {
  height: '100%',
  padding: '0px',
  minWidth: '10px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ccc'
}

const left = {
  borderRight: '0px solid rgba(0, 0, 0, 0.12)',
  width: 'calc(50% - 17px)',
  height: '100%'
}

const right = {
  width: 'calc(50% - 17px)',
  height: '100%',
  paddingLeft: '14px',
  backgroundColor: '#eaeaea',
  borderRadius: '10px'
}

export default props => {
  const [response, dispatch] = useReducer(QueryReducer);

  return (
    <QueryDispatchContext.Provider value={dispatch}>
      <QueryResponseContext.Provider value={response}>
        <div style={main}>
          <div style={returnButtonContainer}>
            <Button style={returnButton}>
              <ChevronLeft />
            </Button>
          </div>
          <div style={left}>
            <QueryEditorBlade />
          </div>
          <div style={right}>
            <QueryResponseBlade />
          </div>
        </div>
      </QueryResponseContext.Provider>
    </QueryDispatchContext.Provider>
  )
}

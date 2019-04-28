import React, { useState, useReducer } from 'react'
import QueryEditorBlade from './QueryEditorBlade'
import QueryResponseBlade from './QueryResponseBlade'
import { QueryReducer, QueryDispatchContext, QueryResponseContext } from '../reducers'

const main = {
  height: `calc(100% - 64px)`,
  display: 'flex'
}

const left = {
  borderRight: '0px solid rgba(0, 0, 0, 0.12)',
  width: '50%',
  height: '100%'
}

const right = {
  width: '50%',
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

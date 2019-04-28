import React, { useState } from 'react'
import QueryEditorBlade from './QueryEditorBlade'
import QueryResponseBlade from './QueryResponseBlade'

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
  return (
    <div style={main}>
      <div style={left}>
        <QueryEditorBlade />
      </div>
      <div style={right}>
        <QueryResponseBlade />
      </div>
    </div>
  )
}

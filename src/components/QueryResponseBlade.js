import React, { useState } from 'react'
import ResponseEditorArea from './ResponseEditorArea'

const main = {
  height: '100%'
}

export default props => {

  return (
    <div style={main}>
      <ResponseEditorArea/>
    </div>
  )
}

import React, { useState } from 'react'
import EditorArea from './EditorArea'

const main = {
  height: '100%'
}

export default props => {

  return (
    <div style={main}>
      <EditorArea
        headerText="Response"
        />
    </div>
  )
}

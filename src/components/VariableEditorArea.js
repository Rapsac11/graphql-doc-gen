import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import Button from '@material-ui/core/Button'

const objectText = {
  fontFamily: 'monospace, monospace',
  overflowY: 'scroll',
  height: `calc(100% - 50px)`
}

const header = {
  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  color: 'rgba(0, 0, 0, 0.5)',
  height: '40px',
  paddingTop: '20px',
  paddingLeft: '10px',
  marginRight: '24px',
  display: 'flex'
}

export default props => {
  const [code, setCode] = useState(``)

  const main = {
    height: '150px'
  }

  return (
    <div style={main}>
      <div style={header}>
        <span>Variables</span>
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

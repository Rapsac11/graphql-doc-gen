import React, { useState } from 'react'
import Editor from 'react-simple-code-editor';

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
  marginRight: '24px'
}

const headerBorder = {
  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  color: 'rgba(0, 0, 0, 0.5)',
  height: '40px',
  paddingTop: '20px',
  paddingLeft: '10px',
  marginRight: '24px'
}

export default props => {
  const [code, setCode] = useState(props.defaultValue || ``)

  const getHeight = () => {
    if (props.height){
      return `${props.height}px`
    } else if (props.heightOffset){
      return `calc(100% - ${props.heightOffset}px)`
    } else {
      return '100%'
    }
  }

  const main = {
    height: getHeight()
  }

  return (
    <div style={main}>
      <div style={props.headerBorder ? headerBorder : header}>
        {props.headerText}
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

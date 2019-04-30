import React from 'react'
import Editor from 'react-simple-code-editor'

export default props => {

  const content = props.content
  return (
    <Editor
      value={content}
      onValueChange={() => {}}
      highlight={content => content}
      padding={10}
      style={{
        fontFamily: 'monospace, monospace',
        fontSize: 14,
      }}
    />
  )
}

import React, { useState } from 'react'
import GraphQLEditorArea from './GraphQLEditorArea'
import VariableEditorArea from './VariableEditorArea'

const main = {
  height: '100%'
}

const span = name => <span key={name}>{name}</span>

export default props => {

  return (
    <div style={main}>
      <GraphQLEditorArea
        name={props.name}
        />
      <VariableEditorArea
        height={150}
        headerElements={[span("Variables")]}
        headerText="Variables"
        headerBorder
        />
    </div>
  )
}

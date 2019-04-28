import React, { useState } from 'react'
import EditorArea from './EditorArea'

const main = {
  height: '100%'
}

export default props => {

  return (
    <div style={main}>
      <EditorArea
        heightOffset={150}
        headerText="GraphQL"
        defaultValue={`{
  assignableUserList(url: "https://tests-a1.map-staging.arup.digital/"){
    name
  }
}`}
        />
      <EditorArea
        height={150}
        headerText="Variables"
        headerBorder
        />
    </div>
  )
}

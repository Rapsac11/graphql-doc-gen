import React, { useState, useReducer } from 'react'
import QueryEditorBlade from './QueryEditorBlade'
import QueryResponseBlade from './QueryResponseBlade'
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

const main = {
  height: '100%',
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

  return (
    <div style={main}>
      <div style={returnButtonContainer}>
        <Button style={returnButton} onClick={() => props.setChecked(true)}>
          <ChevronLeft />
        </Button>
      </div>
      <div style={left}>
        <QueryEditorBlade name={props.name}/>
      </div>
      <div style={right}>
        <QueryResponseBlade />
      </div>
    </div>
  )
}

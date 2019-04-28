import React, { useRef, useEffect } from 'react'

const main = {
  display: 'flex',
}

const rowNumberStyle = {
  width: '20px',
  color: 'rgba(0, 0, 0, 0.5)'
}

const rowTextStyle = {
  fontFamily: 'monospace, monospace',
  fontSize: '16px',
  border: 'none',
  padding: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0)'
}

export default props => {
  const inputEl = useRef(null);

  useEffect(() => {
    if (props.i == props.focussed) {
      inputEl.current.focus();
    }
  }, [props.focussed]);

  const edit = e => {
    props.updateRow(props.dataSet, props.i, e.target.value)
  }

  const changeLine = e => {
    console.log(e.keyCode)
    if (e.keyCode === 38){
      props.changeLine(props.i-1)
    }
    if (e.keyCode === 40 || e.keyCode === 16){
      props.changeLine(props.i+1)
    }
  }

  return (
    <div style={main}>
      <div style={rowNumberStyle}>{props.i+1}</div>
      <input
        ref={inputEl}
        style={rowTextStyle}
        onChange={e => edit(e)}
        value={props.text}
        onKeyDown={e => changeLine(e)}
        >
      </input>
    </div>
  )
}

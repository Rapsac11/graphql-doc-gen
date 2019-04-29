import React, { useState, useContext } from 'react'
import { parse, expand, collapse } from '../../scripts'
import dataObject from '../util/dataObject'
import { QueryTextDispatchContext } from '../reducers'

const whiteSpacePre = {
  whiteSpace: 'pre-wrap'
}

const hoveredWhiteSpacePre = {
  whiteSpace: 'pre-wrap',
  backgroundColor: '#CCC'
}

const objectText = {
  fontFamily: 'monospace, monospace'
}

const textLine = {
  display: 'flex',
  alignItems: 'center',
  height: '40px'
}

const hoveredTextLine = {
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  backgroundColor: '#CCC'
}

const convertToQuery = lineArray => {
  let string = '{&#13;&#10;'
  lineArray.some(chunk =>{
    if (chunk != '['){
      string = string + chunk
    }
    return chunk == ')'
  })
  return string + '&#13;&#10;}'
}

export default props => {
  const { type } = props
  const queryTextDispatch = useContext(QueryTextDispatchContext)
  const [fields, updateFields] = useState(parse(type, 1))
  const [hovering, setHovering] = useState('')

  const hovered = row => {
    return (typeof hovering == 'object' && hovering) ? (row > hovering[0]+0.99 && row < hovering[1]) : row == hovering
  }

  return (
    <div style={objectText}>
      <div style={textLine}>
        <span style={whiteSpacePre}>{"Type Query {"}</span>
      </div>
      {
        fields && fields.map((textRow, i) =>
          <div
          key={i}
          style={ hovered(i) ? hoveredTextLine : textLine}
          onClick={() => {
            if(typeof fields[i][0] !== 'string'){
              updateFields(collapse(fields[i][0].collapse, fields, i))
              setHovering(null)
            } else {
              if(hovered(i)){
                queryTextDispatch(convertToQuery(textRow))
                props.setChecked(false)
              }
            }
          }}
          onMouseEnter={() => setHovering(
            fields[i][0].collapse ? [
              i-fields[i][0].collapse.offset-1,
              i+fields[i][0].collapse.length-fields[i][0].collapse.offset,
            ] : i
          )}
          onMouseLeave={() => setHovering(null)}
          >
          {
            textRow.map((chunk, j) => {
              let item, args, clickFunction
              if (typeof chunk == 'string'){
                item = chunk
                args = [item, i, j, fields, dataObject]
                clickFunction = expand
              } else {
                item = chunk.text
                args = [chunk.collapse, fields, i]
                clickFunction = collapse
              }
                return <span
                  key={j + 'span'}
                  style={ hovered(i + '.' + j) ? hoveredWhiteSpacePre : whiteSpacePre}
                  onClick={() => {
                      updateFields(clickFunction(...args))
                  }}
                  onMouseEnter={() => setHovering(i + '.' + j)}
                  onMouseLeave={() => setHovering(i)}
                  >
                  {item}
                </span>
              })
            }
          </div>
        )
      }
      <div style={textLine}>
        <span style={whiteSpacePre}>{"}"}</span>
      </div>
    </div>
  )
}

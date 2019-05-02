import React, { useState, useContext } from 'react'
import { parse, expand, collapse } from '../../scripts'
import dataObject from '../util/dataObject'
import { QueryTextDispatchContext } from '../reducers'
import { baseTypes } from '../util/constants.js'

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

const hoveredTextLineBlue = {
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  backgroundColor: '#3f51b5'
}

const convertToQuery = lineArray => {
  let hasVariables = 'maybe'
  let variables = 'myQueryName('
  let string = '{' + `
`
  let nextChunkIsVariable = false
  lineArray.some((chunk, i) =>{
    if(chunk === '('){
      hasVariables = true
    }
    if(chunk === ': ' && hasVariables === 'maybe'){
      hasVariables = false
      return true
    }
    if(nextChunkIsVariable){
      let variableChunk = '$' + lineArray[i-2].replace("!","")
      let variableChunkType = baseTypes.includes(variableChunk) ? lineArray[i-2] : chunk
      string = string + variableChunk
      if (variables !== 'myQueryName('){
        variableChunk = ', ' + variableChunk
      }
      variables = variables + variableChunk + ': ' + variableChunkType
      nextChunkIsVariable = false
    } else {
      string = string + chunk
    }
    if(chunk === ': '){
      nextChunkIsVariable = true
    }
    return chunk === ')'
  })
  let query = string + `
` + '}'
  return hasVariables ? variables + ')' + query : query
}

export default props => {
  const { type } = props
  const queryTextDispatch = useContext(QueryTextDispatchContext)
  const [fields, updateFields] = useState(parse(type, 1))
  const [hovering, setHovering] = useState('')

  const hovered = row => {
    return (typeof hovering == 'object' && hovering) && (row > hovering[0]+0.99 && row < hovering[1]) ? 'gray' : row == hovering ? 'blue' : false
  }

  return (
    <div style={objectText}>
      <div style={textLine}>
        <span style={whiteSpacePre}>{"Type " + props.name + " {"}</span>
      </div>
      {
        fields && fields.map((textRow, i) =>
          <div
          key={i}
          style={ hovered(i) == 'gray' ? hoveredTextLine : hovered(i) == 'blue' ? hoveredTextLineBlue : textLine }
          onClick={() => {
            if(typeof fields[i][0] !== 'string'){
              updateFields(collapse(fields[i][0].collapse, fields, i))
              setHovering(null)
            } else {
              if(hovered(i)){
                if(textRow[1] !== '}'){
                  queryTextDispatch(convertToQuery(textRow))
                  props.setChecked(false)
                }
              }
            }
          }}
          onMouseEnter={() => {
            setHovering(
            fields[i][0].collapse ? [
              i-fields[i][0].collapse.offset-1,
              i+fields[i][0].collapse.length-fields[i][0].collapse.offset,
            ] : i
          )}}
          onMouseLeave={() => {
            setHovering(null)}}
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
                  style={ hovered(i + '.' + (j+1)) ? hoveredWhiteSpacePre : whiteSpacePre}
                  onClick={() => {
                      updateFields(clickFunction(...args))
                  }}
                  onMouseEnter={() =>setHovering(i + '.' + (j+1))}
                  onMouseLeave={() => {
                    if (typeof chunk !== 'object'){
                      setHovering(i)
                    }
                  }}
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

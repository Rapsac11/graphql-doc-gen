import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ExportEditorArea from './ExportEditorArea'
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/styles'

const container = {
  padding: 8 * 3
}

const objectText = {
  fontFamily: 'monospace, monospace',
  overflowY: 'scroll',
  height: `300px`
}

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  textFieldLeft: {
    marginRight: '24px',
    width: '350px'
  },
  textFieldRight: {
    width: '100%'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default props => {
  const classes = useStyles()
  const [values, setValues] = React.useState([['','']]);

  const updateField = (index, input, e) => {
    values[index][input] = e.target.value
    setValues([...values])
  }

  return (
    <div style={getModalStyle()} className={classes.paper}>
      <div className={classes.root}>
        <Typography component="div" style={container}>
          <div style={objectText}>
            {values.map((entry, i) =>
              <div className={classes.row} key={i}>
                <TextField
                  key={i+"a"}
                  label="Header"
                  className={classes.textFieldLeft}
                  value={entry[0]}
                  onChange={e => updateField(i, 0, e)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  key={i+'b'}
                  label="Value"
                  className={classes.textFieldRight}
                  value={entry[1]}
                  onChange={e => updateField(i, 1, e)}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            )}
          </div>
          <div>
            <Typography component="div">
              <Button
                key='run'
                color="secondary"
                size='small'
                onClick={() => setValues([...values, ['','']])}
              >
              Add new header
            </Button>
            </Typography>
          </div>
        </Typography>
      </div>
    </div>
  )
}

import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExportEditorArea from './ExportEditorArea'
import { makeStyles, useTheme } from '@material-ui/styles'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default props => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  let jsContent = `fetch('https://portal-staging.arup.digital/graphql', {
  method: "POST",
  headers: ${JSON.stringify(props.data[2])},
  body: JSON.stringify({
    query: ${props.data[0]} ${props.data[1]},
    variables: JSON.parse(variables)
  })
})`

  return (
    <div style={getModalStyle()} className={classes.paper}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="JavaScript" />
            <Tab label="cURL" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
          <div style={objectText}><ExportEditorArea content={jsContent}/></div>
        </TabContainer>}
        {value === 1 && <TabContainer>
          <div style={objectText}><ExportEditorArea content=''/></div>
        </TabContainer>}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SettingsIcon from '@material-ui/icons/Settings'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/styles'
import ExportModalContent from './ExportModalContent.js'
import { QueryDispatchContext, QueryTextResponseContext, QueryResponseResponseContext } from '../reducers'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    fontSize: 19,
    marginLeft: '5px'
  },
  itemText: {
    fontFamily: 'monospace, monospace',
    fontSize: 14
  }
}))

export default props => {
  const classes = useStyles()
  const [popAnchor, setPopAnchor] = useState(null)

  return (
    <div>
      <SettingsIcon
        className={classes.icon}
        onClick={e => setPopAnchor(e.currentTarget)}
      />
      <Popover
        id="simple-popper"
        open={!!popAnchor}
        anchorEl={popAnchor}

        onClose={() => setPopAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.root}>
          <List component="nav" className={classes.itemText}>
            <ListItem>
              <Button color="primary">
                Set Headers
              </Button>
            </ListItem>
            <Divider />
            <ListItem>
              <Button color="primary">
                Export Query
              </Button>
            </ListItem>
          </List>
        </div>
      </Popover>
    </div>
  )
}

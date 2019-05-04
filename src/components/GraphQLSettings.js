import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
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

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default props => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [popAnchor, setPopAnchor] = useState(null)
  const { name, code, mockedHeaders }  = props
  return (
    <div>
      <div className={classes.root}>
        <List component="nav" className={classes.itemText}>
          <ListItem>
            <Button color="primary">
              Set Headers
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <Button
              onClick={() => setModalOpen(true)}
              color="primary">
              Export Query
            </Button>
          </ListItem>
        </List>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ExportModalContent
          data={[name, code, mockedHeaders]}
        />
      </Modal>
    </div>
  )
}

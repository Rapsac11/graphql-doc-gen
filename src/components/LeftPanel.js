import React from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, useTheme } from '@material-ui/styles'
import dataObject from '../util/dataObject.js'
import { queryTypeName, mutationTypeName } from '../util/constants/queryMutationTypes.js'
import { navigate } from "gatsby"

export default props => {
  const theme = useTheme();
  const useStyles = makeStyles(theme => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: props.drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: props.drawerWidth,
    },
    drawerPaper: {
      width: props.drawerWidth,
    }
  }));

  const classes = useStyles()

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick ={() => {
          navigate('Query')
        }}>
          <ListItemText primary='Query' />
        </ListItem>
        <ListItem button onClick ={() => {
          navigate('Mutation')
        }}>
          <ListItemText primary='Mutation' />
        </ListItem>
        <Divider />
        {
          dataObject['__schema'].types.map((item, index) => {
            if(item.name !== queryTypeName && item.name !== mutationTypeName) {
              return <ListItem button key={item.name} onClick ={() => {
                navigate(item.name.replace(/_/g, ""))
              }}>
                <ListItemText primary={item.name} />
              </ListItem>
            }
          })
        }
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

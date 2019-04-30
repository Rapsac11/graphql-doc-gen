export const template = (type, name) => `
import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import { navigate } from "gatsby"
import dataObject from '../../util/dataObject'
import { parse } from '../../../scripts'
import ObjectText from '../../components/ObjectText'
import ExerciseQuery from '../../components/ExerciseQuery'
import { QueryTextDispatchContext, QueryTextResponseContext, QueryTextReducer } from '../../reducers'
import '../styles.css'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: \`calc(100% - \${drawerWidth}px)\`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100%'
  },
}));

const whiteSpacePre = {
  whiteSpace: 'pre-wrap'
}

const textLine = {
  display: 'flex',
  alignItems: 'center',
  height: '40px'
}

const rootStyles = {
  height: '100%'
}

const track = {
  height: 'calc(100% - 64px)'
}

const slide = {
  height: '100%'
}

const type = ${type}

function ${name}(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fields, ] = useState(parse(type, 1))
  const [mode, setMode] = useState('exercise')
  const [checked, setChecked] = useState(true)
  const [queryTextResponse, queryTextDispatch] = useReducer(QueryTextReducer);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {
          dataObject['__schema'].types.map((item, index) => (
            <ListItem button key={item.name} onClick ={() => {
              navigate(item.name.replace(/_/g, ""))
            }}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );

  return (
    <QueryTextDispatchContext.Provider value={queryTextDispatch}>
      <QueryTextResponseContext.Provider value={queryTextResponse}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap onClick={() => setChecked(!checked)}>
                ${name}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
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
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className='here' />
            <div className="carousel carousel--translate">
              <input className="carousel__activator" type="radio" checked={checked} readOnly/>
              <input className="carousel__activator" type="radio" checked={!checked} readOnly/>
              <div className="carousel__track">
                <li className="carousel__slide">
                  <ObjectText
                    type={type}
                    checked={checked}
                    setChecked={setChecked}
                  />
                </li>
                <li className="carousel__slide">
                  <ExerciseQuery
                    checked={checked}
                    setChecked={setChecked}
                  />
                </li>
              </div>
            </div>
          </main>
        </div>
      </QueryTextResponseContext.Provider>
    </QueryTextDispatchContext.Provider>
  );
  }

${name}.propTypes = {
  container: PropTypes.object,
};

export default ${name}
`

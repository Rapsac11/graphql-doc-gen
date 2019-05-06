export const template = (type, name) => `
import React, { useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/styles'
import dataObject from '../../util/dataObject'
import { parse } from '../../../scripts'
import ObjectText from '../../components/ObjectText'
import ExerciseQuery from '../../components/ExerciseQuery'
import LeftPanel from '../../components/LeftPanel.js'
import withProviderHell from "../ProviderHell"
import '../styles.css'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
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

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
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
      <LeftPanel
        drawerWidth={drawerWidth}
        container={container}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
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
                name="${name}"
                checked={checked}
                setChecked={setChecked}
              />
            </li>
            <li className="carousel__slide">
              <ExerciseQuery
                checked={checked}
                name="${name}"
                setChecked={setChecked}
              />
            </li>
          </div>
        </div>
      </main>
    </div>
  )
}

${name}.propTypes = {
  container: PropTypes.object,
};

export default withProviderHell(${name})
`

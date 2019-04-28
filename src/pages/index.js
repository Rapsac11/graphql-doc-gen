import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import { navigate } from "gatsby"
import dataObject from '../util/dataObject'
import { parse } from '../../scripts'
import ObjectText from '../components/ObjectText'
import ExerciseQuery from '../components/ExerciseQuery'
import './styles.css'

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
      width: `calc(100% - ${drawerWidth}px)`,
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

const type = {"name":"Mutation","inputFields":null,"fields":[{"name":"createProject","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"ProjectInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Project","kind":"OBJECT"}}},{"name":"updateProject","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"ProjectInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Project","kind":"OBJECT"}}},{"name":"toggleIsActive","args":[{"name":"slug","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"String","ofType":null}}},{"name":"userId","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"ID","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Boolean","kind":"SCALAR"}}},{"name":"sendProjectCreationMail","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"String","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Project","kind":"OBJECT"}}},{"name":"createOrUpdateModule","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"ModuleInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Module","kind":"OBJECT"}}},{"name":"createOrUpdateGroup","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"GroupInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"GroupOutput","kind":"OBJECT"}}},{"name":"sendGroupUpdationMail","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"MailInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Project","kind":"OBJECT"}}},{"name":"cancelInvitation","args":[{"name":"id","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"Int","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Boolean","kind":"SCALAR"}}},{"name":"addPeopleToGroup","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"AddPeopleInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"AddPeopleOutput","kind":"OBJECT"}}},{"name":"sendAddPeopleMail","args":[{"name":"input","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"INPUT_OBJECT","name":"AddPeopleMailInput","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Project","kind":"OBJECT"}}},{"name":"deleteModule","args":[{"name":"id","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"ID","ofType":null}}},{"name":"slug","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"String","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Boolean","kind":"SCALAR"}}},{"name":"deleteProject","args":[{"name":"id","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"ID","ofType":null}}},{"name":"slug","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"String","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Boolean","kind":"SCALAR"}}},{"name":"reorderModules","args":[{"name":"reordering","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"LIST","name":null,"ofType":{"kind":"SCALAR","name":"String","ofType":null}}}},{"name":"slug","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"String","ofType":null}}}],"type":{"name":null,"kind":"NON_NULL","ofType":{"name":"Boolean","kind":"SCALAR"}}},{"name":"getSessionToken","args":[{"name":"token","type":{"name":null,"kind":"NON_NULL","ofType":{"kind":"SCALAR","name":"String","ofType":null}}}],"type":{"name":"AWSToken","kind":"OBJECT","ofType":null}}]}

function Main(props) {
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
            Graphql Documentation
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
  );
}

Main.propTypes = {
  container: PropTypes.object,
};

export default Main

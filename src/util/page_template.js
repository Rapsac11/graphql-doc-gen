export const template = (type, name) => `
import React, { useState, useEffect } from 'react';
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  },
}));

const whiteSpacePre = {
  whiteSpace: 'pre-wrap'
}

const type = ${type}

const parser = {
  0: () => type.fields.map(field => {
    let args = []
    field.args.map(arg => {
      let status = arg.type.kind == "NON_NULL" ? '!': ''
      let input = arg.type.ofType ? arg.type.ofType.name + status : arg.type.name
      let argString = arg.name + ': ' + input
      args.push(argString)
    })
    let inputs = args.length ? '(' + args.join(", ") + ')' : ''
    let output = field.type.name ? field.type.name : field.type.ofType.name
    if (field.type.kind == "LIST"){
      output = '[' + output + ']'
    }
    let string = '  ' + field.name + inputs + ': ' + output
    return string
  }),
  1: () => type.inputFields.map(inputfield => {
    let output = inputfield.type.ofType ? inputfield.type.ofType.name : inputfield.type.name
    if (inputfield.type.kind == "LIST"){
      output = '[' + output + ']'
    }
    let string = '  ' + inputfield.name + ': ' + output
    return string
  }),
  catch: () => null
}

let options = ['fields', 'inputFields']

let selector = () => {
  let parser = 'catch'
  options.forEach((option, i) =>{
    if (type[option]){
      parser = i
    }
  })
  return parser
}

let fields = parser[selector()]()

function ${name}(props) {

  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schemaData, setSchemaData] = useState([])

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
          <Typography variant="h6" color="inherit" noWrap>
            ${name}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              keepMounted: true, // Better open performance on mobile.
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
        <div>
          <span style={whiteSpacePre}>{"Type ${name} {"}</span>
        </div>
        {
          fields && fields.map((textRow, i) =>
            <div key={i}>
              <span key={i + 'span'} style={whiteSpacePre}>{textRow}</span>
            </div>)
        }
        <div>
          <span style={whiteSpacePre}>{"}"}</span>
        </div>
      </main>
    </div>
  );
}

${name}.propTypes = {
  container: PropTypes.object,
};

export default ${name}
`

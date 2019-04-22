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
import { parse, expand, collapse } from '../../../scripts'

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

const type = ${type}

function ${name}(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schemaData, setSchemaData] = useState([])
  const [fields, updateFields] = useState(parse(type, 1))
    const [hovering, setHovering] = useState('')

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const hovered = row => {
    return (typeof hovering == 'object' && hovering) ? (row > hovering[0]+0.99 && row < hovering[1]) : row == hovering
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
        <div style={objectText}>
          <div style={textLine}>
            <span style={whiteSpacePre}>{"Type ${name} {"}</span>
          </div>
          {
            fields && fields.map((textRow, i) =>
              {
                return <div
                  key={i}
                  style={ hovered(i) ? hoveredTextLine : textLine}
                  onClick={() => {
                    if(typeof fields[i][0] !== 'string'){
                      updateFields(collapse(fields[i][0].collapse, fields, i))
                      setHovering(null)
                    }
                  }}
                  onMouseEnter={() => setHovering(
                    fields[i][0].collapse ? [
                      i-fields[i][0].collapse.offset-1,
                      i+fields[i][0].collapse.length-fields[i][0].collapse.offset,
                    ] : i
                  )}
                  onMouseLeave={() => setHovering(null)}
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
                          style={ hovered(i + '.' + j) ? hoveredWhiteSpacePre : whiteSpacePre}
                          onClick={() => updateFields(clickFunction(...args))}
                          onMouseEnter={() => setHovering(i + '.' + j)}
                          onMouseLeave={() => setHovering(i)}
                          >
                          {item}
                        </span>
                    })
                  }
                </div>
              }
            )
          }
          <div style={textLine}>
            <span style={whiteSpacePre}>{"}"}</span>
          </div>
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

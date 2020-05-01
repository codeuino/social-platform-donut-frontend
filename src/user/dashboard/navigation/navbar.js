import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Modal, Button, Form, Row} from 'react-bootstrap';
import {JitsiMeet} from '../../integrations/Jitsi';
import "../../integrations/jitsi.scss";
import { List, ListItem, Drawer, ListItemIcon, Typography, ListItemText, Divider, IconButton } from "@material-ui/core";
import PublicIcon from '@material-ui/icons/Public';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import VideocamIcon from '@material-ui/icons/Videocam';
import { DonutTitleSmall, DonutSmall } from "../../../donutTitle/donutTitle";
import { makeStyles } from '@material-ui/core/styles';
import Logout from "../../profile/popups/logout";
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 270;
const styles = makeStyles( (theme) => ({
    menuButton: {
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
      bord: {
        border: 'none',
      },
      drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('xs')]: {
          width: theme.spacing(9) + 1,
          paddingLeft: 5
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },
      marop: {
          paddingLeft: 60
      },
      marcl: {
          paddingLeft: 6
      },
      coden: {
        fontSize: 12,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        marginLeft: 80,
        marginTop: 7,
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: 500
      },
      coden2: {
        fontSize: 12,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        marginLeft: 5,
        marginTop: 7,
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: 500
      },
    donut: {
        height: 50,
        paddingTop: 12,
    },
    active: {
        backgroundColor: 'rgba(26, 115, 232, 0.1)',
        color: '#1A73E8'
    },
    inactive: {
        color: 'rgba(0, 0, 0, 0.5)'
    }
}));

export default function NavBar(props){
    const classes = styles();
    const [width, setWidth] = React.useState({
        width: window.innerWidth
    });
    const [height, setHeight] = React.useState(window.innerHeight);
    const [open, setOpen] = React.useState((window.innerWidth > 1400) ? true : false);
    const [jit, setJit] = React.useState(false);
    const [logout, setLog] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [roomID, setID] = React.useState('');
    const [startJitsi, setStartJitsi] = React.useState(false);
    const [disable, setDisable] = React.useState(true);

    const handleChange = (event, params) => {
      event.preventDefault();
      params === "user"
        ? setUser(event.target.value )
        : setID(event.target.value);
        setDisable((roomID == '' || user == '') ?
        true : false );
    };
    const closeJitsi = () => setStartJitsi(false);
    const handleJitsi = () => setStartJitsi(true);
    const drawOpen  = () => setOpen(true);
    const drawClose  = () =>  setOpen(false);
    const jitOpen = () => setJit(true);
    const jitClose = () => setJit(false);
    const cancel = () => setLog(false);
    const logOpen = () => setLog(true);

    React.useEffect(() => {
        function checkWidth(){
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setOpen((window.innerWidth > 1400) ? true : false);
        }
        window.addEventListener('resize', checkWidth);
        return _=> { window.addEventListener('resize', checkWidth)};
    });
    const nameForm = (
      <Modal
        {...props}
        show={jit}
        onHide={jitClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <div className="container">
          <Modal.Header closeButton className="heading border border-0 p-0">
            <Modal.Title id="contained-modal-title-vcenter"> 
              <div className="title">Info</div>
              <div className="about">Enter your name and a roomID</div>
            </Modal.Title> 
          </Modal.Header>
          <Modal.Body>
            <Row className="form-content">       
              <Form.Label className="label">Your Name</Form.Label>
              <Form.Control className="form-input"
                type="text"   placeholder="Name.."   size="sm"
                onChange={event => handleChange(event, "user")}
                required/>
            </Row>
            <Row className="form-content">
              <Form.Label className="label">Room ID</Form.Label>
              <Form.Control className="form-input"
                type="text"   placeholder="RoomID.."   size="sm"   
                onChange={event => handleChange(event, "roomID")}
                required/>
            </Row> 
          </Modal.Body>
          <div className="form-footer">
            <Button onClick={handleJitsi} 
              disabled={disable} className="savebtn">Join Call</Button>
            {startJitsi ? <JitsiMeet show={startJitsi}
            onHide={closeJitsi} user={user} 
            roomID={roomID}/> : null}
            <Button variant="outline-primary" onClick={jitClose}>Cancel</Button>
          </div>
        </div>
      </Modal>
    );
    //const hit = window.innerHeight*(0.50-(window.innerHeight*0.002));
      
    const drawer = (
        <div>
            <Divider/>
            <List>
                <ListItem button component="a" href="/dashboard"
                className={ props.dashboard ? classes.active : classes.inactive } >
                    <ListItemIcon>
                        <DashboardIcon className={ props.dashboard ? classes.active : classes.inactive } />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button component="a" href="/pinned-posts"
                className={ props.post ? classes.active : classes.inactive } >
                    <ListItemIcon>
                        <svg
                        width="20"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon">
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.8043 2.15521C16.2894 -0.592583 11.974 -0.725094 9.18483 1.82775C7.01728 3.81162 6.38726 6.85162 7.38933 9.39879L0.51388 16.6358L0.512961 16.6368C-0.117421 17.2947 -0.192773 18.2877 0.432155 18.9705C1.05658 19.6528 2.05245 19.6667 2.76255 19.0979L2.76367 19.097L10.5848 12.8875C13.0327 14.1087 16.1146 13.7488 18.2809 11.766C21.0701 9.2132 21.3195 4.90328 18.8043 2.15521ZM7.42991 7.18208C7.35949 5.37255 8.06656 3.5292 9.52241 2.19672C12.1156 -0.176716 16.1139 -0.0435814 18.4355 2.49291C19.2794 3.415 19.7875 4.52965 19.9677 5.68903C19.7875 4.52961 19.2795 3.41491 18.4355 2.49279C16.1139 -0.0437087 12.1156 -0.176843 9.52241 2.19659C8.06652 3.52911 7.35946 5.37251 7.42991 7.18208ZM0.501346 17.816C0.514476 17.5229 0.639746 17.227 0.874681 16.9821L7.97743 9.50584C7.97741 9.50581 7.9774 9.50578 7.97739 9.50575L0.874675 16.982C0.639707 17.2269 0.514446 17.5229 0.501346 17.816ZM1.3888 18.0951C1.55829 18.2802 1.80082 18.2289 1.96635 18.0964L9.84292 11.8427C9.791 11.8031 9.74144 11.7605 9.69188 11.7179C9.66833 11.6976 9.64478 11.6774 9.62098 11.6574C9.60059 11.6403 9.57995 11.6236 9.55931 11.6068C9.52355 11.5778 9.48777 11.5488 9.4532 11.5178C9.3222 11.3994 9.1965 11.2751 9.07586 11.1456C9.06899 11.1384 9.06178 11.1317 9.05458 11.125C9.04631 11.1173 9.03805 11.1096 9.03031 11.1012C9.02259 11.0927 9.01559 11.0837 9.00855 11.0747C9.00146 11.0656 8.99433 11.0565 8.9864 11.0479C8.86967 10.9174 8.75826 10.7832 8.65321 10.6437C8.62465 10.6055 8.59826 10.5664 8.57184 10.5273C8.55857 10.5077 8.5453 10.4881 8.53173 10.4685C8.51389 10.443 8.49568 10.4176 8.47749 10.3923C8.43899 10.3387 8.40052 10.2851 8.36551 10.2296L1.44021 17.5186C1.29214 17.6731 1.21959 17.9102 1.3888 18.0951Z"
                            fill={props.post ? 'blue' : 'black'}
                            fill-opacity="0.5"
                            className="path-name" />
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary="Pinned Posts"/>
                </ListItem>
                <ListItem button component="a" href="/organization"
                className={ props.org ? classes.active : classes.inactive } >
                    <ListItemIcon>
                        <PublicIcon className={ props.org ? classes.active : classes.inactive } />
                    </ListItemIcon>
                    <ListItemText primary="Organization"/>
                </ListItem>
                <ListItem button component="a" href="/projects"
                className={ props.proj ? classes.active : classes.inactive } >
                    <ListItemIcon>
                        <InsertDriveFileIcon className={ props.proj ? classes.active : classes.inactive } />
                    </ListItemIcon>
                    <ListItemText primary="Projects"/>
                </ListItem>
                <ListItem button component="a" href="/profile"
                className={ props.profile ? classes.active : classes.inactive } >
                    <ListItemIcon>
                        <PersonIcon className={ props.profile ? classes.active : classes.inactive } />
                    </ListItemIcon>
                    <ListItemText primary="Account"/>
                </ListItem>
                <ListItem button className={jit ? classes.active : classes.inactive}
                onClick={jitOpen}>
                    <ListItemIcon>
                        <VideocamIcon className={jit ? classes.active : classes.inactive}/>
                    </ListItemIcon>
                    <ListItemText primary="Jitsi Meet"/>
                </ListItem>
                  {nameForm}
                <Typography style={{height: window.innerHeight*0.47}}/>
                <Divider/>
                <ListItem button component="a" href="/settings"
                className={ props.settings ? classes.active : classes.inactive } >
                    <ListItemIcon>
                        <SettingsIcon className={ props.settings ? classes.active : classes.inactive } />
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
                <ListItem button className={logout ? classes.active : classes.inactive}
                  onClick={logOpen} >
                  <ListItemIcon>
                    <ExitToAppIcon className={ logout ? classes.active : classes.inactive } />
                  </ListItemIcon>
                  <ListItemText primary="Logout"/>
                  <Logout show={logout} onHide={cancel} />          
                </ListItem>
                { (window.innerWidth > 1400) ?
                <Typography className={classes.coden} noWrap>
                  CODEUINO
                </Typography> :
                <Typography className={classes.coden2} noWrap>
                  DONUT
                </Typography> 
                }
            </List>
        </div>
    );
  
    return (
      <>
        <nav className={classes.drawer}>
            <Drawer variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}  >
              { open ? 
              <div className={clsx(classes.toolbar, classes.marop)}>
                  <IconButton onClick={ (width > 1400) ? null : drawClose }
                  className={classes.bord}>
                    <DonutTitleSmall />
                  </IconButton>
              </div> :
              <div className={clsx(classes.toolbar, classes.marcl)}>
                <IconButton onClick={ drawOpen } className={classes.bord}>
                    <DonutSmall />
                </IconButton>
              </div> }
              {drawer}
            </Drawer>
        </nav>
      </>
    )
};

NavBar.propTypes = {
    dashboard: PropTypes.bool,
    post: PropTypes.bool,
    org: PropTypes.bool,
    proj: PropTypes.bool,
    profile: PropTypes.bool,
    settings: PropTypes.bool,
    logout: PropTypes.bool
  }

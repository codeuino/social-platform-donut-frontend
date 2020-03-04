import React, { useState, useEffect } from 'react';
import "./jitsi.scss";

//import ProgressComponent from '@material-ui/core/CircularProgress';
//import JitsiMeetExternalAPI from './external_api';
const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
function JitsiMeetComponent(props) {
  const [loading, setLoading] = useState(true);
  const jitsiStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
  };
 const username = (props.user);
 const room = (props.roomID);

 function startConference() {
  try {
   const domain = 'meet.jit.si';
   const options = {
    roomName: room,
    height: 600,
    parentNode: document.getElementById('jitsi-container'),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {
     disableSimulcast: false,
    },
   };

   const api = new JitsiMeetExternalAPI(domain, options);
   api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    setLoading(false);
    api.executeCommand('displayName', username);
   });
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  }
 }
 
 useEffect(() => {
  if (window.JitsiMeetExternalAPI)
    startConference();
  else
    alert('Jitsi Meet API script not loaded');
 }, []);

 return (

    <div className="containerStyle">
      <div id="jitsi-container" style={jitsiStyle}>
        {loading}
      </div>
    </div>

 );
}

export default JitsiMeetComponent;

import React , { useState, useEffect } from 'react'
import Switch from "react-switch";
import Confirm from './popup/Confirm';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function ToggleSwitch(props) {
  const [checked, setCheck] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    console.log('use effect from ToggleSwitch', props)
    setCheck(props.isMaintenance)
  }, [props, props.isMaintenance])
  
  let handleChange = (checked) => {
    console.log('checked ', checked)
    setCheck(checked)
    setModalShow(true)
  }

  let handleClose = () => {
    console.log('close clicked!')
    setCheck(!checked)
    setModalShow(false)
  }

  let handleChecked = (checked) => {
    console.log('checked handle', checked)
    setCheck(checked);
  }


  return (
    <>
      <label htmlFor="icon-switch">
        <Switch
          checked={checked}
          onChange={handleChange}
          handleDiameter={20}
          offColor="#CCCCCC"
          onColor="#86d3ff"
          offHandleColor="#ffffff"
          onHandleColor="#08f"
          height={35}
          width={70}
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "#1A73E8",
                fontFamily: "Inter",
                fontWeight: "bold",
                paddingRight: 3,
              }}
            >
              Off
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "red",
                fontFamily: "Inter",
                fontWeight: "bold",
                paddingRight: 2,
              }}
            >
              On
            </div>
          }
          className="react-switch"
          id="icon-switch"
        />
      </label>
      <Confirm 
        show={modalShow} 
        text={checked ? "On" : "Off"} 
        handleClose={handleClose} 
        checked={checked}
        handleChecked={handleChecked}
       />
    </>
  );
}

// map state to props 
const mapStateToProps = (state) => ({
  org: state.org,
  auth: state.auth,
  error: state.error
})

export default connect(mapStateToProps)(withRouter(ToggleSwitch));

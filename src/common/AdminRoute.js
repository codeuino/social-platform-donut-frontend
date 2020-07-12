import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AdminRoute(props) {
  // const [mount, setMount] = useState(false);
  const [returnedRoute, setReturnedRoute] = useState("")

  useEffect(() => {
    switch(props.role) {
      case "admin": {
        return setReturnedRoute(
          props.auth.isAuthenticated && (
            props.auth.isAdmin || 
            props.user.userProfile.isAdmin ||
            props.admin.isAdmin ) ? (
            <Route {...props} />
          ) : (
            <Redirect to="/dashboard" />
          )
        );
      }
      default: {
        return setReturnedRoute(<Route {...props} />);
      }
    }
  }, [props.role, props])
  return <React.Fragment>{returnedRoute}</React.Fragment>;
}

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    admin: state.admin
  }
}

export default connect(mapStateToProps)(AdminRoute);
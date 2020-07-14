import React from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component , auth, org, ...rest}) {
  return (
    <Route {...rest}
      render = { props => 
        auth.isAuthenticated === true && org.isMaintenance === false ? (
          <Component {...props}/>
        ) : (
          <Redirect to= "/" />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    org: state.org
  }
}
export default connect(mapStateToProps)(PrivateRoute);
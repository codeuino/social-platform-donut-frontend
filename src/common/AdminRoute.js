import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AdminRoute({ component: Component, auth, admin, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true && (
          auth.isAdmin === true || 
          admin.isAdmin === true || 
          localStorage.getItem('admin') === "true"
        ) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  org: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    admin: state.admin
  }
}

export default connect(mapStateToProps)(AdminRoute);
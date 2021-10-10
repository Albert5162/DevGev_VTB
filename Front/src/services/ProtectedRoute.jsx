import { Redirect, Route } from 'react-router-dom'

import React from 'react'

export function ProtectedRoute ({component: Component, ...rest}) {

  return (
    <Route {...rest} render={
      (props) => {
        if (localStorage.getItem('token')) {
          return <Component {...props}/>
        } else {
          return <Redirect to={
            {
              pathname: "/sign-up",
              state: {
                from: props.location
              }
            }
          }/>
        }
      }
    }/>
  )
}


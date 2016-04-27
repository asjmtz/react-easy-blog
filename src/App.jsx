import React, { Component } from 'react'
import { Link } from 'react-router'
import Post from './Post'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/post/123">Post 123</Link></li>
          <li><Link to="/post/456">Post 456</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})



export { App, Post }
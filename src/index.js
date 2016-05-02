// index.js
import React from 'react'
import { render } from 'react-dom'
import { App, Post } from './App.jsx';

import { Router, hashHistory, useRouterHistory } from 'react-router'

const routes = {
  	path: '/',
  	component: App,
  	// indexRoute: { component: Dashboard },
  	childRoutes: [
    	{ 
    		path: 'post/:post', 
    		component: Post, 
    		
    	},
    	// {
	    //   	path: 'inbox',
	    //   	component: Inbox,
	    //   	childRoutes: [{
	    //     	path: 'messages/:id',
	    //   	}]
    	// },
	    // {
	    //   	component: Inbox,
	    //   	childRoutes: [{
	    //     	path: 'messages/:id', 
	    //     	component: Message
	    //   	}]
	    // }
  	]
}
// import { useRouterHistory } from 'react-router'
import { createHistory, useBeforeUnload } from 'history'

const history = useRouterHistory(useBeforeUnload(createHistory))()
// history.listenBefore(location => {
//     return 'Are you sure you want to leave this page?'
// })
render(<Router history={history} routes={routes} />, document.getElementById('app'))
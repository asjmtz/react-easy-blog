import React, { Component } from 'react'
import { Link } from 'react-router'
import Post from './Post'
import './main.css'

const navList = [
	{
		path: '/post/123',
		name: '/post/123',
		pageClassName: 'page1',
	},
	{
		path: '/post/345',
		name: '/post/345',
		pageClassName: 'page2',
	},
]

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			pageClassName: 'page', 
		}
	}
	handleNavClick(e){
		let target = e.target.textContent
		let navItemConfig = navList.filter((item)=>item.path == target)[0]
		this.setState({ pageClassName: navItemConfig.pageClassName })
	}

	renderNavList(list){
		return list.map((item, index)=>{
			return (
				<li key={index}><Link to={item.path} onClick={this.handleNavClick.bind(this)}>{item.name}</Link></li>
			)
		})
	}
	render() {
		let { pageClassName } = this.state
		let listDOM = this.renderNavList(navList)
		return (
			<div>
				<h1>App</h1>
				<ul>
					{listDOM}
				</ul>
				<div className={pageClassName}> {this.props.children}</div>
			</div>
		)
	}
}



export { App, Post }
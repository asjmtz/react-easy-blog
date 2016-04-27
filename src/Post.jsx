import React, { Component } from 'react'
import marked from 'marked'
import Content from './Output'

const mkStr = "## Hello Post\n"+
	"- 342"+
	"- 234234"+
	"- 3423423";


export default class Post extends Component{
			// <div>{typeof marked('## asd')}</div>
			// function createMarkup() { return {__html: 'First &middot; Second'}; };
	render(){
		let {id} = this.props.params
		return (
			<div>
				<h1>Post</h1>
				<h3>Id: {id}</h3>
				<div>Content:</div>
				<Content></Content>
			</div>
		)
	}
}
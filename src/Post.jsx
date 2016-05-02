import React, { Component } from 'react'
import marked from 'marked'
// import Document from './output.md'

function getAsyncDocument(post, callback) {
    require.ensure([], function(require) {
        callback(require("../"+post+'.md')());
    }, 'document');
}
function getDocument (post) {
	return require("../posts/"+post+'.md').default;
}

export default class Post extends Component{
	constructor(props){
		super(props)
		this.state = {
			Document: null
		}
	}
	renderAsyncDocument(){
		let post = this.props.params.post
		getAsyncDocument(post, ( Document )=>{
			this.setState( { Document: Document } )
		})
	}
	renderDocument(){
		let post = this.props.params.post
		return getDocument(post)
	}
	render(){
		// let { Document } = this.state

		// if ( !Document ) {
		// 	this.renderAsyncDocument()  
		// };
		let Document = this.renderDocument()
		return (
			<div>
				<h1>Post</h1>
				<h3>Id: {this.props.params.post}</h3>
				<div>Content:</div>
				{
					Document ? <Document></Document> : null
				}
			</div>
		)
	}
}
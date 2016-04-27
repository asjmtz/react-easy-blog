var fs = require('fs')
var path = require("path")

function getDirStructure( dir, done ){
	// console.log('read',dir, results)
	var results = {}
	fs.readdir( dir, function (err, files) {
		if (err) {
			console.log(err);
			return done(err);
		}

		var count = files.length;
		if ( !count ) { 
			return done(null, results)
		}
		// console.log('files', files)
		files.forEach(function (filename, index) {
			fs.stat( path.join(dir, filename), function (err, stats) {
		      	if (err) throw err;

		      	if (stats.isDirectory ()) {
		      		var subStructure = {} 
		      		results[filename] = subStructure
		      		getDirStructure( path.join(dir, filename), function( err, res ){
		      			results[filename] = res;
            			if (!--count) done(null, results);
		      		} )
		      	} else {
		      		results[filename] = 1;
		      		 if (!--count) done(null, results);
		      	}    
		    	// console.log('stats:  %s',JSON.stringify(stats));
		    });
		});
	});
}

function printDir( data, level ){
	level = level || 1
	var levelStr = ''
	for (var i = 0; i < level; i++) {
		if (i + 1 < level ){
			levelStr += ' '
		} else {
			levelStr += '|-'
		}
	};
	Object.keys(data).forEach(function (key, index) {
			// console.log('-', key, typeof data[key] == 'object')
		console.log(levelStr, key)
		if (typeof data[key] == 'object' ){
			printDir(data[key], ++level)
		}
	})
}

var marked = require('marked')

var markdown = function(text){

	return 'import React, {Component} from "react" \n'+
	'export default class Output extends Component{\n' +

		'render(){\n'+
			
			'return (<div>\n'+marked(text)+'</div>\n)\n'+

		'}\n'+

	'}\n';
}


fs.readFile('README', 'UTF-8',function (err, text) {
  	if (err) throw err;
	var markedStr = markdown(text)

  	fs.writeFile('src/Output.jsx', markedStr, function (err) {
  		if (err) throw err;
  		console.log('文件写入成功');
	});

});
// getDirStructure(  'src' , function(err, data){
	 // printDir( data );
// } )

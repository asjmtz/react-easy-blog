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
		      		results[filename] = stats;
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
		// console.log(levelStr, key)
		if (typeof data[key] == 'object' ){
			printDir(data[key], ++level)
		}
	})
}

function createDataJSON (dir) {
	getDirStructure(  dir , function(err, data){
		fs.writeFile( path.join(__dirname, 'src', 'posts.json') , JSON.stringify(data), 'utf8', (err) => {
	  		if (err) throw err;
	  		console.log('It\'s saved!');
		});
	} )
}
// console.log('%c Oh my heavens! ', 'color: #bada55')
module.exports = createDataJSON
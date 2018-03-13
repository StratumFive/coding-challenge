var fs = require("fs");
var inputData = '';

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to utf8.
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
	inputData += chunk;
});

readerStream.on('end', function(){
	console.log(inputData);
});

readerStream.on('error', function(err){
	console.log(err.stack);
})

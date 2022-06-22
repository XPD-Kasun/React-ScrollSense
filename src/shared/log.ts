export function warn(msg){
	// var s = new Error('Warning');	
	// //https://stackoverflow.com/a/20524948/2260920
	// var lines = s.stack.split("\n").slice(1).join('\n');
	console.warn('React Scroll Sense: ' + msg);
}

export function error(msg){
	// var s = new Error('Error');	
	// var lines = s.stack.split("\n").slice(1).join('\n');
	console.error('React Scroll Sense: ' + msg);
}

export function info(msg){
	// var s = new Error('Info');	
	// //https://stackoverflow.com/a/20524948/2260920
	// var lines = s.stack.split("\n").slice(1).join('\n');	
	console.log('React Scroll Sense: ' + msg);
}
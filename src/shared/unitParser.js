
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function (suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

export function parseDelay(delayLiteral) {

	delayLiteral = delayLiteral.trim();
	if (delayLiteral.endsWith('ms')) {
		return parseInt(delayLiteral.substring(0, delayLiteral.indexOf('ms')));
	}
	if (delayLiteral.endsWith('s')) {
		return parseInt(delayLiteral.substring(0, delayLiteral.indexOf('s'))) * 1000;
	}
}

export function parseRootMargin(rootMargin) {

	var items = rootMargin.trim().split(' ');
	if (items.length == 1) {
		var value = parseInt(items[0]);
		return {
			type: items[0].endsWith('%') ? 'percentage' : 'pixel',
			margin: [value, value, value, value]
		}
	}
	if (items.length == 2) {
		var x = parseInt(items[1]);
		var y = parseInt(items[0]);

		return {
			type: items[0].endsWith('%') ? 'percentage' : 'pixel',
			margin: [y, x, y, x]
		}
	}
	if(items.length== 4){
		return {
			type: items[0].endsWith('%') ? 'percentage' : 'pixel',
			margin: [parseInt(items[0]), parseInt(items[1]), parseInt(items[2]), parseInt(items[3])]
		}
	}

	return null;
}
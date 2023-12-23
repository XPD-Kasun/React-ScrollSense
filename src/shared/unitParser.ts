import { ParsedRootMargin } from "../native/types";

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function (suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

export function parseDelay(delayLiteral) {

	if (typeof (delayLiteral) == 'number') {
		return delayLiteral;
	}
	
	delayLiteral = delayLiteral.trim();

	if (delayLiteral.endsWith('ms')) {
		return parseInt(delayLiteral.substring(0, delayLiteral.indexOf('ms')));
	}
	if (delayLiteral.endsWith('s')) {
		return parseInt(delayLiteral.substring(0, delayLiteral.indexOf('s'))) * 1000;
	}
}

function parseType(input): string {
	return input.endsWith('%') ? 'percentage' : 'pixel'
}

export function parseRootMargin(rootMargin): ParsedRootMargin {

	var items = rootMargin.trim().split(' ');
	if (items.length == 1) {
		var value = parseInt(items[0]);
		return {
			type: new Array<string>(4).fill(parseType(items[0])),
			margin: [value, value, value, value]
		}
	}
	if (items.length == 2) {
		var x = parseInt(items[1]);
		var y = parseInt(items[0]);

		return {
			type: [parseType(y), parseType(x), parseType(y), parseType(x)],
			margin: [y, x, y, x]
		}
	}
	if (items.length == 4) {
		return {
			type: [parseType(items[0]), parseType(items[1]), parseType(items[2]), parseType(items[3])],
			margin: [parseInt(items[0]), parseInt(items[1]), parseInt(items[2]), parseInt(items[3])]
		}
	}

	return null;
}

export function getLengthForType(type: string, marginValue: number, rootLength: number) {

	if(type === 'pixel') {
		return marginValue;
	}
	else {
		return marginValue * rootLength;
	}
	
}
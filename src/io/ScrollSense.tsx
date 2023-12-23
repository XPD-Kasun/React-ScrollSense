import React from "react";
import propTypes from 'prop-types';
import { error, warn } from '../shared/log';
import errorStrings from "../shared/errorStrings";
import { IOScrollContext, ScrollSenseProps, ScrollSenseState } from "./types";
import { Tracker } from "../types";
import { isNumeric } from "../shared/isNumeric";

const ScrollContextIntersectionObserver = React.createContext<IOScrollContext>(null);
ScrollContextIntersectionObserver.displayName = 'ScrollSenseIO';



const thresholdSetToValues = function (threshold) {

	if(threshold == null || typeof threshold == 'undefined') {
		return 0.5;
	}

	let threasholds = null;

	if (threshold instanceof Array) {
		threasholds = threshold;
	}
	else {
		threasholds = [threshold];
	}


	return threasholds.map(t => {
		let threahold = t.toString();
		let index = -1;
		if ((index = threahold.indexOf('%')) > -1) {
			let val = threahold.substr(0, index);
			val = parseFloat(val);
			val /= 100;
			return val;
		}
		if ((index = threahold.indexOf('px')) > -1) {
			error(errorStrings.noPixelsForSingleIOThreshold);
			return 0.5;
		}

		return t
	});
}

const thresholdForMulti = function (threshold, el) {

	let threasholds = null;

	if (threshold instanceof Array) {
		threasholds = threshold;
	}
	else {
		threasholds = [threshold];
	}

	let ar = threasholds.map(t => {
		let threahold = t.toString();
		let index = -1;
		if ((index = threahold.indexOf('%')) > -1) {
			let val = threahold.substr(0, index);
			val = parseInt(val);
			val /= 100;
			return val;
		}
		if ((index = threahold.indexOf('px')) > -1) {
			let val = threahold.substr(0, index);
			val = parseInt(val);
			let rect = el.getBoundingClientRect();
			val = Math.min(1, val / rect.height);

			return val;
		}
		return t;
	})
	//console.log(ar)
	return ar;


}


class ScrollSense extends React.Component<ScrollSenseProps, ScrollSenseState> {
	callbackfns = {};
	io = null;
	perComponentIOArray = [];

	static propTypes = {
		config: propTypes.shape({
			threshold: propTypes.oneOfType([propTypes.number, propTypes.string]),
			root: propTypes.instanceOf(HTMLElement),
			rootMargin: propTypes.oneOfType([propTypes.string, propTypes.array])
		})
	};


	onContentVisible(entries, observer) {
		//console.log('onvisiblecontent', this.props.id, entries, observer);

		entries.forEach((entry) => {

			let el = entry.target;
			const fn = this.callbackfns[el.getAttribute('data-scroll-id')].fn;

			if (!fn) {
				return;
			}
			fn(entry);




		});

	}

	onViewportChange() {

		this.setState({
			refreshToggle: !this.state.refreshToggle
		});
	}

	componentWillUnmount() {

		for (let a in this.callbackfns) {
			this.io.unobserve(this.callbackfns[a].el);
		}
		if (this.io) {
			this.io.disconnect();
		}

		for (let a = 0; a < this.perComponentIOArray.length; a++) {
			const ioEntry = this.perComponentIOArray[a];
			ioEntry.io.unobserve(ioEntry.el);
			ioEntry.io.disconnect();
		}
	}

	i = 0;

	replaceComponentFn(el, fn, config) {

		for (let i = 0; i < this.perComponentIOArray.length; i++) {
			const ioItem = this.perComponentIOArray[i];
			if (ioItem.el == el) {
				let io = ioItem.io;
				io.unobserve(el);
				io.disconnect();
				var options = this.buildOptions(el, config);
				io = new IntersectionObserver(this.wrappedPerComponentHandler, options);
				ioItem.io = io;
				ioItem.fn = fn;
				io.observe(el);

				ioItem.ioActions.pause = () => {
					this.pauseTrackingFn(el, io);
				};

				ioItem.ioActions.resume = () => {
					this.resumeTrackingFn(el, io);
				}

				return ioItem.ioActions;

			}
		}

	}

	buildOptions(el, config) {

		let options = config;
		if (!options) {
			options = {
				threshold: this.props.config ? (this.props.config.threshold || 0.5) : 0.5,
				root: this.props.config?.root,
				rootMargin: this.props.config ? (this.props.config.rootMargin || '0px') : '0px'
			};
		}
		else {
			options = {
				threshold: options.threshold ?? (this.props.config ? (this.props.config.threshold || 0.5) : 0.5),
				root: options.root ?? this.props.config?.root,
				rootMargin: options.rootMargin ?? (this.props.config ? (this.props.config.rootMargin || '0px') : '0px')
			}
		}
		options.threshold = thresholdForMulti(options.threshold, el);
		return options;
	}

	wrappedPerComponentHandler(ioEvent: IntersectionObserverEntry[], io: IntersectionObserver) {
		
		for(let i = 0; i< this.perComponentIOArray.length; i++) {
			let ioEntry = this.perComponentIOArray[i];
			if(ioEntry.io == io) {
				ioEvent.forEach((entry) => {
					if(entry.target == ioEntry.el) {
						ioEntry.fn(entry);
					}
				});
			} 
		}
		
	}

	addPerComponentFn(el, fn, config) {


		let storedEl = this.perComponentIOArray.find(x => x.el == el);

		if(storedEl && storedEl.config) {
			if (
				storedEl.config.rootMargin === config.rootMargin &&
				storedEl.config.root === config.root && 
				storedEl.config.threshold === config.threshold
			) {
				storedEl.fn = fn;
				return storedEl.ioActions;
			}
		}
		else if(storedEl && (!storedEl.config && !config)) {
			storedEl.fn = fn;
			return storedEl.ioActions;
		}
		else if(storedEl) {
			return this.replaceComponentFn(el, fn, config);
		}

		let scrollId = el.getAttribute('data-scroll-id');
		if (isNumeric(scrollId)) {
			warn("cannot attach scroller since already exists a handler");
			return;
		}
		el.setAttribute('data-scroll-id', this.i);
		el.setAttribute('data-scroll-multi', 'true');
		this.i++;


		var options = this.buildOptions(el, config);
		let io = new IntersectionObserver(this.wrappedPerComponentHandler, options);
		// console.log('Addpercomponent with config ', options, el);

		io.observe(el);

		let ioActions = {
			pause: () => {
				this.pauseTrackingFn(el, io);
			},
			resume: () => {
				this.resumeTrackingFn(el, io);
			}
		}

		this.perComponentIOArray.push({
			io,
			el,
			fn,
			config,
			ioActions
		});

		return ioActions;
	}

	addTrackingFn(el, fn): Tracker {
		let scrollId = el.getAttribute('data-scroll-id');
		if (isNumeric(scrollId)) {
			console.warn("cannot attach scroller since already exists a handler");
			return;
		}
		el.setAttribute('data-scroll-id', this.i);
		this.callbackfns[this.i] = {
			fn: fn,
			el: el
		};

		if (!this.io) {
			this.io = new IntersectionObserver(this.onContentVisible.bind(this), {
				threshold: this.props.config ? (thresholdSetToValues(this.props.config.threshold)) : 0.5,
				root: this.props.config?.root,
				rootMargin: this.props.config ? (this.props.config.rootMargin || '0px') : '0px'
			});
		}


		this.io.observe(el);
		this.i++;

		return {

			pause: () => {
				this.pauseTrackingFn(el, this.io)
			},
			resume: () => {
				this.resumeTrackingFn(el, this.io);
			}
		}
	}

	replaceTrackingFn(el, fn) {
		let scrollId = el.getAttribute('data-scroll-id');
		if (!isNumeric(scrollId)) {
			console.warn("cannot replace scroll handler since no handler found");
			return;
		}
		this.callbackfns[scrollId].fn = fn;
	}

	pauseTrackingFn(el, io) {
		io.unobserve(el);
	}

	resumeTrackingFn(el, io) {
		let scrollId = el.getAttribute('data-scroll-id');
		if (!isNumeric(scrollId)) {
			return;
		}
		io.observe(el);
	}

	removeTrackingFn(el, isMultiple) {

		if (isMultiple) {

			for (let i = 0; i < this.perComponentIOArray.length; i++) {
				const item = this.perComponentIOArray[i];
				if (item.el === el) {
					item.io.unobserve(el);
					this.perComponentIOArray.splice(i, 1);
					return;
				}
			}

		}
		else {

			this.io.unobserve(el);

		}

	}

	constructor(props) {
		super(props);

		this.addTrackingFn = this.addTrackingFn.bind(this);
		this.addPerComponentFn = this.addPerComponentFn.bind(this);
		this.replaceComponentFn = this.replaceComponentFn.bind(this);
		this.wrappedPerComponentHandler = this.wrappedPerComponentHandler.bind(this);
		this.removeTrackingFn = this.removeTrackingFn.bind(this);
	}


	render() {

		let val: IOScrollContext = {
			addToSingleio: this.addTrackingFn,
			addToMultipleio: this.addPerComponentFn,
			updateMultipleio: this.replaceComponentFn,
			removeTracking: this.removeTrackingFn,
			sensorType: 'io'
		};

		return (
			<ScrollContextIntersectionObserver.Provider value={val}>
				{this.props.children}
			</ScrollContextIntersectionObserver.Provider>
		);
	}
}

export { ScrollContextIntersectionObserver };
export default ScrollSense;

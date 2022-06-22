import { isElement, throttle } from "lodash";
import React, { DOMElement } from "react";
import { warn } from "../shared/log";
import '../shared/polyfills';
import { getLengthForType, parseDelay, parseRootMargin } from '../shared/unitParser';


function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

type NativeScrollContext = {
	addTracking: (el: HTMLElement, fn, options) => SensorProxy,
	updateTracking: (el: HTMLElement, fn, options) => void,
	removeTracking: (el: HTMLElement) => void,
	sensorType: 'native'
}


const ScrollContextNativeScroll = React.createContext<NativeScrollContext>(null);
ScrollContextNativeScroll.displayName = 'NativeScrollSense';

interface ScrollSenseProps {
	config: {
		rootMargin: string
		delay: string
	}
}

interface ScrollSenseState {
	refreshToggle: boolean
}

interface ScrollableItem {
	fn: (ScrollSensorEvent) => void,
	el: HTMLElement,
	isShowing: boolean,
	options: OptionPropType,
	overflowParent: {
		el: HTMLElement,
		xOverflow: boolean,
		yOverflow: boolean
	},
	isActive: boolean,
	isScrollContainer: boolean,
	isTriggered: boolean,
	continuous: boolean
}

type OptionPropType = {
	delay?: number,
	rootMargin: ParsedRootMargin
};

class ScrollSense extends React.Component<ScrollSenseProps, ScrollSenseState> {

	options: OptionPropType = null;

	setOptions() {

		let options = {
			rootMargin: null,
			delay: 100
		};
		console.log(this.props)

		if (this.props.config) {
			if (this.props.config.delay) {
				options.delay = parseDelay(this.props.config.delay);
			}
			if (this.props.config.rootMargin) {
				options.rootMargin = parseRootMargin(this.props.config.rootMargin);
			}
			else {
				options.rootMargin = parseRootMargin('0 0 0 0');
			}
		}

		this.options = options;
	}

	constructor(props) {
		super(props);
		this.setOptions();

		this.onScroll = throttle(this.onScroll.bind(this), this.options.delay);
		this.handleScroll = this.handleScroll.bind(this);
		this.onResize = this.onResize.bind(this);
		this.onViewportChange = this.onViewportChange.bind(this);
		this.addTrackingFn = this.addTrackingFn.bind(this);
		this.removeTracking = this.removeTracking.bind(this);
		this.updateTrackingFn = this.updateTrackingFn.bind(this);

		this.wndHeight = window.innerHeight;
		this.wndWidth = window.innerWidth;
	}

	i = 0;
	wndHeight = 0;
	wndWidth = 0;
	scrollEntryItems: ScrollableItem[] = [];

	isOverflow(prop) {
		return prop == 'auto' || prop == 'scroll';
	}

	getOverflowParent = (el) => {
		var parentEl = el.parentNode;
		var overflow = getComputedStyle(parentEl).overflow;

		var isXOverflowSet = false, isYOverflowSet = false;
		var overflowAr = overflow.split(' ');

		if (overflowAr.length == 2) {
			//We have both x and y overflow set.
			if (this.isOverflow(overflowAr[0])) {
				isXOverflowSet = true;
			}

			if (this.isOverflow(overflowAr[1])) {
				isYOverflowSet = true;
			}
		}

		else if (overflowAr.length == 1) {
			if (this.isOverflow(overflowAr[0])) {
				isXOverflowSet = isYOverflowSet = true;
			}
		}

		if (isXOverflowSet || isYOverflowSet) {
			return {
				el: parentEl,
				xOverflow: isXOverflowSet,
				yOverflow: isYOverflowSet
			};
		}

		if (parentEl.tagName.toLowerCase() == 'body') {
			return null;
		}

		return this.getOverflowParent(parentEl);

	};

	triggerDocumentScroll = null;

	addTrackingFn(el, fn, options): SensorProxy {

		let trackingOptions: any = {};

		if (options) {
			trackingOptions = options;
		}

		if (trackingOptions.continuous === undefined) {
			trackingOptions.continuous = true;
		}
		if (!trackingOptions.continuous) {
			trackingOptions.continuous = false;
		}
		else {
			trackingOptions.continuous = true;
		}


		let scrollId = el.getAttribute('data-scroll-id');
		let self = this;
		if (isNumeric(scrollId)) {
			warn("Cannot attach scroller since already exists a handler");
			return;
		}
		el.setAttribute('data-scroll-id', this.i);

		let overflowParent = this.getOverflowParent(el);
		if (overflowParent && overflowParent.el) {

			overflowParent.el.addEventListener('scroll', this.onScroll);

			let isContainerAdded = false;
			for (let i = 0; i < this.scrollEntryItems.length; i++) {
				const item = this.scrollEntryItems[i];
				if (item.el == overflowParent.el) {
					isContainerAdded = true;
				}
			}

			if (!isContainerAdded) {

				overflowParent.el.dispatchEvent(new CustomEvent('scroll'));
				//Add the container for container detection.
				let scrollItem = {
					fn: fn,
					el: overflowParent.el,					
					isShowing: false,
					options: {
						rootMargin: trackingOptions.rootMargin ? parseRootMargin(trackingOptions.rootMargin) : this.options.rootMargin
					},
					overflowParent: null,
					isActive: true,
					isScrollContainer: true,
					isTriggered: false,
					continuous: trackingOptions.continuous
				};
				this.scrollEntryItems[this.i] = scrollItem;
				this.i++;
			}
		}
		else {
			if (!this.triggerDocumentScroll) {

				let e = document.createEvent('Event');
				e.initEvent('scroll', true, true);
				document.dispatchEvent(e);

				this.triggerDocumentScroll = true;
			}

			// this.triggerDocumentScroll();
		}

		let scrollItem = {
			fn: fn,
			el: el,
			isShowing: false,
			options: {
				rootMargin: trackingOptions.rootMargin ? parseRootMargin(trackingOptions.rootMargin) : null
			},
			overflowParent,
			isActive: true,
			isTriggered: false,
			continuous: trackingOptions.continuous,
			isScrollContainer: false,
			// scrollTop: (overflowParent) ? overflowParent.scrollTop : this.getScrollTop(),
			// scrollLeft: (overflowParent) ? overflowParent.scrollLeft : this.getScrollLeft()
		};

		this.scrollEntryItems[this.i] = scrollItem;
		this.i++;

		return {

			pause: () => {
				scrollItem.isActive = false;
				if (scrollItem.overflowParent) {
					scrollItem.overflowParent.el.dispatchEvent(new CustomEvent('scroll'));
				}
				else {
					//self.triggerDocumentScroll();
				}

			},
			resume: () => {
				scrollItem.isActive = true;
				if (scrollItem.overflowParent) {
					scrollItem.overflowParent.el.dispatchEvent(new CustomEvent('scroll'));
				}
				else {
					//self.triggerDocumentScroll();
				}
			}
		}
	}

	updateTrackingFn(el, fn, options) {

		for (let i = 0; i < this.scrollEntryItems.length; i++) {
			const item = this.scrollEntryItems[i];
			if (item.el == el) {

				if (fn) {
					item.fn = fn;
				}
				if (options && options.rootMargin) {
					item.options.rootMargin = parseRootMargin(options.rootMargin);
					item.overflowParent.el.dispatchEvent(new CustomEvent('scroll'));
				}

			}

		}

	}

	removeTracking(el) {

		if (isElement(el)) {

			for (let i = 0; i < this.scrollEntryItems.length; i++) {
				const scrollItem = this.scrollEntryItems[i];
				if (scrollItem.el == el) {

					this.scrollEntryItems.splice(i, 1);
					return;

				}

			}

		}


	}

	//https://stackoverflow.com/a/20478983/2260920
	getScrollTop() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}

	getScrollLeft() {
		return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	}

	handleScroll(evt) {

		if (evt.target == document) {

			for (let i = 0; i < this.scrollEntryItems.length; i++) {
				const item = this.scrollEntryItems[i];

				if (!(item.continuous || !item.isTriggered || item.isScrollContainer)) {
					continue;
				}

				if (!item.isActive || item.overflowParent) {
					continue;
				}

				let wndLeft = 0, wndTop = 0, wndRight = this.wndWidth, wndBottom = this.wndHeight;
				if (item.options && item.options.rootMargin) {

					var rootMargin = item.options.rootMargin;
					wndLeft += getLengthForType(rootMargin.type[3], rootMargin.margin[3], wndRight);
					wndTop += getLengthForType(rootMargin.type[0], rootMargin.margin[0], wndBottom);
					wndRight -= getLengthForType(rootMargin.type[1], rootMargin.margin[1], wndRight);
					wndBottom -= getLengthForType(rootMargin.type[2], rootMargin.margin[2], wndRight);;
				}

				const rect = item.el.getBoundingClientRect();

				if (
					rect.top < wndBottom &&
					rect.bottom > wndTop &&
					rect.left < wndRight &&
					rect.right > wndLeft
				) {
					if (item.isScrollContainer && !item.isShowing) {
						item.isShowing = true;
						item.el.dispatchEvent(new CustomEvent('scroll'));
						continue;
					}
					//Shown;
					if (!item.isShowing) {
						item.isShowing = true;
						item.isTriggered = true;
					}

					item.fn({
						isIntersecting: true,
						boundingClientRect: rect,
						time: 0,
						target: item.el,
						//rootBounds: null,
						//intersectionRect: null //We dont give these in native for more efficiency.
						//Instead we give, rootMargin reduced, amounts
						wndWidth: this.wndWidth,
						wndHeight: this.wndHeight,
						scrollTop: document.scrollingElement.scrollTop,
						scrollLeft: document.scrollingElement.scrollLeft
					})

				}
				else {
					//Hidden;
					if (item.isShowing) {

						item.isShowing = false;
						item.fn({
							isIntersecting: false,
							target: item.el
						})
					}
				}
			}

		}
		else {

			let target = evt.target;
			let scrollRect = target.getBoundingClientRect();

			for (let i = 0; i < this.scrollEntryItems.length; i++) {
				const item = this.scrollEntryItems[i];

				if (!item.continuous && item.isTriggered) {
					continue;
				}

				if (!item.overflowParent) {
					continue;
				}

				if (!item.isActive) {
					continue;
				}

				let st = scrollRect.top, sl = scrollRect.left, sr = scrollRect.right, sb = scrollRect.bottom;

				// if (item.options && item.options.rootMargin) {
				// 	var rootMargin = item.options.rootMargin.margin;
				// 	st += rootMargin[0];
				// 	sl += rootMargin[3];
				// 	sr -= rootMargin[1];
				// 	sb -= rootMargin[2];
				// }

				const rect = item.el.getBoundingClientRect();

				if (
					this.wndHeight > scrollRect.top &&
					scrollRect.bottom > 0 &&
					this.wndWidth > scrollRect.left &&
					scrollRect.right > 0
				) {

					if (
						rect.top < Math.min(this.wndHeight, sb) &&
						rect.bottom > Math.max(st, 0) &&
						rect.left < Math.min(this.wndWidth, sr) &&
						rect.right > Math.max(sl, 0)

					) {
						//Shown
						if (!item.isShowing) {
							item.isShowing = true;
						}
						item.fn({
							isIntersecting: true,
							boundingClientRect: rect,
							time: 0,
							target: item.el,
							//rootBounds: null,
							//intersectionRect: null //We dont give these in native for more efficiency.
							//Instead we give, rootMargin reduced, amounts
							scrolledWidth: (this.wndWidth - rect.left),
							scrolledHeight: (this.wndHeight - rect.top),
							scrollTop: target.scrollTop,
							scrollLeft: target.scrollLeft
						})
						continue;
					}
				}

				if (item.isShowing) {

					item.isShowing = false;
					item.fn({
						isIntersecting: false,
						target: item.el
					})
				}




			}
		}
	}

	onScroll(evt) {
		//raf
		requestAnimationFrame(() => {
			this.handleScroll(evt);
		});
	}

	onResize() {
		this.wndHeight = window.innerHeight;
		this.wndWidth = window.innerWidth;

	}

	onViewportChange() {
		this.setState({
			refreshToggle: !this.state.refreshToggle
		});
	}

	componentDidMount() {


		window.addEventListener("scroll", this.onScroll, { passive: true });
		window.addEventListener("resize", this.onResize);
		window.addEventListener("viewportchanged", this.onViewportChange);

	}

	componentWillUnmount() {

		window.removeEventListener("scroll", this.onScroll);
		window.removeEventListener("resize", this.onResize);
		window.removeEventListener("viewportchanged", this.onViewportChange);
	}

	render() {
		let val: NativeScrollContext = {
			addTracking: this.addTrackingFn,
			updateTracking: this.updateTrackingFn,
			removeTracking: this.removeTracking,
			sensorType: 'native'
		};

		return (
			<ScrollContextNativeScroll.Provider value={val}>
				{this.props.children}
			</ScrollContextNativeScroll.Provider>
		);
	}
}

export { ScrollContextNativeScroll };
export default ScrollSense;

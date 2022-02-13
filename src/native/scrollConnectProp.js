import React from "react";
import { info, warn } from "../Shared/log";
import { isRafAvailable } from "../Shared/modernizer";
import { ScrollContextNativeScroll } from "./ScrollSense";

/**
 * 
 * @param {React.Component} Component Component to connect
 * @param {{root, threshold, rootMargin}} options Parameters to intersection observer
 */
function scrollConnectProp(Component, options) {

	class ScrollConnected extends React.Component {
		static contextType = ScrollContextNativeScroll;
		isComplete = false;
		isRafAvailable = isRafAvailable();
		config = null;

		ioRecords = [];

		constructor(props) {
			super(props);

			this.onIntersection = this.onIntersection.bind(this);

			this.config = {
				rootMargin: options ? options.rootMargin || '0px' : '0px'
			};

			if (this.props.rootMargin) {
				this.config.rootMargin = this.props.rootMargin;
			}
		}

		onIntersection(el, fn, options) {
			if (!this.isComplete) {
				warn("Component still not mounted. To add an element to the tracking list, element must be mounted");
				return;
			}

			let isRootMarginSet = false;

			//we create this because, config belong to this component is shared all components. But this rootMargin argument is only for this onIntersection call.			
			let thisConfig = {...this.config};

			if (options && options.rootMargin) {
				thisConfig.rootMargin = options.rootMargin;
				isRootMarginSet = true;
			}

			if (el) {

				this.ioRecords.push({
					el,
					fn,
					config: thisConfig,
					flags: {
						isRootMarginSet
					}
				});

				const ioActions = this.context.addTracking(el, fn, {
					rootMargin: this.config.rootMargin
				});

				return ioActions;
			}
			else {
				warn('There is no dom element to attach the scroll sense');
				return null;
			}


		}

		updateIObservers(rootMargin) {
			let self = this;

			for (let i = 0; i < this.ioRecords.length; i++) {
				const ioRecord = this.ioRecords[i];

				this.context.updateTracking(ioRecord.el, fn, {
					rootMargin: ioRecord.flags.isRootMarginSet ? ioRecord.config.rootMargin : (ioRecord.config.rootMargin = rootMargin)
				})


			}

		}


		componentDidUpdate(prevProps) {

			let flag = false;
			if (this.props.rootMargin && prevProps.rootMargin != this.props.rootMargin) {
				this.config.rootMargin = this.props.rootMargin;
				flag = true;
			}
			
			if (flag)
				this.updateIObservers(this.config.rootMargin);
		}

		componentDidMount() {

			this.isComplete = true;
		}

		render() {

			return (
				<Component {...this.props} onIntersection={this.onIntersection} />
			);
		}
	}

	return ScrollConnected;
}

export default scrollConnectProp;

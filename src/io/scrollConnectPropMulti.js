import React from "react";
import { info, warn } from "../shared/log";
import { isRafAvailable } from "../shared/modernizer";
import { ScrollContextIntersectionObserver } from "./ScrollSense";

/**
 * 
 * @param {React.Component} Component Component to connect
 * @param {{root, threshold, rootMargin}} options Parameters to intersection observer
 */
function scrollConnectPropMulti(Component, options) {

	class ScrollConnectedMulti extends React.Component {
		static contextType = ScrollContextIntersectionObserver;
		isComplete = false;
		isRafAvailable = isRafAvailable();
		config = null;

		ioRecords = [];

		constructor(props) {
			super(props);

			this.onIntersection = this.onIntersection.bind(this);

			this.config = {
				threshold: options ? options.threshold || 0.5 : 0.5,
				root: options?.root,
				rootMargin: options ? options.rootMargin || '0px' : '0px'
			};

			if (this.props.threshold) {
				this.config.threshold = this.props.threshold;
			}

			if (this.props.root !== undefined) {
				this.config.root = this.props.root;
			}

			if (this.props.rootMargin) {
				this.config.rootMargin = this.props.rootMargin;
			}
		}

		onIntersection(el, fn, options) {
			if (!this.isComplete) {
				warn("Component still not mounted. To add an element to the tracking list, element must be mounted");
				return;
			}

			let isThresholdSet = false, isRootSet = false, isRootMarginSet = false;

			let thisConfig = {...this.config};

			if (options && options.threshold) {
				thisConfig.threshold = options.threshold;
				isThresholdSet = true;
			}

			if (options && options.root !== undefined) {
				thisConfig.root = options.root;
				isRootSet = true;
			}

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
						isRootMarginSet,
						isRootSet,
						isThresholdSet
					}
				});

				const ioActions = this.context.addToMultipleio(el, (ioEntry) => {

					ioEntry.forEach((entry) => {
						if (this.isRafAvailable) {
							window.requestAnimationFrame((time) => {
								fn(entry, el, time);
							})
							return;
						}
						else {
							fn(entry, el);
						}


					});

				}, {
					threshold: this.config.threshold,
					root: this.config.root,
					rootMargin: this.config.rootMargin
				});

				return ioActions;
			}
			else {
				warn('ScrollSense: There is no dom element to attach the scroll sense');
				return {};
			}


		}

		updateIObservers(threshold, root, rootMargin) {
			let self = this;

			for (let i = 0; i < this.ioRecords.length; i++) {
				const ioRecord = this.ioRecords[i];

				this.context.updateMultipleio(ioRecord.el, (ioEntry) => {

					ioEntry.forEach((entry) => {
						if (this.isRafAvailable) {
							window.requestAnimationFrame((time) => {
								ioRecord.fn(entry, ioRecord.el, time);
							})
							return;
						}
						else {
							ioRecord.fn(entry, ioRecord.el);
						}


					});

				}, {
					threshold: ioRecord.flags.isThresholdSet ? ioRecord.config.threshold : (ioRecord.config.threshold = threshold),
					root: ioRecord.flags.isRootSet ? ioRecord.config.root : (ioRecord.config.root = root),
					rootMargin: ioRecord.flags.isRootMarginSet ? ioRecord.config.rootMargin : (ioRecord.config.rootMargin = rootMargin)
				})


				console.log('root', ioRecord);


			}

		}


		componentDidUpdate(prevProps) {

			let flag = false;
			if (this.props.root !== undefined && prevProps.root != this.props.root) {
				this.config.root = this.props.root;
				flag = true;
			}
			if (this.props.threshold && prevProps.threshold != this.props.threshold) {
				this.config.threshold = this.props.threshold;
				flag = true;
			}
			if (this.props.rootMargin && prevProps.rootMargin != this.props.rootMargin) {
				this.config.rootMargin = this.props.rootMargin;
				flag = true;
			}

			if (flag)
				this.updateIObservers(this.config.threshold, this.config.root, this.config.rootMargin);
		}

		componentDidMount() {

			this.isComplete = true;
		}

		render() {

			info('rendera', this.props)
			return (
				<Component {...this.props} onIntersection={this.onIntersection} />
			);
		}
	}

	return ScrollConnectedMulti;
}

export default scrollConnectPropMulti;

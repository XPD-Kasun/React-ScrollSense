import React from "react";
import { warn } from "../shared/log";
import { isRafAvailable } from "../shared/modernizer";
import { ScrollContextIntersectionObserver } from "./ScrollSense";
import {ConnectOptionsType, ScrollConnectedCallbackProps } from '../types';

function scrollConnectPropSingle(Component: React.ComponentType<any>) {

	return class extends React.Component<ScrollConnectedCallbackProps, null> {
		static contextType = ScrollContextIntersectionObserver;

		isRafAvailable = isRafAvailable();
		isComplete = false;

		constructor(props) {
			super(props);
			this.onIntersection = this.onIntersection.bind(this);
		}

		onIntersection(el, fn) {
			if (!this.isComplete) {
				warn("Component still not mounted. To add an element to the tracking list, element must be mounted");
				return;
			}

			const sensorProxy = this.context.addToSingleio(el, (scrollInfo) => {
				
				if (this.isRafAvailable) {
					window.requestAnimationFrame((time) => {
						fn(scrollInfo, el, time);
					})
					return;
				}
				else {
					fn(scrollInfo, el);
				}

			});

			return sensorProxy;


		}

		componentDidMount() {

			this.isComplete = true;

		}

		render() {
			return (
				<Component {...this.props}
					onIntersection={this.onIntersection}/>
			);
		}
	}

}


export default scrollConnectPropSingle;



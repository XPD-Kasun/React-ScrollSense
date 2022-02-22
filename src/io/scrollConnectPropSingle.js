import React from "react";
import { warn } from "../shared/log";
import { isRafAvailable } from "../shared/modernizer";
import { ScrollContextIntersectionObserver } from "./ScrollSense";

function scrollConnectPropSingle(Component) {

	class ScrollConnectedSingle extends React.Component {
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

			const ioActions = this.context.addToSingleio(el, (scrollInfo) => {
				console.log('s', scrollInfo);
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

			return ioActions;


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

	return ScrollConnectedSingle;
}


export default scrollConnectPropSingle;



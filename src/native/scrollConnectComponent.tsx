import React, { ReactNode } from "react";
import { warn } from "../shared/log";
import { ScrollContextNativeScroll } from "./ScrollSense";
import { ScrollConnectedComponentProps, ScrollConnectedComponentState, ConnectOptionsType } from '../types';


function scrollConnectComponent(
	Component: React.ComponentType<any>,
	mapProps: (ScrollSensorEvent) => any,
	options: ConnectOptionsType
) {

	return class extends React.Component<ScrollConnectedComponentProps, ScrollConnectedComponentState> {
		static contextType = ScrollContextNativeScroll;

		showTrue = {
			show: true
		};

		showFalse = {
			show: false
		};

		ref = React.createRef<HTMLDivElement>();

		config = {
			rootMargin: options ? options.rootMargin || '0px 0px' : '0px 0px'
		};

		constructor(props: ScrollConnectedComponentProps) {
			super(props);

			this.state = {
				scrollInfo: {
					isIntersecting: false
				},
				sensorProxy: null
			};

			if (props.rootMargin) {
				this.config.rootMargin = props.rootMargin;
			}

		}

		componentDidMount() {
			let self = this;
			let targetEl = this.ref.current.children[0];
			if (targetEl) {
				const sensorProxy = this.context.addTracking(targetEl, (scrollInfo) => {
					self.setState({
						scrollInfo
					})
				}, {
					rootMargin: this.config.rootMargin
				});

				this.setState({
					sensorProxy: sensorProxy
				});
			}
			else {
				warn('There is no dom element to attach the scroll sense');
			}
		}

		componentDidUpdate(prevProps) {

			let flag = false;

			if (this.props.rootMargin != prevProps.rootMargin) {
				this.config.rootMargin = this.props.rootMargin;
				flag = true;
			}

			if (flag) {

				this.context.updateTracking(this.ref.current.children[0], (scrollInfo) => {

					this.setState({
						scrollInfo
					})

				}, {
					rootMargin: this.config.rootMargin
				})


			}

		}


		render() {
			// let prop = this.getProp(this.context);
			let prop = mapProps(this.state.scrollInfo);

			console.log('rendera', this.props)
			return (
				<div ref={this.ref}>
					<Component {...this.props} {...prop} {...this.state.sensorProxy} />
				</div>
			);
		}
	}
}

export default scrollConnectComponent;

import React from "react";
import { warn } from "../shared/log";
import { ScrollContextIntersectionObserver } from "./ScrollSense";

function scrollConnectComponentSingle(Component: React.ComponentType<any>, mapProps: (ConnectOptionsType) => any) {
	
	class ScrollConnectedSingle extends React.Component<ScrollConnectedPropType, ScrollConnectedStateType>  {
		static contextType = ScrollContextIntersectionObserver;

		ref = React.createRef<HTMLDivElement>();
		
		constructor(props) {
			super(props);

			if(!mapProps){
				mapProps = (arg) => ({
					scrollInfo: arg
				});
			}

			this.state = {
				scrollInfo:  {
					isIntersecting: false
				},
				sensorProxy: null
			}


		}

		componentDidMount() {
			let self = this;
			let targetEl = this.ref.current.children[0];
			if (targetEl) {

				const sensorProxy = this.context.addToSingleio(targetEl, (scrollInfo) => {
					console.log('s', scrollInfo);
					self.setState({
						scrollInfo: scrollInfo
					})
				});

				
				this.setState({
					sensorProxy: sensorProxy
				});
			}
			else{
				warn('There is no dom element to attach the scroll sense');
			}
		}

		render() {
			// let prop = this.getProp(this.context);
			let prop = mapProps(this.state.scrollInfo);

			return (
				<div ref={this.ref}>
					<Component {...this.props} {...prop} {...this.state.sensorProxy} />
				</div>
			);
		}
	}

	return ScrollConnectedSingle;
}

export default scrollConnectComponentSingle;

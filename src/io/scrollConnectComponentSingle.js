import React from "react";
import { warn } from "../shared/log";
import { ScrollContextIntersectionObserver } from "./ScrollSense";

function scrollConnectComponentSingle(Component, mapProps) {
	
	class ScrollConnectedSingle extends React.Component {
		static contextType = ScrollContextIntersectionObserver;

		ref = React.createRef();
		
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
				ioActions: null
			}


		}

		componentDidMount() {
			let self = this;
			let targetEl = this.ref.current.children[0];
			if (targetEl) {

				const ioActions = this.context.addToSingleio(targetEl, (scrollInfo) => {
					console.log('s', scrollInfo);
					self.setState({
						scrollInfo: scrollInfo
					})
				});

				
				this.setState({
					ioActions: ioActions
				});
			}
			else{
				warn('There is no dom element to attach the scroll sense');
			}
		}

		render() {
			// let prop = this.getProp(this.context);
			let prop = mapProps(this.state.scrollInfo);

			console.log('rendera', this.props)
			return (
				<div ref={this.ref}>
					<Component {...this.props} {...prop} {...this.state.ioActions} />
				</div>
			);
		}
	}

	return ScrollConnectedSingle;
}

export default scrollConnectComponentSingle;

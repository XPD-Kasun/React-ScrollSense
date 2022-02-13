import React from "react";
import { warn } from "../Shared/log";
import { ScrollContextNativeScroll } from "./ScrollSense";

function scrollConnectComponent(Component, mapProps, options) {

	class ScrollConnected extends React.Component {
		static contextType = ScrollContextNativeScroll;

		showTrue = {
			show: true
		};

		showFalse = {
			show: false
		};

		ref = React.createRef();

		config = {
			rootMargin: options? options.rootMargin || '0px 0px': '0px 0px'
		};

		constructor(props) {
			super(props);

			this.state = {
				scrollInfo:  {
					isIntersecting: false
				},
				ioActions: null
			};

			if(props.rootMargin){
				this.config.rootMargin = props.rootMargin;
			}
			
		}

		componentDidMount() {
			let self = this;
			let targetEl = this.ref.current.children[0];
			if (targetEl) {
				const ioActions = this.context.addTracking(targetEl, (scrollInfo) => {
					self.setState({
						scrollInfo
					})
				}, {
					rootMargin: this.config.rootMargin
				});

				this.setState({
					ioActions: ioActions
				});
			}
			else{
				warn('There is no dom element to attach the scroll sense');
			}
		}

		componentDidUpdate(prevProps){

			let flag = false;

			if(this.props.rootMargin != prevProps.rootMargin){
				this.config.rootMargin  = this.props.rootMargin;
				flag = true;
			}

			if(flag){

				this.context.updateTracking(this.ref.current.children[0], (scrollInfo)=>{

					this.setState({
						scrollInfo
					})

				},{
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
					<Component {...this.props} {...prop} {...this.state.ioActions} />
				</div>
			);
		}
	}

	return ScrollConnected;
}

export default scrollConnectComponent;

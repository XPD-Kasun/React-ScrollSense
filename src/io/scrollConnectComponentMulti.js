import React from "react";
import { info, warn } from "../Shared/log";
import { ScrollContextIntersectionObserver } from "./ScrollSense";

function scrollConnectComponentMulti(Component, mapProps, options) {

	class ScrollConnectedMulti extends React.Component {
		static contextType = ScrollContextIntersectionObserver;
		//static root = null;
		config = null;

		ref = React.createRef();

		constructor(props) {

			console.log('multi ', props);
			super(props);

			if (!mapProps) {
				mapProps = (arg) => ({
					scrollInfo: arg
				});
			}

			this.state = {
				scrollInfo: { isIntersecting: false },
				ioActions: null
			}

			this.config = {
				threshold: options ? options.threshold || 0.5 : 0.5,
				root: options?.root,
				rootMargin: options ? options.rootMargin || '0px': '0px'
			};

			if (this.props.threshold) {
				this.config.threshold = this.props.threshold;
			}
			
			if (this.props.root !== undefined) {
				this.config.root = this.props.root;
			}

			if(this.props.rootMargin){
				this.config.rootMargin = this.props.rootMargin;
			}
		}

		attachIObserver(threshold, root, rootMargin) {
			let self = this;
			let targetEl = this.ref.current.children[0];
			if (targetEl) {

				const ioActions = this.context.addToMultipleio(targetEl, (ioEntry) => {

					ioEntry.forEach((entry) => {
						console.log('s', entry);
						self.setState({
							scrollInfo: entry
						})

					})


				}, {
					threshold: threshold,
					root: root,
					rootMargin: rootMargin
				})

				this.setState({
					ioActions: ioActions
				});
			}
			else {
				warn('ScrollSense: There is no dom element to attach the scroll sense');
			}
		}

		updateIObserver(threshold, root, rootMargin) {
			let self = this;
			let targetEl = this.ref.current.children[0];
			if (targetEl) {

				const ioActions = this.context.updateMultipleio(targetEl, (ioEntry) => {
					console.log('root', root);
					ioEntry.forEach((entry) => {
						console.log('s', entry);
						self.setState({
							scrollInfo: entry
						})

					})


				}, {
					threshold: threshold,
					root: root,
					rootMargin: rootMargin
				})

			}
			else {
				warn('ScrollSense: There is no dom element to attach the scroll sense');
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
				this.updateIObserver(this.config.threshold, this.config.root, this.config.rootMargin);
		}

		componentDidMount() {

			this.attachIObserver(this.config.threshold, this.config.root, this.config.rootMargin);
		}

		render() {
			// let prop = this.getProp(this.context);
			let prop = mapProps(this.state.scrollInfo);

			info('rendera', this.props)
			return (
				<div ref={this.ref}>
					<Component {...this.props} {...prop} {...this.state.ioActions} />
				</div>
			);
		}
	}

	return ScrollConnectedMulti;
}

export default scrollConnectComponentMulti;

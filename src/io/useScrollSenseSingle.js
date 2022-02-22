import { useContext } from 'react';
import { isRafAvailable } from '../shared/modernizer';
import { ScrollContextIntersectionObserver } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

const rafAvailable = isRafAvailable();

function useScrollSenseSingle() {

	const scrollSense = useContext(ScrollContextIntersectionObserver);

	return {
		onIntersection: (el, fn, options) => {
			const ioActions = scrollSense.addToSingleio(el, (scrollInfo) => {

				console.log('s', scrollInfo);
				if (rafAvailable) {
					window.requestAnimationFrame((time) => {
						fn(scrollInfo, el, time);
					})
					return;
				}
				else {
					fn(scrollInfo, el);
				}

			}, options);

			return ioActions;
		}
	}

}

export default useScrollSenseSingle;
import { useContext } from 'react';
import { isRafAvailable } from '../shared/modernizer';
import { ScrollContextIntersectionObserver } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

const rafAvailable = isRafAvailable();

function useScrollSenseMulti() {

	const scrollSense = useContext(ScrollContextIntersectionObserver);

	return {
		onIntersection: (el, fn, options) => {
			const ioActions = scrollSense.addToMultipleio(el, (ioEntry) => {

				ioEntry.forEach((entry) => {
					if (rafAvailable) {
						window.requestAnimationFrame((time) => {
							fn(entry, el, time);
						})
						return;
					}
					else {
						fn(entry, el);
					}


				});

			}, options);

			return ioActions;
		}
	}

}

export default useScrollSenseMulti;
import { useContext, useMemo } from 'react';
import errorStrings from '../shared/errorStrings';
import { error } from '../shared/log';
import { ScrollContextNativeScroll } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

function useScrollSense() {

	const scrollSense = useContext(ScrollContextNativeScroll);
	if (scrollSense && scrollSense.sensorType !== 'native') {
		error(errorStrings.nativeConnectWithWrongProvider);
	}

	const sensorEndpoint = useMemo(() => {

		return {
			onIntersection: (el, fn, options) => {
				const ioActions = scrollSense.addTracking(el, fn, options);
				return ioActions;
			},
			detach: (el) => {

				scrollSense.removeTracking(el);

			}
		}

	}, []);

	return sensorEndpoint;

}


export default useScrollSense;
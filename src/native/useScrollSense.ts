import { useContext, useMemo } from 'react';
import errorStrings from '../shared/errorStrings';
import { error } from '../shared/log';
import { ScrollContextNativeScroll } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

function useScrollSense() {

	const scrollSense = useContext(ScrollContextNativeScroll);
	if(!scrollSense){
		throw new Error('No event based sensor has found. Did you add ScrollSense provider component?')
	}
	if (scrollSense && scrollSense.sensorType !== 'native') {
		error(errorStrings.nativeConnectWithWrongProvider);
	}

	const sensorEndpoint = useMemo(() => {

		return {
			onIntersection: (el, fn, options) => {
				const sensorProxy = scrollSense.addTracking(el, fn, options);
				return sensorProxy;
			},
			detach: (el) => {

				scrollSense.removeTracking(el);

			}
		}

	}, [scrollSense]);

	return sensorEndpoint;

}


export default useScrollSense;
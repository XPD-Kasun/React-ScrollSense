import { useContext } from 'react';
import errorStrings from '../shared/errorStrings';
import { error } from '../shared/log';
import { isRafAvailable } from '../shared/modernizer';
import { ScrollContextNativeScroll } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

const rafAvailable = isRafAvailable();

function useScrollSense() {

	const scrollSense = useContext(ScrollContextNativeScroll);
       if(scrollSense && scrollSense.sensorType !== 'native') {
              error(errorStrings.nativeConnectWithWrongProvider);
       }

	return {
		onIntersection: (el, fn, options) => {
			const ioActions = scrollSense.addTracking(el, fn, options);

			return ioActions;
		}
	}

}

export default useScrollSense;
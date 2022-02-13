import { useContext } from 'react';
import errorStrings from '../Shared/errorStrings';
import { error } from '../Shared/log';
import { isRafAvailable } from '../Shared/modernizer';
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
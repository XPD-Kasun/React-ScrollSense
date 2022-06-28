import { useContext, useMemo, useRef } from 'react';
import errorStrings from '../shared/errorStrings';
import { error } from '../shared/log';
import { ScrollContextNativeScroll } from './ScrollSense';
import { ScrollSensorEvent, Tracker } from '../types';
import { isRafAvailable } from '../shared/modernizer';
/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

interface ElToFnMap {
       [elId: string]: {
              tracker: Tracker,
              fn: (evt: ScrollSensorEvent) => any
       }
}

function useScrollSense() {

	const scrollSense = useContext(ScrollContextNativeScroll);
       const elRef = useRef<ElToFnMap>({});

	if(!scrollSense){
		throw new Error('No event based sensor has found. Did you add ScrollSense provider component?')
	}
	if (scrollSense && scrollSense.sensorType !== 'native') {
		error(errorStrings.nativeConnectWithWrongProvider);
	}

	const sensorEndpoint = useMemo(() => {

		return {
			onIntersection: (el: HTMLElement, fn: (evt: ScrollSensorEvent) => any, options?) => {				

                            let elVal = el.getAttribute('data-scroll-id');

                            if (elRef.current[elVal] && (elRef.current[elVal].fn != fn)) {
                                   elRef.current[elVal].fn = fn;
                                   return elRef.current[elVal].tracker;
                            }

				const tracker = scrollSense.addTracking(el, (ioEntry) => {

					let targetFn = elRef.current[ioEntry.target.getAttribute('data-scroll-id')].fn;

					if (isRafAvailable) {
						window.requestAnimationFrame((time) => {
							targetFn(ioEntry);
						})
						return;
					}
					else {
						targetFn(ioEntry);
					}

				}, options);
 
				elVal = el.getAttribute('data-scroll-id');
                            elRef.current[elVal] = {
                                   fn,
                                   tracker
                            };

				return tracker;
			},
			detach: (el) => {

				scrollSense.removeTracking(el);

			}
		}

	}, [scrollSense]);

	return sensorEndpoint;

}


export default useScrollSense;
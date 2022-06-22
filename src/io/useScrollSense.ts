import { useContext, useMemo } from 'react';
import errorStrings from '../shared/errorStrings';
import { error } from '../shared/log';
import { isRafAvailable } from '../shared/modernizer';
import { ScrollContextIntersectionObserver } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

const rafAvailable = isRafAvailable();

function useScrollSense(useMultipleIOs = true) {

       const scrollSense = useContext(ScrollContextIntersectionObserver);
       
	if(!scrollSense){
		throw new Error('No intersection observer sensor has found. Did you add ScrollSense provider component?');
	}
       if (scrollSense && scrollSense.sensorType !== 'io') {
              error(errorStrings.ioConnectWithWrongProvider);
       }

       const sensorEndpoint = useMemo(() => {

              return {
                     onIntersection: (el, fn, options) => {

                            if (!scrollSense) {
                                   error(errorStrings.noScrollProvider);
                                   return;
                            }

                            let sensorProxy = null;

                            if (useMultipleIOs) {

                                   sensorProxy = scrollSense.addToMultipleio(el, (ioEntry) => {

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
                            }
                            else {

                                   sensorProxy = scrollSense.addToSingleio(el, (scrollInfo) => {

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
                            };

                            return sensorProxy;
                     },
                     detach: (el) => {

                            scrollSense.removeTracking(el, useMultipleIOs)

                     }
              }

       }, [scrollSense]);

       return sensorEndpoint;

}

export default useScrollSense;
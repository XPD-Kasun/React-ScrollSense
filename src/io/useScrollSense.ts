import { useContext, useMemo, useRef } from 'react';
import errorStrings from '../shared/errorStrings';
import { error } from '../shared/log';
import { isRafAvailable } from '../shared/modernizer';
import { ScrollContextIntersectionObserver } from './ScrollSense';
import { ScrollSensorEvent, Tracker } from '../types';
import { isNumeric } from '../shared/isNumeric';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

const rafAvailable = isRafAvailable();

interface ElToFnMap {
       [elId: string]: {
              sensorProxy: Tracker,
              fn: (evt: ScrollSensorEvent) => any
       }
}

function useScrollSense(useMultipleIOs = false) {

       const scrollSense = useContext(ScrollContextIntersectionObserver);
       const elRef = useRef<ElToFnMap>({});

       if (!scrollSense) {
              throw new Error('No intersection observer sensor has found. Did you add ScrollSense provider component?');
       }
       if (scrollSense && scrollSense.sensorType !== 'io') {
              error(errorStrings.ioConnectWithWrongProvider);
       }

       const sensorEndpoint = useMemo(() => {

              return {
                     onIntersection: (el: HTMLElement, fn: (evt: ScrollSensorEvent) => any, options?) => {

                            if (!scrollSense) {
                                   error(errorStrings.noScrollProvider);
                                   return null;
                            }

                            let elVal = el.getAttribute('data-scroll-id');

                            if (elRef.current[elVal] && (elRef.current[elVal].fn != fn)) {
                                   elRef.current[elVal].fn = fn;
                                   return elRef.current[elVal].sensorProxy;
                            }

                            let sensorProxy = null;

                            if (useMultipleIOs) {

                                   sensorProxy = scrollSense.addToMultipleio(el, (ioEntry) => {

                                          let targetFn = elRef.current[ioEntry.target.getAttribute('data-scroll-id')].fn;

                                          if (rafAvailable) {
                                                 window.requestAnimationFrame((time) => {
                                                        targetFn(ioEntry);
                                                 })
                                                 return;
                                          }
                                          else {
                                                 targetFn(ioEntry);
                                          }

                                   }, options);
                            }
                            else {

                                   sensorProxy = scrollSense.addToSingleio(el, (ioEntry) => {

                                          let targetFn = elRef.current[ioEntry.target.getAttribute('data-scroll-id')].fn;

                                          if (rafAvailable) {
                                                 window.requestAnimationFrame((time) => {
                                                        targetFn(ioEntry);
                                                 })
                                                 return;
                                          }
                                          else {
                                                 targetFn(ioEntry);
                                          }

                                   }, options);
                            };

                            elVal = el.getAttribute('data-scroll-id');
                            elRef.current[elVal] = {
                                   fn,
                                   sensorProxy
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
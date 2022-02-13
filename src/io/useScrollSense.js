import { useContext } from 'react';
import errorStrings from '../Shared/errorStrings';
import { error } from '../Shared/log';
import { isRafAvailable } from '../Shared/modernizer';
import { ScrollContextIntersectionObserver } from './ScrollSense';

/**
 * Hooks for scroll sense. These are only running given function wrapped with raf if available.
 */

const rafAvailable = isRafAvailable();

function useScrollSense(useMultipleIOs = false) {

       const scrollSense = useContext(ScrollContextIntersectionObserver);
       if(scrollSense && scrollSense.sensorType !== 'io') {
              error(errorStrings.ioConnectUseWrongProvider);
       }

       return {
              onIntersection: (el, fn, options) => {

                     if(!scrollSense) {
                            console.log('no scroll provider');
                            return;
                     }

                     let ioActions = null;

                     if (useMultipleIOs) {

                            ioActions = scrollSense.addToMultipleio(el, (ioEntry) => {

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
                            
                            ioActions = scrollSense.addToSingleio(el, (scrollInfo) => {

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
                     }                    

                     return ioActions;
              }
       }

}

export default useScrollSense;
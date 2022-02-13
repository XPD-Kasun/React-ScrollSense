import { useEffect, useRef } from 'react';
import {useScrollSense} from '../../io'

function ScrollBox({height}) {

       let scrollBoxRef = useRef();
       let ioActions = useScrollSense();

       useEffect(() => {

              ioActions.onIntersection(scrollBoxRef.current, (...s) => {
                     console.log('intersected', s);
              });
       });
       

       return (
              <div ref={scrollBoxRef} style={{width: '100%', height: height, margin: 20, backgroundColor: 'red'}}>
                     Scroller
              </div>
       )
};

export default ScrollBox;
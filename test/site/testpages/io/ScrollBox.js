import { useEffect, useRef } from 'react';
import { useScrollSense } from 'react-scrollsense/io';

function ScrollBox({ height }) {

       let scrollBoxRef = useRef();
       let ioActions = useScrollSense(false);

       useEffect(() => {

              ioActions.onIntersection(scrollBoxRef.current, (ioEntry) => {

                     let el = ioEntry.target;
                     
                     if (ioEntry.isIntersecting) {
                            el.style.backgroundColor = '#00ff00';
                     }
                     else {
                            el.style.backgroundColor = '#7a7a7a';
                     }

              });
       }, []);


       return (
              <div ref={scrollBoxRef} className="scroll-box">
                     Scroller
                     <div className="test"></div>
              </div>
       )
};

export default ScrollBox;
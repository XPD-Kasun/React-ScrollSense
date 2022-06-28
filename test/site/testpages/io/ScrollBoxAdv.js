import { useEffect, useRef } from 'react';
import { useScrollSense } from 'react-scrollsense/io';

function ScrollBoxAdv({ height }) {

       let scrollBoxRef = useRef();
       let sensor = useScrollSense(true);

       const onBtnClick = () => {

              sensor.detach(scrollBoxRef.current);

       };


       useEffect(() => {

              sensor.onIntersection(scrollBoxRef.current, (ioEntry) => {

                     let el = ioEntry.target;
                     
                     if (ioEntry.isIntersecting) {
                            el.style.backgroundColor = '#00ff00';
                     }
                     else {
                            el.style.backgroundColor = '#7a7a7a';
                     }

              });

              return () => sensor.detach(scrollBoxRef.current);

       }, [sensor]);


       return (
              <div ref={scrollBoxRef} className="scroll-box">
                     <button onClick={onBtnClick} className="btn">Some button</button>
                     Scroller
              </div>
       )
};

export default ScrollBoxAdv;
const { useEffect, useRef, useState } = require("react");
const { useScrollSense } = require("react-scrollsense")
import { getVisibleHeight } from 'react-scrollsense/helpers';

function ScrollBox() {

       let scrollRef = useRef();
       let sensor = useScrollSense();
       let [scrollBoxCls, setScrollBoxCls] = useState('scroll-box');

       useEffect(() => {

              sensor.onIntersection(scrollRef.current, (ioEntry) => {

                     if (ioEntry.isIntersecting) {
                            setScrollBoxCls('scroll-box intersecting');
                            let testEl = ioEntry.target.getElementsByClassName('test')[0];
                            if(testEl) {
                                   testEl.innerText = getVisibleHeight(ioEntry);
                            }
                     }
                     else {
                            setScrollBoxCls('scroll-box');
                     }

              }, {
                     rootBound: [0, 100, 0, 0]
              });

       }, []);

       return (
              <div ref={scrollRef} className={scrollBoxCls}>
                     Scroller
                     <div className="test"></div>
              </div>
       )
}

export default ScrollBox;
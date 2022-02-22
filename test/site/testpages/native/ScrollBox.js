const { useEffect, useRef, useState } = require("react");
const { useScrollSense } = require("react-scrollsense")

function ScrollBox() {

       let scrollRef = useRef();
       let sensor = useScrollSense();
       let [scrollBoxCls, setScrollBoxCls] = useState('scroll-box');

       useEffect(() => {

              sensor.onIntersection(scrollRef.current, (ioEntry, el, time) => {

                     if (ioEntry.isIntersecting) {
                            setScrollBoxCls('scroll-box intersecting');
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
              </div>
       )
}

export default ScrollBox;
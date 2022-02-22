// for scroll event based implementation,
import { useScrollSense } from "react-scrollsense";
// Or, for intersection observer implementation use,
// import {useScrollSense}  from 'react-scrollsense/io';
import { useEffect, useRef, useState } from "react";

function MyAwesomeComponent() {
       const sensor = useScrollSense();
       const ref = useRef();
       const [cls, setCls] = useState("my-component");

       useEffect(() => {
              console.log("new one");
              let tracker = sensor.onIntersection(
                     ref.current,
                     (entry, el) => {
                            if (entry.isIntersecting) {
                                   // Now its on screen let's change class
                                   setCls("my-component scrolled");
                            } else {
                                   // It's off screen
                                   setCls("my-component");
                            }
                     },
                     {
                            rootMargin: "30px"
                     }
              );

              return () => {
                     sensor.detach(ref.current);
              };
       }, [sensor]);

       const detach = () => {
              sensor.detach(ref.current);
       };

       return (
              <div className={cls} ref={ref} onClick={detach}>
                     Hello, Scroll Me!
              </div>
       );
}

export default MyAwesomeComponent;

import react, { useEffect, useRef } from 'react';
import ScrollSense, { useScrollSense } from 'react-scrollsense/io';
import ScrollBox from './ScrollBox';

export default function NestingScrollerItem() {


       return (
              <div className="nested-scroller-test">
                     <ScrollSense config={{ threshold: 0.25 }}>
                            <div style={{ width: '100%', height: 1500, background: '#aaa' }}></div>
                            <ul className="list-test" style={{height: 200, overflow: 'auto'}}>
                                   {
                                          new Array(10).fill(1).map((x, i) => <ListItem val={i}></ListItem>)
                                   }
                            </ul>
                     </ScrollSense>
              </div>
       )
};

const ListItem = ({val}) => {

       let ref = useRef();
       let sensor = useScrollSense();

       useEffect(() => {

              sensor.onIntersection(ref.current, (scrollEvent) => {

                     if (scrollEvent.isIntersecting) {
                            scrollEvent.target.style.background = 'yellow';
                            scrollEvent.target.classList.add('intersecting');
                     }
                     else {
                            scrollEvent.target.style.background = 'green';
                            scrollEvent.target.classList.remove('intersecting');
                     }

              });

       }, [sensor])

       return (
              <div className="list-item" ref={ref} style={{ width: '100%', height: 100, margin: 2, border: '1px solid #777' }}>
                     {val}
              </div>
       )
};
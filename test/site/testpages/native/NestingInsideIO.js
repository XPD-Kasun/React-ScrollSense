import react from 'react';
import ScrollSense from 'react-scrollsense';
import ScrollSenseIO from 'react-scrollsense/io';
import ScrollBox from './ScrollBox';

export default function NestingProviders() {

       return (
              <div>
                     <ScrollSenseIO config={{ threshold: '50%' }}>
                            <div style={{ height: 1500, width: '100%', background: '#eee' }}>Hello</div>
                            <NestedComponent></NestedComponent>
                     </ScrollSenseIO>
              </div>

       )

}

const NestedComponent = () => {

       return (
              <div>
                     <ScrollSense config={{ delay: 100 }}>
                            {
                                   Array(3).fill(undefined).map(() => <ScrollBox></ScrollBox>)
                            }
                            <ScrollSense config={{ delay: 3000 }}>
                                   <ScrollBox></ScrollBox>
                            </ScrollSense>
                     </ScrollSense>
              </div>
       )
};

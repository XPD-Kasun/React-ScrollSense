import react from 'react';
import ScrollSense from 'react-scrollsense';
import ScrollSenseIO from 'react-scrollsense/io';
import ScrollBox from './ScrollBox';

export default function NestingProviders() {

       return (
              <div>
                     <ScrollSense config={{ delay: '3000ms' }}>
                            <div style={{ height: 1500, width: '100%', background: '#eee' }}>Hello</div>
                            <NestedComponent></NestedComponent>
                     </ScrollSense>
              </div>

       )

}

const NestedComponent = () => {

       return (
              <div>
                     <ScrollSenseIO config={{ threshold: '75%'}}>
                            {
                                   Array(3).fill(undefined).map(() => <ScrollBox></ScrollBox>)
                            }
                            <ScrollSenseIO config={{ threshold: '25%' }}>
                                   <ScrollBox></ScrollBox>
                            </ScrollSenseIO>
                     </ScrollSenseIO>
              </div>
       )
};

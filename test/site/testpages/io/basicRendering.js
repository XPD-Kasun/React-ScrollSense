import ScrollSense from 'react-scrollsense/io';
import ScrollBox from './ScrollBox';

function BasicRendering() {

       return (
              <div>
                     <ScrollSense  config={{threshold: '10px'}}>
                            <div className="big-box"></div>
                            <ScrollBox></ScrollBox>
                     </ScrollSense>
              </div>
       );
}

export default BasicRendering;
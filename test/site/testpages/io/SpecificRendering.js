import ScrollSense from 'react-scrollsense/io';
import ScrollBoxAdv from './ScrollBoxAdv';

function SpecificRendering() {

       return (
              <div>
                     <ScrollSense  config={{threshold: '200px'}}>
                            <div className="big-box"></div>
                            <ScrollBoxAdv></ScrollBoxAdv>
                     </ScrollSense>
              </div>
       );
}

export default SpecificRendering;
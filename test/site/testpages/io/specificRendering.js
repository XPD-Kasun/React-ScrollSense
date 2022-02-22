import ScrollSense from 'react-scrollsense/io';
import ScrollBoxAdv from './ScrollBoxAdv';
import MyAwesomeComponent from './MyAwesomeComponent';

function SpecificRendering() {

       return (
              <div>
                     <ScrollSense  config={{threshold: '200px'}}>
                            <div className="big-box"></div>
                            <ScrollBoxAdv></ScrollBoxAdv>
                            <MyAwesomeComponent></MyAwesomeComponent>
                     </ScrollSense>
              </div>
       );
}

export default SpecificRendering;
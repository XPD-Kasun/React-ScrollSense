import ScrollSense from 'react-scrollsense';
import MyAwesomeComponent from './MyAwesomeComponent';
import ScrollBoxAdv from './ScrollBoxAdv';

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
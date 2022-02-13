import ScrollSense from '../../../../src';
import ScrollBox from './ScrollBox';

function BasicRendering() {

       return (
              <div>
                     <ScrollSense config={{delay: '500ms'}}>
                            <div className="big-box"></div>
                            <ScrollBox></ScrollBox>
                     </ScrollSense>
              </div>
       );
}

export default BasicRendering;
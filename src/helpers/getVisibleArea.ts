
export function getVisibleHeight(sensorEvent: ScrollSensorEvent) : number {

       let {wndHeight, boundingClientRect: {top, bottom, height}} = sensorEvent;

       if(bottom < 0 || top >= wndHeight) { return 0; }

       else if (top < wndHeight && bottom > wndHeight) { 
              return wndHeight - top;
       }
       else if(top < 0 && bottom >= 0) {
              return bottom;
       }
       else {
              return height;
       }
}

export function getVisibleWidth(sensorEvent: ScrollSensorEvent) : number{

       let {wndWidth, boundingClientRect: {left, right, width}} = sensorEvent;

       if(right < 0 || left >= wndWidth) { return 0; }

       else if (left < wndWidth && right > wndWidth ) {
              return wndWidth - left;
       }

       else if(left < 0 && right >= 0) {
              return right;
       }
       else {
              return width;
       }

}
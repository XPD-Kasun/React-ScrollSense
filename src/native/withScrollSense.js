import scrollConnectProp from './scrollConnectProp';
import scrollConnectComponent from './scrollConnectComponent';

export default function withScrollSense() {

       return {
              useCallback: function (Component, options) {

                     return scrollConnectProp(Component, options);

              },
              useProps: function (Component, options, mapProps) {

                     return scrollConnectComponent(Component, mapProps, options);

              }
       }

}
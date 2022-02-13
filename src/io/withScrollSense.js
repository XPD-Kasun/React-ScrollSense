import scrollConnectComponentMulti from "./scrollConnectComponentMulti";
import scrollConnectComponentSingle from "./scrollConnectComponentSingle";
import scrollConnectPropMulti from "./scrollConnectPropMulti";
import scrollConnectPropSingle from "./scrollConnectPropSingle";

export default function withScrollSense() {

       return {
              useCallback: function(Component, options, useMultipleIO = false) {

                     if(useMultipleIO) {
                            return scrollConnectPropMulti(Component, options);
                     }
                     else {
                            return scrollConnectPropSingle(Component);
                     }

              },
              useProps: function (Component, options, mapProps, useMultipleIO = false) {

                     if(useMultipleIO) {
                            return scrollConnectComponentMulti(Component, mapProps, options);
                     }
                     else {
                            return scrollConnectComponentSingle(Component, mapProps);
                     }


              }
       }
}